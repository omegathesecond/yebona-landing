import {clientPage} from '@omevision/static-seo/pages';
import clientRoutes from '../seo/client-routes.json';
import {handleDiscovery,DiscoveryError,escapeHtml} from '@omevision/static-seo/edge';
import {toPostVM} from '../src/lib/blogPost';
const origin='https://yebona.com';
const plain=(value:string)=>value.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
const config={
 origin,name:'Yebona',heading:'China–Africa trade insights',description:'Read Yebona articles about sourcing, importing and coordinating China–Africa trade.',
 collectionPaths:['/blog'],sitemapPaths:['/sitemap-blog.xml'],detailPattern:/^\/blog\/([^/]+)$/,
 decode:toPostVM,visibility:()=> 'public' as const,
 describe(post:any){const path='/blog/'+post.slug,description=plain(post.excerpt||post.content||post.title).slice(0,180);return {path,title:post.title+' | Yebona',description,...(post.publishedAt?{lastmod:post.publishedAt}:{}),structuredData:{'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description,url:origin+path,...(post.publishedAt?{datePublished:post.publishedAt}:{}),...(post.author?{author:{'@type':'Person',name:post.author}}:{})},body:`<article><h1>${escapeHtml(post.title)}</h1>${post.author?`<p>By ${escapeHtml(post.author)}</p>`:''}<p>${escapeHtml(post.excerpt)}</p><div style="white-space:pre-wrap">${escapeHtml(plain(post.content))}</div><p><a href="/blog">All Yebona articles</a></p></article>`};},
 async listPage(page:number,json:any){const result=await json('https://api.yebona.com/api/blog/posts?page='+page+'&limit=100');return {items:result.data,hasNext:result.pagination?.hasNext};},
 async getItem(slug:string,json:any){const result=await json('https://api.yebona.com/api/blog/posts/'+encodeURIComponent(slug),{missing:true});if(result===null)return null;if(result.data?.slug!==slug||typeof result.data.content!=='string'||!result.data.content.trim())throw new DiscoveryError('The article content is unavailable');return result.data;}
};
export const onRequest=async(context:any)=>{
 const response=await handleDiscovery(context.request,()=>context.env.ASSETS.fetch(new Request(new URL('/discovery-shell',context.request.url))),config);
 if(response)return context.request.method==='HEAD'?new Response(null,response):response;
 return (await clientPage(context.request,context.env.ASSETS,clientRoutes))||context.next();
};
