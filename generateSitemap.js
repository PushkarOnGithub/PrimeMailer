const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const fs = require("fs");

const urls = [
  { url: "/", changefreq: "weekly" },
  { url: "/about", changefreq: "weekly" },
  { url: "/login", changefreq: "monthly" },
  { url: "/compose", changefreq: "weekly" },
];
// { url: '/compose', changefreq: 'weekly', priority: 1 }

// Create a stream to write to
const stream = new SitemapStream({ hostname: "https://primemailer.xyz" });

// Return a promise that resolves with your XML string
function generateRawSitemap() {
  streamToPromise(Readable.from(urls).pipe(stream)).then((data) =>
    fs.writeFileSync("./public/sitemap.xml", data.toString())
  );
}
generateRawSitemap();
