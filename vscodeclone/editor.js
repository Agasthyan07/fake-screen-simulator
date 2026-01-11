require.config({
  paths: { vs: "https://unpkg.com/monaco-editor@0.45.0/min/vs" }
});

require(["vs/editor/editor.main"], function () {
  monaco.editor.create(document.getElementById("editor"), {
    value: `// terminal.js

const input = document.getElementById("terminalInput");
const output = document.getElementById("output");

let busy = false;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !busy) {
    busy = true;
    const cmd = input.value;
    input.value = "";

    output.textContent += "\\nPS C:\\\\fake_screen> " + cmd + "\\n";
    runFakeProcess();
  }
});

function runFakeProcess() {
  const logs = [
    "Compiling modules...",
    "Bundling dependencies...",
    "Optimizing build...",
    "✔ Build successful",
    "Starting server...",
    "✔ Server running at http://localhost:3000",
    "Waiting for requests..."
  ];

  let i = 0;
  const timer = setInterval(() => {
    output.textContent += logs[i++] + "\\n";
    output.scrollTop = output.scrollHeight;
    if (i === logs.length) busy = false, clearInterval(timer);
  }, 600);
}
`,
    language: "javascript",
    theme: "vs-dark",
    automaticLayout: true,
    minimap: { enabled: true }
  });
});
