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

  console.log("Received event:", event);
  console.log("Context:", context);

  try {
    const body = JSON.parse(event.body);
    const url = body.url;
    console.log("URL to download:", url);

    const downloadPath = path.join(os.tmpdir(), "video.mp4");
    console.log("Download path:", downloadPath);

    return new Promise((resolve, reject) => {
      const command = `./assets/yt-dlp.exe -o ${downloadPath} ${url}`;
      console.log("Executing command:", command);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error("Error executing yt-dlp:", stderr);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, error: stderr }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
          return;
        }

        console.log("yt-dlp output:", stdout);

        try {
          const file = fs.readFileSync(downloadPath);
          const base64File = Buffer.from(file).toString("base64");
          console.log("File read successfully, size:", file.length);

          resolve({
            statusCode: 200,
            body: JSON.stringify({
              success: true,
              file: base64File,
            }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
        } catch (readError) {
          console.error("Error reading file:", readError);
          resolve({
            statusCode: 500,
            body: JSON.stringify({ success: false, error: readError.message }),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
        }
      });
    });
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: "Invalid request body" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };
  }
};
