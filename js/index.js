const iniciar = document.getElementById("start");
iniciar.addEventListener("click", (e) => {
  e.preventDefault();
  const vidInt = document.getElementById("search").value;
  //console.log(vidInt);
  obtenerID(vidInt);
});

async function obtenerID(vidInt) {
  const url = `https://youtube138.p.rapidapi.com/search/?q=${vidInt}&hl=en&gl=US`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "adaad128aemsh6cfb78feb6e838dp15a6d2jsn85a17c09c579",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result);
    const idVid = result.contents[1].video.videoId;
    //console.log(idVid);
    setTimeout(contentRelatd(result), 7000);
    infoId(idVid);
    coments(idVid);
  } catch (error) {
    console.error(error);
  }
}

async function infoId(idVid) {
  const url = `https://youtube138.p.rapidapi.com/video/details/?id=${idVid}&hl=en&gl=US`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "adaad128aemsh6cfb78feb6e838dp15a6d2jsn85a17c09c579",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    place(result);
    //console.log(result);
  } catch (error) {
    console.error(error);
  }
}

function place(objeto) {
  document.getElementById(
    "video"
  ).innerHTML = `<iframe class="videoDif" src="https://www.youtube.com/embed/${objeto.videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  document.getElementById("tituloVideo").innerHTML = `<h1>${objeto.title}</h1>`;
  document.getElementById(
    "avatarCreat"
  ).innerHTML = `<img id="avtCreat" src="${objeto.author.avatar[2].url}">`;
  document.getElementById(
    "nomCreat"
  ).innerHTML = `<h2>${objeto.author.title}</h2>`;
  document.getElementById("videscr").innerHTML = `
	<b>Descripcion:</b> </br>	 
	<p>${objeto.description}</p>`;
}

function contentRelatd(videos) {
  let video1 = videos.contents[3].video.videoId;
  let video2 = videos.contents[4].video.videoId;
  let video3 = videos.contents[6].video.videoId;
  document.getElementById("relvid").innerHTML = `
	<div class="rltdvideo"><iframe class="videoDif" src="https://www.youtube.com/embed/${video1}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
	<div class="rltdvideo"><iframe class="videoDif" src="https://www.youtube.com/embed/${video2}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
	<div class="rltdvideo"><iframe class="videoDif" src="https://www.youtube.com/embed/${video3}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
}

async function coments(idVid) {
  const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${idVid}&hl=en&gl=US`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "adaad128aemsh6cfb78feb6e838dp15a6d2jsn85a17c09c579",
      "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    creatComents(result);
  } catch (error) {
    console.error(error);
  }
}

function creatComents(comentarios) {
  let str = "";
  for (let i = 0; i < 29; i++) {
    str += ` <p><b>${comentarios.comments[i].author.title}</b>:${comentarios.comments[i].content}</p></br> `;
  }
  document.getElementById("comts").innerHTML = str;
}
