const body = document.querySelector("body");
const foregroundId = "ci360-ext-foreground";

if (body) {
  if (!body.querySelector(`#${foregroundId}`)) {
    const foreground_entry_point = document.createElement("div");
    foreground_entry_point.id = foregroundId;
    body.appendChild(foreground_entry_point);
    console.log("[Inject Script] Injected");
  }
} else {
  console.error(
    "[Inject Script] Unable to find <body> in document. Unable to inject."
  );
}
