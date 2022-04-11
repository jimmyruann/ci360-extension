const foreground_entry_point = document.createElement("div");

foreground_entry_point.id = "foreground";

const body = document.querySelector("body");

if (body) {
	body.appendChild(foreground_entry_point);
	console.log("[Inject Script] Injected");
} else {
	console.error("[Inject Script] Unable to find <body> in document. Unable to inject.");
}
