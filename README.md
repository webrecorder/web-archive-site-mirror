# How to Mirror any Web Site using Web Archives

This template provides a starter to 'mirror' a website from web archives, replacing a previously hosted on another (or same) domain.

Compared with traditional replay via ReplayWeb.page, this approach allows preserving the link structure of the original site and hosting the site on the original domain.
Users may not even notice that the site has been replaced with a web archived powered mirror!

This example is designed to work with a single-domain site. (For more complex example that supports multiple subdomains that are interlinked, check out [GovArchive.us Replay](https://github.com/webrecorder/govarchive-replay))

### Usage

Here's how you can host a mirror of any site directly on GitHub pages!

1) First, crawl the site you want to mirror - automatically using [Browsertrix](https://webrecorder.net/browsertrix) or [Browsertrix Crawler](https://github.com/webrecorder/browsertrix-crawler) or manually, using [ArchiveWeb.page](https://archiveweb.page), to get a WACZ file of your site.
2) Click *Use this template* -> *Create a new repository* in GitHub to create your own repository from this template.
3) Add the WACZ file to this repo, if small enough, or host the WACZ file elsewhere.
4) Open [init.js](init.js) and fill in the path to WACZ file (or JSON containing multiple WACZ files) and the origin of the site to be replayed from the WACZ, and an optional timestamp. The values are provided as string parameters to init function:

  ```js
  init(<URL of WACZ>, <origin of site to replay>, <optional timestamp>);
  ```
  
  For example, if your site was previously hosted on `https://my-site.example.com` and the WACZ file is called `my-archive.wacz` and is added to this repo, all you need is:

  ```js
  init("./my-archive.wacz", "https://my-site.example.com");
  ```
5) Check locally with any webserver to make sure your site is running, eg. by running `http-server -p 8080` and then loading `http://localhost:8080`. This should serve the home page you archived from `https://my-site.example.com/` after the WACZ is loaded.
6) Enable GitHub pages on this repo, and set a custom domain, either a new mirror domain or even the original domain, if you have access to it.
7) Your web archive mirror should be loading when the site loads! The 404 handler should allow deep-linking directly, and will load the web archive starting from any page, so you can deep link to any existing page on the site!
