// Modern logic to fetch and render the latest blog post on homepage
// This script should be included after BlogAPI is available

async function renderLatestBlog() {
  const container = document.getElementById('latest-blog-grid');
  if (!container) return;
  container.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">${t('blog.loading') || 'Chargement…'}</div>`;

  try {
    // Fetch the latest 3 published blog posts
    const { rows } = await BlogAPI.listPublished({ page: 1, limit: 3 });
    if (!rows.length) {
      container.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">${t('blog.empty') || 'Aucun article pour le moment.'}</div>`;
      return;
    }
    const lang = typeof getLang === 'function' ? getLang() : 'fr';
    container.innerHTML = rows.map(post => {
      const title = post[`title_${lang}`] || post.title_fr || post.title;
      const excerpt = post[`excerpt_${lang}`] || post.excerpt_fr || '';
      const image = post.cover_image_url || 'assets/img/blog-default.jpg';
      const date = new Date(post.created_at).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
      return `
        <div class="reveal bg-surface-card border border-surface-border rounded-2xl overflow-hidden flex flex-col h-full">
          <a href="blog-details.html?slug=${post.slug}" class="block h-56 overflow-hidden group">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy">
          </a>
          <div class="flex-1 flex flex-col p-6">
            <h3 class="text-xl font-bold mb-2 line-clamp-2"><a href="blog-details.html?slug=${post.slug}" class="hover:text-brand transition">${title}</a></h3>
            <p class="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">${excerpt}</p>
            <div class="flex items-center justify-between mt-auto pt-2">
              <span class="text-xs text-gray-500">${date}</span>
              <a href="blog-details.html?slug=${post.slug}" class="text-brand font-semibold text-sm hover:underline">${t('blog.readmore') || 'Lire la suite'}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
    setTimeout(triggerReveal, 50);
  } catch (err) {
    container.innerHTML = `<div class="col-span-full text-center py-10 text-red-500">${t('blog.error') || 'Erreur lors du chargement.'}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', renderLatestBlog);
document.addEventListener('langchange', renderLatestBlog);
