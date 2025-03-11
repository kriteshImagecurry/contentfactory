const videoFolder = "./cfStudioVideos";
const videoGallery = document.getElementById("cf-studio-video-container");

async function fetchVideos() {
  try {
    const response = await fetch(videoFolder);
    const videoList = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(videoList, "text/html");
    const links = [...doc.querySelectorAll("a")].map((a) => a.href);

    links.forEach((link) => {
      if (link.endsWith(".mp4")) {
        const videoWrapper = document.createElement("div");
        videoWrapper.className = "h-full w-full";

        const videoElement = document.createElement("video");
        videoElement.autoplay = true;
        videoElement.muted = false;
        videoElement.playsInline = true;
        videoElement.controls = true;
        videoElement.loop = true;
        videoElement.preload = "auto";
        videoElement.className = "w-full";

        const sourceElement = document.createElement("source");
        sourceElement.src = link;
        sourceElement.type = "video/mp4";

        videoElement.appendChild(sourceElement);
        videoWrapper.appendChild(videoElement);
        videoGallery.appendChild(videoWrapper);

        if (videoGallery.childElementCount === 1) {
          videoElement.muted = true;
          videoElement.play().catch((error) => {
            console.warn("Autoplay failed: ", error);
          });
        }

        videoElement.addEventListener("play", () => {
          const allVideos = document.querySelectorAll(
            "#cf-studio-video-container video"
          );
          allVideos.forEach((vid) => {
            if (vid !== videoElement) {
              vid.pause();
            }
          });
        });
      }
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

fetchVideos();
