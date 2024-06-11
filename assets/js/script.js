document.getElementById("download-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const url = document.getElementById("url").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Downloading...";

  fetch("https://your-netlify-site.netlify.app/.netlify/functions/download", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const fileContent = atob(data.file);
        const blob = new Blob([fileContent], { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        resultDiv.innerHTML = `<a href="${url}" download="video.mp4">Download File</a>`;
      } else {
        resultDiv.innerHTML = "Error downloading video.";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "Error downloading video.";
    });
});
