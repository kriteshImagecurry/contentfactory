window.onload = function () {
  let defaultAudioTitle = "Start playing an audio";
  let multicultural = [
    {
      title: "Music and sound design composed for Telus Hindi Diwali Ad 2021",
      path: "audio/multicultural/Music and sound design composed for Telus Hindi Diwali Ad 2021.m4a",
    },
    {
      title: "Toyota Cantonese Happy Days",
      path: "audio/multicultural/Toyota Cantonese Happy Days.m4a",
    },
    {
      title: "Toyota Hinglish  Happy Place",
      path: "audio/multicultural/Toyota Hinglish  Happy Place.m4a",
    },
    {
      title: "Toyota Hornets Nest 30s Hinglish OTDa",
      path: "audio/multicultural/Toyota Hornet's Nest 30s Hinglish OTDa.m4a",
    },
    {
      title: "Toyota Hornets Nest 30s Hinglish Pacific",
      path: "audio/multicultural/Toyota Hornet's Nest 30s Hinglish Pacific.m4a",
    },
    {
      title: "Toyota Mandarin Happy Days",
      path: "audio/multicultural/Toyota Mandarin Happy Days.m4a",
    },
    {
      title: "Toyota Punjabi Happy Days",
      path: "audio/multicultural/Toyota Punjabi Happy Days.m4a",
    },
    {
      title: "Toyota Smells Fishy 30s Hinglish OTDA",
      path: "audio/multicultural/Toyota Smells Fishy 30s Hinglish OTDA.m4a",
    },
    {
      title: "Toyota Taglish Happy Days",
      path: "audio/multicultural/Toyota Taglish Happy Days.m4a",
    },
  ];
  let musicBased = [
    {
      title: "Bill and Milinda",
      path: "audio/music-based/Bill and Milinda.m4a",
    },
    {
      title: "Cairns",
      path: "audio/music-based/Cairns.m4a",
    },
    {
      title: "Dettol - Humpty Dumpty",
      path: "audio/music-based/Dettol - Humpty Dumpty.m4a",
    },
    {
      title: "Dettol vocal Anthem",
      path: "audio/music-based/Dettol vocal Anthem.m4a",
    },
    {
      title: "Flybig",
      path: "audio/music-based/flybig.m4a",
    },
    {
      title: "Horlicks",
      path: "audio/music-based/Horlicks option1.m4a",
    },
    {
      title: "McDonalds",
      path: "audio/music-based/McDonalds.m4a",
    },
    {
      title: "Music and sound design composed for Telus Punjabi Diwali Ad 2021",
      path: "audio/music-based/Music and sound design composed for Telus Punjabi Diwali Ad 2021.m4a",
    },
    {
      title: "Nestle",
      path: "audio/music-based/Nestle.m4a",
    },
    {
      title: "Nokia Rap Opt 1",
      path: "audio/music-based/Nokia Rap Opt 1.m4a",
    },
    {
      title: "R&W version1",
      path: "audio/music-based/R&W version1.m4a",
    },
  ];
  let showcasingAudio = [
    {
      title: "Cannes Bronze",
      path: "audio/showcasing-audio/Cannes Bronze.m4a",
    },
    {
      title: "Derma Clinix",
      path: "audio/showcasing-audio/Derma Clinix.m4a",
    },
    {
      title: "Greenpeace",
      path: "audio/showcasing-audio/Greenpeace.m4a",
    },
    {
      title: "LiveGuard",
      path: "audio/showcasing-audio/LiveGuard.m4a",
    },
    {
      title: "Jasmine Yoga",
      path: "audio/showcasing-audio/Jasmine Yoga.m4a",
    },
    {
      title: "Mentra",
      path: "audio/showcasing-audio/Mentra.m4a",
    },
    {
      title: "PNBmetlife",
      path: "audio/showcasing-audio/PNBmetlife.m4a",
    },
    {
      title: "Radio City",
      path: "audio/showcasing-audio/Radio City.m4a",
    },
    {
      title: "Unicef",
      path: "audio/showcasing-audio/Unicef.m4a",
    },
    {
      title: "YOUbroadband",
      path: "audio/showcasing-audio/YOUbroadband.m4a",
    },
  ];
  const template = (id, title, path, category) => {
    const audioId = title.split(" ").join("-").toLowerCase();
    return `
<div role="button" class="audio-item mix ${category}" onclick="playAudio('${audioId}','${title}','${category}')">
  <div class="audio-box">
        <span class="audio-id">${id + 1})  </span> 
      <p class="audio-title-2">${title}</p>
      <audio controls id="${audioId}">
          <source src="${path}">
      </audio>
  </div>
 </div>`;
  };
  const audioArray1 = multicultural.map((audio, i) =>
    template(i, audio.title, audio.path, "multicultural")
  );
  const audioArray2 = musicBased.map((audio, i) =>
    template(audioArray1.length + i, audio.title, audio.path, "musicBased")
  );
  const audioArray3 = showcasingAudio.map((audio, i) =>
    template(
      audioArray1.length + audioArray2.length + i,
      audio.title,
      audio.path,
      "creative"
    )
  );
  const finalArray = [...audioArray1, ...audioArray2, ...audioArray3];
  const ul = `<ul class="port-grid display-hover-on-mobile port-grid-4 port-grid-gut clearfix" id="items-grid">${finalArray}</ul>`;

  console.log({ finalArray });
  const $itemGrid = $("#items-grid2");
  $itemGrid.html(finalArray);
  initWorkFilter2();
  $(".pause-icon").hide();
};
function initWorkFilter2() {
  // Projects filtering
  console.log("initWorkFilter2");
  var fselector = 0,
    itemsGrid = $("#items-grid2");

  (function ($) {
    "use strict";
    var isotopeMode;
    if (itemsGrid.hasClass("masonry")) {
      isotopeMode = "masonry";
    } else {
      isotopeMode = "fitRows";
    }

    itemsGrid.imagesLoaded(function () {
      itemsGrid.isotope({
        itemSelector: ".mix",
        layoutMode: isotopeMode,
        filter: fselector,
      });
    });

    $(".filter").click(function () {
      $(".filter").removeClass("active");
      $(this).addClass("active");
      fselector = $(this).attr("data-filter");

      itemsGrid.isotope({
        itemSelector: ".mix",
        layoutMode: isotopeMode,
        filter: fselector,
      });
      return false;
    });
  })(jQuery);
}
function playAudio(audioId, title, category) {
  let audio = document.getElementById(`${audioId}`);
  if (audio.paused) {
    audio.play();
    $(".play-pause-icon-container").addClass(audioId);
    $(".dot-container").addClass("is-playing-radio");
    $(".audio-title").html(title);
    $(".audio-category").html(category);
    $(".pause-icon").hide();
    $(".play-icon").show();
  } else {
    audio.pause();
    $(".dot-container").removeClass("is-playing-radio");
    $(".pause-icon").show();
    $(".play-icon").hide();
  }
}
function toggleAudioPlay(e) {
  var classNames = $(this).attr("class").split(" ");
  $.each(classNames, function (index, className) {
    console.log(className);
  });
}
