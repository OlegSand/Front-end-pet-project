
const featureElem              = document.getElementById("featured"),
      lastElem                 = document.getElementById("last"),
      featuredWrapp            = document.querySelector('.wrapper_featured'),
      arrow   = document.querySelectorAll('.arrow');

let getCards = new XMLHttpRequest();
getCards.open('GET', '../data.json');


getCards.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    let data = JSON.parse(this.response);
    let  outLast    = '';
    let outFeature = '';
    let getValueLocalStorage = localStorage.getItem('favorite_items');
    let arrValueLocalStorage = JSON.parse(getValueLocalStorage);
    for (let key in data) {
    if(!arrValueLocalStorage) {
      //styles none 
      featuredWrapp.style.display = 'none';
      arrow.forEach((i) => i.style.display ="none"); // hide arrows
      //create element
      outLast    += '<div class="card " id="'+ data[key].id + ' "> ',
      outLast    += '<img src="' + data[key].image + '"' + ' alt="' + data[key].title + '">',
      outLast    += '<svg class="star star-regular" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>',
      outLast    += '<span class="card-name">' + data[key].title + '</span>',
      outLast    += '<span class="card-tags">' + arrayMakeTag(data[key].tags) + '</span>',
      outLast    += '</div>';
      lastElem.innerHTML = outLast;
      }  else {
        arrValueLocalStorage.forEach(function(item) {
          if (item == data[key].id) {
          outFeature    += '<div class="card added_to_favorites" id="'+ data[key].id + ' "> ',
          outFeature    += '<img src="' + data[key].image + '"' + ' alt="' + data[key].title + '">',
          outFeature    += '<svg class="star star-solid" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg>',
          outFeature    += '<span class="card-name">' + data[key].title + '</span>',
          outFeature    += '<span class="card-tags">' + arrayMakeTag(data[key].tags) + '</span>',
          outFeature    += '</div>';
          featureElem.innerHTML = outFeature;
          } else {
            outLast    += '<div class="card " id="'+ data[key].id + ' "> ',
            outLast    += '<img src="' + data[key].image + '"' + ' alt="' + data[key].title + '">',
            outLast    += '<svg class="star star-regular" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg"><path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"></path></svg>',
            outLast    += '<span class="card-name">' + data[key].title + '</span>',
            outLast    += '<span class="card-tags">' + arrayMakeTag(data[key].tags) + '</span>',
            outLast    += '</div>';
            lastElem.innerHTML = outLast;
          }
        })
      }
    }
  }
}

// function that makes tags

function arrayMakeTag(some) {
  let str = '';
  for (let key in some) {
    str += ' #' + some[key];
  };
  return str.slice(1);
};

getCards.onerror = function () {
  console.log('error request');
};

getCards.send();

// function adds image maps to favorites

let favoritesSlot = [];

function addToFavorites(e) {
  e.preventDefault;
  let some = e.target;
  featuredWrapp.style.display = 'flex';
  if(some.closest('.card')) { //check parent     
    let targetElem = some.closest('.card'); //
    let targetId = some.closest('div').id;
    if (!isNaN(targetId) && isFinite(targetId)) {
      favoritesSlot.push(targetId);
      localStorage.setItem('favorite_items', JSON.stringify(favoritesSlot)); //  save arrow "favorites" elements to localStorage
    }
    targetElem.classList.add('added_to_favorites');// add class  "added_to_favorites" to clicked element
    arrow.forEach((i) => i.style.display = "flex"); // visible arrows
    featureElem.prepend(targetElem);// move element to the features - as add to favorites
  } 
}


lastElem.addEventListener('click',addToFavorites);

