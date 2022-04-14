chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    changeInfo.status === "complete" &&
    tab.url &&
    tab.url.includes("https://ci360.dynatrace.com")
  ) {
    chrome.scripting.executeScript(
      {
        files: ["./inject.js"],
        target: {
          tabId,
        },
      },
      () => {
        console.log("[Background] Inject script was injected.");
        chrome.scripting.executeScript(
          {
            files: ["./foreground.js"],
            target: {
              tabId,
            },
          },
          () => {
            console.log("[Background] Foreground script was injected.");
          }
        );
      }
    );
  }
});
