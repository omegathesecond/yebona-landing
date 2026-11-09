/** One public blog record shape for the browser and request-rendered article pages. */
export function toPostVM(row) {
  if (!row || typeof row.slug !== 'string' || !/^[-a-z0-9]+$/i.test(row.slug) || typeof row.title !== 'string' || !row.title.trim()) throw new Error('The blog service returned an invalid published article.');
  return {id:row.id,title:row.title,slug:row.slug,excerpt:row.excerpt||'',content:row.content||'',category:row.category||null,tags:Array.isArray(row.tags)?row.tags:[],author:row.author||null,image:row.featured_image||null,publishedAt:row.published_at||row.created_at||null};
}
