
# Video and Audio Downloader Website

Welcome to the GitHub repository for our Video and Audio Downloader Website. This project allows users to download videos and audio from YouTube and many other websites in mp3 or mp4 formats, based on the [yt-dlp](https://github.com/yt-dlp/yt-dlp) tool.

## Features

- **Multiple Formats**: Download videos in mp4 or audio in mp3 formats.
- **Wide Compatibility**: Supports a wide range of websites including YouTube, Vimeo, Dailymotion, and more.
- **High Quality**: Choose the quality of the downloaded files.
- **User-Friendly Interface**: Easy-to-use web interface for downloading files.
- **Queue Management**: Handle multiple download requests with a queue system.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm (Node Package Manager)
- yt-dlp

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/emlncvsr/downloader.git
    cd downloader
    ```

2. Install backend dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4. Set up your environment variables. Create a `.env` file in the root directory and add the following:
    ```env
    YTDLP_PATH=path_to_your_yt-dlp
    DOWNLOAD_PATH=path_to_download_directory
    SERVER_PORT=your_desired_port
    ```

5. Start the server:
    ```bash
    npm start
    ```

## Usage

### Downloading a Video or Audio

1. Navigate to the homepage.
2. Enter the URL of the video you want to download.
3. Select the format (mp3 or mp4) and the desired quality.
4. Click the "Download" button.
5. The file will be processed and downloaded to your specified directory.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (React.js)
- **Backend**: Python, Flask
- **Downloader**: yt-dlp

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.

## Contributing

We welcome contributions!