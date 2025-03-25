async function init(sourceUrl, startingOrigin, proxyTs) {
  const baseUrl = new URL(window.location);
  baseUrl.hash = "";

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
      "proxyOrigin": new URL(startingOrigin).origin,
      "proxyTs": proxyTs,
      "proxyBannerUrl": "banner.js",
    },
  };

  const scope = "/";

  if (!navigator.serviceWorker) {
    showError("Sorry, Service Workers are not supported in this browser (or mode)");
    return;
  }

  await navigator.serviceWorker.register("/sw.js?root=proxyreplay&proxyOriginMode=1", {scope});

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
