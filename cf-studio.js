const videoFolder = "./cfStudioVideos";
const videoGallery = document.getElementById("cf-studio-video-container");

async function showVideos(links) {
  try {
    // const response = await fetch(videoFolder);
    // const videoList = await response.text();

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(videoList, "text/html");
    // const links = [...doc.querySelectorAll("a")].map((a) => a.href);

    links.forEach((link) => {
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
      sourceElement.src = link.link;
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
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

// fetchVideos();
const VIMEO_ENDPOINT =
  "https://api.vimeo.com/users/137072612/projects/24653734/videos";
const ACCESS_TOKEN = "6959086004ae63ad423ba6e475aa98ce"; // Replace with your access token

async function fetchVimeoVideos() {
  const response = await fetch(VIMEO_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch videos from Vimeo:", response.statusText);
    return [];
  }

  const data = await response.json();
  return data.data; // 'data' field contains the list of videos
}

fetchVimeoVideos().then((videos) => {
  const videoArray = videos.map((video) => {
    const { player_embed_url, name, embed, pictures } = video;
    const template = `<div style="height:100%;width:100%;aspect-ratio:9 / 16">${embed.html}</div>`;
    return template;
  });
  const divs = `<div class="plr-30 pt-50 pb-20 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 min-h-[80vh] gap-1">
${videoArray.join("")} 
  </div>`;
  console.log(divs);

  const $itemGrid = $("#cf-studio-video-container");
  $itemGrid.html(divs);
  initMasonry();
});
