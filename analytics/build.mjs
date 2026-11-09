/** Generated from @omevision/analytics. Edit the shared package and re-vendor. */
import { readFile, writeFile, readdir, copyFile, stat, rm } from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(await readFile(path.join(here, 'config.json'), 'utf8'));
const root = path.resolve(here, '..', process.argv[2] || config.output);
const runtimeBytes=await readFile(path.join(here,'omevision-analytics.js'));
const runtimeName='omevision-analytics-'+createHash('sha256').update(runtimeBytes).digest('hex').slice(0,12)+'.js';
const runtimePattern=/^omevision-analytics(?:-[a-f0-9]{12})?\.js$/;
const escape = value => String(value).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const attributes = config.hostConfig ? {'data-host-config':JSON.stringify(config.hostConfig)} : {
  'data-measurement-id':process.env.VITE_GA_MEASUREMENT_ID || config.measurementId,
  'data-product':config.product,'data-surface':config.surface,
  'data-hosts':JSON.stringify(config.hosts),'data-routes':JSON.stringify(config.routes)
};
const script = '<script src="/'+runtimeName+'" '+Object.entries(attributes).map(([key,value])=>key+'="'+escape(value)+'"').join(' ')+'></script>';
let pages = 0;
const revisions=new Map();
const digest=value=>createHash('md5').update(value).digest('hex');
async function visit(dir){for(const entry of await readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);if(entry.isDirectory()){await visit(file);continue;}
  if(!entry.name.endsWith('.html'))continue;
  let html=await readFile(file,'utf8');
  // Remove only complete legacy GA snippets; retain other scripts and tag managers.
  html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,block=>{
    if(/src=["'][^"']*omevision-analytics(?:-[a-f0-9]{12})?\.js["']/i.test(block))return '';
    if(/googletagmanager\.com\/gtag\/js/.test(block))return '';
    if(!/\bsrc\s*=/.test(block)&&/gtag\s*\(\s*['"](?:config|js|consent)['"]/.test(block)&&/\bG-[A-Z0-9]{6,20}\b/.test(block))return '';
    return block;
  });
  if(!/<head\b[^>]*>/i.test(html))throw Error('Missing HTML head: '+file);
  html=html.replace(/(<head\b[^>]*>)[\s\r\n]*/i,(_,head)=>head+'\n'+script+'\n');
  await writeFile(file,html);revisions.set(path.relative(root,file).split(path.sep).join('/'),digest(html));pages++;
}}
await stat(root);
const headersFile=path.join(root,'_headers');
try { const before=await readFile(headersFile,'utf8');const after=before.replace(/(script-src[^;\n]*)([;\n])/g,(m,d,end)=>d+(d.includes('www.googletagmanager.com')?'':' https://www.googletagmanager.com')+end).replace(/(connect-src[^;\n]*)([;\n])/g,(m,d,end)=>d+(d.includes('google-analytics.com')?'':' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com')+end);if(after!==before)await writeFile(headersFile,after); } catch(error) { if(error.code!=='ENOENT')throw error; }
for(const name of await readdir(root))if(runtimePattern.test(name)&&name!==runtimeName)await rm(path.join(root,name));
await copyFile(path.join(here,'omevision-analytics.js'),path.join(root,runtimeName));await visit(root);
if(!pages)throw Error('No generated HTML files in '+root);
// Workbox runs before postbuild. Update its HTML revisions so existing installed
// PWAs discover this release, and cache the same-origin analytics runtime offline.
const swFile=path.join(root,'sw.js');
try {
 let sw=await readFile(swFile,'utf8');const runtimeRevision=digest(runtimeBytes);
 let containsRuntime=/(?:url:"|"url":")omevision-analytics(?:-[a-f0-9]{12})?\.js"/.test(sw);
 sw=sw.replace(/\{url:"([^"]+)",revision:"[^"]+"\}/g,(entry,url)=>{
  if(runtimePattern.test(url))return '{url:"'+runtimeName+'",revision:"'+runtimeRevision+'"}';
  if(!revisions.has(url))return entry;
  const updated='{url:"'+url+'",revision:"'+revisions.get(url)+'"}';
  if(url==='index.html'&&!containsRuntime){containsRuntime=true;return updated+',{url:"'+runtimeName+'",revision:"'+runtimeRevision+'"}';}
  return updated;
 });
 sw=sw.replace(/\{"revision":"[^"]+","url":"([^"]+)"\}/g,(entry,url)=>{
  if(runtimePattern.test(url))return '{url:"'+runtimeName+'",revision:"'+runtimeRevision+'"}';
  if(!revisions.has(url))return entry;
  const updated='{"revision":"'+revisions.get(url)+'","url":"'+url+'"}';
  if(url==='index.html'&&!containsRuntime){containsRuntime=true;return updated+',{url:"'+runtimeName+'",revision:"'+runtimeRevision+'"}';}
  return updated;
 });
 await writeFile(swFile,sw);
} catch(error) { if(error.code!=='ENOENT')throw error; }

console.log('Analytics configured: '+config.product+'/'+config.surface+' ('+pages+' HTML pages)');
