/* --------------------------------------------------- */
/* script.js */
/* --------------------------------------------------- */


// Einfache JS-Interaktion
const btn = document.getElementById("actionBtn");


if (btn) {
btn.addEventListener("click", () => {
alert("Button funktioniert! Hier kommt später echte Funktionalität.");
});
}

document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("modelGallery");
  const message = document.getElementById("modelMessage");
  if (!gallery) return;

  if (message) message.textContent = "Lade 3D-Modelle…";

  try {
    const response = await fetch(
      "https://api.github.com/repos/altzweig/altzweig.github.io/contents/resources"
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const entries = await response.json();
    const models = entries.filter(
      (item) => item.type === "file" && item.name.toLowerCase().endsWith(".glb")
    );

    if (!models.length) {
      if (message) message.textContent = "Keine 3D-Modelle gefunden.";
      return;
    }

    if (message) message.remove();

    models.forEach(({ name }) => {
      const wrapper = document.createElement("article");
      wrapper.className = "model-item";
      wrapper.style.margin = "2rem 0";

      const heading = document.createElement("h3");
      heading.textContent = name;

      const viewer = document.createElement("model-viewer");
      viewer.src = `resources/${name}`;
      viewer.setAttribute("autoplay", "");
      viewer.setAttribute("auto-rotate", "");
      viewer.setAttribute("camera-controls", "");
      viewer.setAttribute("interaction-prompt", "none");
      viewer.setAttribute("shadow-intensity", "1");
      viewer.alt = `3D-Modell ${name}`;
      viewer.style.width = "100%";
      viewer.style.height = "400px";
      viewer.style.background = "#f6f6f6";
      viewer.style.borderRadius = "1rem";

      wrapper.appendChild(heading);
      wrapper.appendChild(viewer);
      gallery.appendChild(wrapper);
    });
  } catch (error) {
    if (message) message.textContent = "Fehler beim Laden der 3D-Modelle.";
    console.error(error);
  }
});