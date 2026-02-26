// Modern logic to fetch and render the latest blog post on homepage
// This script should be included after BlogAPI is available

async function renderLatestBlog() {
  const container = document.getElementById('latest-blog-grid');
  if (!container) return;
  container.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">${t('blog.loading') || 'Chargement…'}</div>`;

  try {
    // Fetch only the latest published blog post
    const { rows } = await BlogAPI.listPublished({ page: 1, limit: 1 });
    if (!rows.length) {
      container.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">${t('blog.empty') || 'Aucun article pour le moment.'}</div>`;
      return;
    }
    const post = rows[0];
    const lang = getLang ? getLang() : 'fr';
    const title = post[`title_${lang}`] || post.title_fr || post.title;
    const excerpt = post[`excerpt_${lang}`] || post.excerpt_fr || '';
    const image = post.cover_image_url || 'assets/img/blog-default.jpg';
    const date = new Date(post.created_at).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
    container.innerHTML = `
      <div class="reveal bg-surface-card border border-surface-border rounded-2xl overflow-hidden flex flex-col md:flex-row">
        <a href="blog-details.html?slug=${post.slug}" class="block md:w-1/3 h-64 md:h-auto overflow-hidden">
          <img src="${image}" alt="${title}" class="w-full h-full object-cover transition duration-500 hover:scale-105" loading="lazy">
        </a>
        <div class="flex-1 p-8 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold mb-2"><a href="blog-details.html?slug=${post.slug}" class="hover:text-brand transition">${title}</a></h3>
            <p class="text-gray-400 text-sm mb-4 line-clamp-3">${excerpt}</p>
          </div>
          <div class="flex items-center justify-between mt-6">
            <span class="text-xs text-gray-500">${date}</span>
            <a href="blog-details.html?slug=${post.slug}" class="text-brand font-semibold text-sm hover:underline">${t('blog.readmore') || 'Lire la suite'}</a>
          </div>
        </div>
      </div>
    `;
    setTimeout(triggerReveal, 50);
  } catch (err) {
    container.innerHTML = `<div class="col-span-full text-center py-10 text-red-500">${t('blog.error') || 'Erreur lors du chargement.'}</div>`;
  }
}

document.addEventListener('DOMContentLoaded', renderLatestBlog);
document.addEventListener('langchange', renderLatestBlog);
