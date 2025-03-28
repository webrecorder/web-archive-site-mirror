# How to Mirror any Web Site using Web Archives

This template provides a starter to 'mirror' a website from web archives, replacing a previously hosted on another (or same) domain.

Compared with traditional replay via ReplayWeb.page, this approach allows preserving the link structure of the original site and hosting the site on the original domain.
Users may not even notice that the site has been replaced with a web archived powered mirror!

This example is designed to work with a single-domain site. (For more complex example that supports multiple subdomains that are interlinked, check out [GovArchive.us Replay](https://github.com/webrecorder/govarchive-replay))

### Usage

Here's how you can host a mirror of any site directly on GitHub pages!

1) First, crawl the site you want to mirror, using [Browsertrix](https://webrecorder.net/browsertrix) or [Browsertrix Crawler](https://github.com/webrecorder/browsertrix-crawler) to get a WACZ file of your site.
2) Click *Use this template* -> *Create a new repository* in GitHub to create your own repository from this template.
3) Add the WACZ file to this repo, if small enough, or host the WACZ file elsewhere, or use the Multi-WACZ JSON format. This is the same source that would be used with `<replay-web-page>`.
4) Open [init.js](init.js) and fill in the path to WACZ file (or JSON containing multiple WACZ files) and the origin of the site to be replayed from the WACZ, and an optional timestamp. The values are provided as string parameters to init function:

  ```js
  init(<path to WACZ or JSON source>, <origin of site to replay>, <optional timestamp>);
  ```
5) Check locally with any webserver to make sure your site is running, eg. by running `http-server -p 8080`
6) Enable GitHub pages on this repo, and set a custom domain, either a new mirror domain or even the original domain, if you have access to it.1
7) Your web archive mirror should be loading when the site loads, after the service worker is initialized. The 404 handler should allow deep-linking directly, and will load the web archive from any page.
