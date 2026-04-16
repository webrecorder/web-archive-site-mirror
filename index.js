async function init(sourceUrlOrOpts, originOpt, proxyTsOpt) {
  const baseUrl = new URL(window.location);
  baseUrl.hash = "";

  if (typeof(sourceUrlOrOpts) === "string") {
    sourceUrlOrOpts = {sourceUrl: sourceUrlOrOpts, proxyOrigin: originOpt, proxyTs: proxyTsOpt};
  }

  const { sourceUrl, proxyOrigin, proxyTs,
    notFoundTemplateUrl, excludeUrlPaths, allowProxyPaths,
    allowProxyPassthrough
  } = sourceUrlOrOpts;

  const msg = {
    msg_type: "addColl",
    name: "proxyreplay",
    type: "wacz",
    file: {sourceUrl},
    skipExisting: false,
    extraConfig: {
      "isLive": false,
      "baseUrl": baseUrl.href,
      "baseUrlHashReplay": true,
      "proxyOrigin": new URL(proxyOrigin).origin,
      "proxyTs": proxyTs,
      "proxyBannerUrl": "banner.js",
      "excludeUrlPaths": excludeUrlPaths
    },
  };

  const scope = "/";

  if (!navigator.serviceWorker) {
    showError("Sorry, Service Workers are not supported in this browser (or mode)");
    return;
  }

  const params = new URLSearchParams();
  params.set("root", "proxyreplay");
  params.set("proxyOriginMode", "1");

  // custom not found template URL
  if (notFoundTemplateUrl) {
    params.set("notFoundTemplateUrl", notFoundTemplateUrl);
  }

  // allow URL path prefixes to be loaded from live web (outside the archive)
  if (allowProxyPaths) {
    params.set("allowProxyPaths", allowProxyPaths.join(","));
  }

  // allow proxying without https://wabac.js/proxy/ prefix as a 'passthrough' above URLs
  if (allowProxyPassthrough) {
    params.set("allowProxyPassthrough", "1");
  }

  await navigator.serviceWorker.register("/sw.js?" + params.toString(), {scope});

  await new Promise((resolve) => {
    if (!navigator.serviceWorker.controller) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        resolve();
      });
    } else {
      resolve();
    }
  });

  const p = new Promise((resolve) => {
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data.msg_type === "collAdded") {
        resolve();
      }
    });
  });

  navigator.serviceWorker.controller.postMessage(msg);

  await p;

  window.location.reload();
}

function showError(msg) {
  document.querySelector("#msg").innerText = "An Error Occured: " + msg;
}
