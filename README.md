# Mirror Web Site from Web Archive

This template provides a starter to 'mirror' a website from a web archives, replacing a previously hosted on another (or same) domain.

Compared to regular web archive setup, this replaces a site, including preserving the link structure of the original site.

This example is designed to work with a single-domain site.

### Usage

Here's how you can host a mirror of any site directly on GitHub pages!

1) Create a new repo, using this site as a template!
2) Add the WACZ file to this repo, if small enough, or host the WACZ file elsewhere, or use the Multi-WACZ JSON format. This is the same source that would be used with `<replay-web-page>`.
3) Open [init.js](init.js) and fill in the path to WACZ file (or JSON containing multiple WACZ files) and the origin of the site to be replayed from the WACZ, and an optional timestamp. The values are provided as string parameters to init function:

  ```js
  init(<path to WACZ or JSON source>, <origin of site to replay>, <optional timestamp>);
  ```
4) Check locally with any webserver.
5) Enable GitHub pages on this repo, and set a custom domain!
6) Your web archive mirror should be loading when the site loads, after the service worker is initialized. The 404 handler should allow deep-linking directly, and will load the web archive from any page.
