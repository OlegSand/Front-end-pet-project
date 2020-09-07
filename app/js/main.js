// $("document").ready(function () {
//   loadGoods();
// });

// function loadGoods() {
//   $.getJSON("../data.json", function (data) {
//     console.log(data);
//     let out = "";
//     for (let key in data) {
//       out += "<p>" + data[key]['id'] + "</p>",
//         out += '<img src="' + data[key].image + '">';
//     }
//     $("#featured").html(out);
//   });
// }
const featureElem      = document.getElementById("featured"),
      lastElem         = document.getElementById("last"),
      favoritesRegular = document.getElementsByClassName("featured_card");

let getCards = new XMLHttpRequest();
getCards.open('GET', '../data.json');


getCards.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    let data = JSON.parse(this.response);
    let outFeature = '',
        outLast    = '',
        featureFinalObj = data.filter(item => item.id < 14),
        lastFinalObj    = data.filter(item => item.id > 13);
    for (let key in featureFinalObj) {
      outFeature += '<div class="featured_card" id="'+ featureFinalObj[key].id + '">',
      outFeature += '<img src="' + featureFinalObj[key].image + '"' + ' alt="' + featureFinalObj[key].title + '">',
      // outFeature += '<span class="favorite"><img src="icons/star-regular.svg"></span>',
      // outFeature += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"/ style{z-index="100"}></svg>'
      // outFeature += '<span>' + featureFinalObj[key].title + '</span>',
      // outFeature += '<span>' + arrayMakeTag(featureFinalObj[key].tags) + '</span>',
      outFeature += '</div>'
    }
    // for (let key in lastFinalObj) {
    //   outLast    += '<div class="last_card" id="'+ lastFinalObj[key].id + '">',
    //   outLast    += '<img src="' + lastFinalObj[key].image + '"' + ' alt="' + lastFinalObj[key].title + '">',
    //   outLast    += '<img src="' + lastFinalObj[key].image + '"' + ' alt="' + lastFinalObj[key].title + '">',
    //   outLast    += '<span>' + lastFinalObj[key].title + '</span>',
    //   outLast    += '<span>' + arrayMakeTag(lastFinalObj[key].tags) + '</span>',
    //   outLast    += '</div>';
    // }
    featureElem.innerHTML = outFeature;
    // lastElem.innerHTML    = outLast;
  } else {
    console.log('request reached  server, but it returned an error')
  }
};

getCards.onerror = function () {
  console.log('error request');
};

getCards.send();

function arrayMakeTag(some) {
  let str = '';
  for (let key in some) {
    str += ' #' + some[key];
  };
  return str.slice(1);
};

function favorites(e) {
  // e.preventDefault;
  return console.log('onclick work');
}

for(let i=0; favoritesRegular.lenght; i++) {
  favoritesRegular[i].addEventListener('click', favorites)
}