const input = document.getElementById("terminalInput");
const output = document.getElementById("output");

let busy = false;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !busy) {
    busy = true;
    const cmd = input.value || "npm install";
    input.value = "";

    output.textContent += `\nPS C:\\fake_screen> ${cmd}\n`;
    startDownload();
  }
});

function startDownload() {
  const packages = [
    { name: "axios@1.6.2", size: 78 },
    { name: "express@4.18.2", size: 120 },
    { name: "lodash@4.17.21", size: 95 }
  ];

  output.textContent += "\nDownloading packages...\n";

  let index = 0;
  downloadNext();

  function downloadNext() {
    if (index >= packages.length) {
      finishInstall();
      return;
    }

    let progress = 0;
    const pkg = packages[index];

    const lineIndex = output.textContent.split("\n").length;
    output.textContent += `${pkg.name.padEnd(22)} 0%\n`;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 3;
      if (progress >= 100) progress = 100;

      const speed = (Math.random() * 1.5 + 0.5).toFixed(2);
      const barLength = 10;
      const filled = Math.floor((progress / 100) * barLength);
      const bar = "█".repeat(filled) + "░".repeat(barLength - filled);

      const lines = output.textContent.split("\n");
      lines[lineIndex - 1] =
        `${pkg.name.padEnd(22)} ${bar} ${progress}%  ${speed} MB/s`;

      output.textContent = lines.join("\n");
      output.scrollTop = output.scrollHeight;

      if (progress === 100) {
        clearInterval(interval);
        index++;
        setTimeout(downloadNext, 500);
      }
    }, 400);
  }
}

function finishInstall() {
  const logs = [
    "\nExtracting...",
    "Linking dependencies...",
    "✔ Installation complete",
    "Done in 12.3s."
  ];

  let i = 0;
  const t = setInterval(() => {
    output.textContent += logs[i++] + "\n";
    output.scrollTop = output.scrollHeight;

    if (i === logs.length) {
      clearInterval(t);
      busy = false;
      output.textContent += "PS C:\\fake_screen> ";
    }
  }, 700);
}
