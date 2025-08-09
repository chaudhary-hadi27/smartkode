import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

(async () => {
  const sitemap = new SitemapStream({ hostname: 'https://smartkode.io' });
  const writeStream = createWriteStream(resolve(__dirname, '../../public/sitemap.xml'));

  sitemap.pipe(writeStream);

  // Add your routes here
  sitemap.write({ url: '/', changefreq: 'daily', priority: 1 });
  sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/about/mission', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/about/vision', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/about/culture', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/about/impact', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/ai', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/automation', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/chatbot', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/data', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/devops', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/marketing', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/uiux', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services/web', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/blogs', changefreq: 'weekly', priority: 0.7 });
  sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/products', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/terms', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/privacy', changefreq: 'monthly', priority: 0.8 });

  sitemap.end();
  await streamToPromise(sitemap);

  console.log('✅ Sitemap generated');
})();