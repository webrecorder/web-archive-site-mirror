// Uncomment and fill the options below:

// Simple override:
// init("https://example.com/path/to/my/{file.wacz,collection.json}", "https://my-archived-site.example.com", "<optional timestamp>");

// Or, for more complex override (only first two are required):

// init({
//   sourceUrl: "https://example.com/path/to/my/{file.wacz,collection.json}", // required, path to WACZ or Multi WACZ JSON
//   proxyOrigin: "https://my-archived-site.example.com", // required, the original site to proxy on this domain

//   proxyTs: "20261226" // load closest capture to specified timestamp
//   excludeUrlPaths: ["http://www.googletagmanager.com/", "https://google-analytics.com/"] // array of URLs prefixes that should be excluded from being loaded (will return 404)
//   allowProxyPath: ["https://example.com/ruffle.js", "https://example.com/some/analytics.js"] // array of URLs that should be loaded live via https://wab.ac/proxy/<url> prefix
//   allowProxyPassthrough: true // allow above URL prefixes to always 'passthrough' to live web when encountered.
//   notFoundTemplateUrl: "./notFound.html" // load a custom not found template from the specified URL

//   proxyHomePageUrl: "./homepage.html" // override the home page/index.html with custom HTML loaded from this file. Can be overridden ./index.html to show a custom index without loading the web archive

//   proxyCustomInsert: `<script>
//    // do something here
//   </script>`, // insert custom HTML into each rendered page
//

// })
