
const featureElem              = document.getElementById("featured"),
      lastElem                 = document.getElementById("last"),
      favoritesRegularFeatured = document.getElementsByClassName("featured_card"),
      favoritesRegularLast     = document.getElementsByClassName("card"),
      featuredWrapp            = document.querySelector('.wrapper_featured');

let getCards = new XMLHttpRequest();
getCards.open('GET', '../data.json');


getCards.onload = function () {
  if (this.status >= 200 && this.status < 400) {
    let data = JSON.parse(this.response);
    let arr = [];
    let  outLast    = '';
    let outFeature = '';
    let getValueLocalStorage = localStorage.getItem('favorite_items');
    let arrValueLocalStorage = JSON.parse(getValueLocalStorage);
    console.log(arrValueLocalStorage);
        let dataKeyId = [];
       for (let key in data) {
         
         
         dataKeyId.push(data[key].id);        

        if(!arrValueLocalStorage) {
          featuredWrapp.style.display = 'none';
          console.log('hwgdfhsf');
          outLast    += '<div class="card " id="'+ data[key].id + ' "> ',
          outLast    += '<img src="' + data[key].image + '"' + ' alt="' + data[key].title + '">',
          outLast    += '<span>' + data[key].title + '</span>',
          outLast    += '<span>' + arrayMakeTag(data[key].tags) + '</span>',
          outLast    += '</div>';
          lastElem.innerHTML = outLast;
          } else {
            arrValueLocalStorage.forEach(function(item) {
          if (item == data[key].id) {
            outFeature    += '<div class="card added_to_favorites" id="'+ data[key].id + ' "> ',
            outFeature    += '<img src="' + data[key].image + '"' + ' alt="' + data[key].title + '">',
            outFeature    += '<span>' + data[key].title + '</span>',
            outFeature    += '<span>' + arrayMakeTag(data[key].tags) + '</span>',
            outFeature    += '</div>';
            arr.push(data[key].id);
            featureElem.innerHTML = outFeature;
            console.log(arr);
          } else {
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
  // e.preventDefault;
  let some = e.target;
  featuredWrapp.style.display = 'flex';

  if(some.closest('.card')) { //определяем родителя 
    
    let targetElem = some.closest('.card'); //
    let targetId = some.closest('div').id;
    if (!isNaN(targetId) && isFinite(targetId)) {
      favoritesSlot.push(targetId);
      localStorage.setItem('favorite_items', JSON.stringify(favoritesSlot)); // сохраняем МАССИВ "избранных" элементов в localStorage
    }
    console.log(some.closest('div').id);

    targetElem.classList.add('added_to_favorites');//вешаем дополнительный класс added_to_favorites на элемент по которому кликнули
    featureElem.prepend(targetElem);// перемещаем элемент(карточку) в features - как добавленные в избранные
    console.log(favoritesSlot);
  } 
}


lastElem.addEventListener('click',addToFavorites);
