const VIMEO_ENDPOINT =
  "https://api.vimeo.com/users/137072612/projects/24653756/videos?per_page=100";
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
    console.log(video.name, video.link);

    const template = `<li role="button" class="port-item mix">
    <a href="portfolio-single1.html">
      <div class="port-img-overlay">
        <img
          class="port-main-img"
          src=${pictures.base_link}
          alt="img"
        />
      </div>
    </a>
    <div class="port-overlay-cont" onClick=redirectToVideo('${player_embed_url}')>
      <div class="port-title-cont">
        <h3>
          <a href="portfolio-single1.html">${name}</a>
        </h3>
        <span>
          <a href="video-page.html?player_embed_url=${player_embed_url}">${name}</a>
          <span class="slash-divider">/</span>
            <a href="#">media</a>
        </span>
      </div>
    </div>
  </li>`;
    return template;
  });
  const ul = `
  <ul
  class="port-grid display-hover-on-mobile port-grid-3 masonry clearfix">
 ${videoArray}</ul>`;
  console.log({ videoArray });
  const $itemGrid = $("#items-grid");
  $itemGrid.html(ul);
  initMasonry();
});

const redirectToVideo = (url) => {
  console.log("Redirect to video");
  var baseUrl = `video-page.html?player_embed_url=${url}`;
  window.location.href = baseUrl;
};
document.addEventListener("DOMContentLoaded", function () {
  const lazyLoadIframes = () => {
    const iframes = document.querySelectorAll("iframe[data-src]");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const iframe = entry.target;
          iframe.src = iframe.getAttribute("data-src");
          iframe.removeAttribute("data-src");
          observer.unobserve(iframe);
        }
      });
    });

    iframes.forEach((iframe) => observer.observe(iframe));
  };

  lazyLoadIframes();
});
