const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

exports.handler = async (event, context) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({}),
    };
  }

  const body = JSON.parse(event.body);
  const url = body.url;

  const downloadPath = path.join(os.tmpdir(), "video.mp4");

  return new Promise((resolve, reject) => {
    exec(`./assets/yt-dlp.exe -o ${downloadPath} ${url}`, (error, stdout, stderr) => {
      if (error) {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ success: false, error: stderr }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Add this header
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
        return;
      }

      const file = fs.readFileSync(downloadPath);
      const base64File = Buffer.from(file).toString("base64");

      resolve({
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          file: base64File,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Add this header
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    });
  });
};
