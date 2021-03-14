var recipeID = '8ef87cb1';
var recipeKey = 'bb685a0401f2fc75e31942def94ff23f';
var nutritionID = '2b527145';
var nutritionKey = 'c7d83e1d210fa0e3ac0038d0b9a3c8be';
var searchForm = document.querySelector('#recipe-search-form');
var searchInput = document.querySelector('#search-input');
var resultsContainer = document.querySelector('#results-container');
var recipeBookButton = document.querySelector('#recipe-book-button');
var cardField = document.querySelector('#card-field');
var recipeList = [];
var searchIngredient;

function displayCards() {
  savedRecipes = JSON.parse(localStorage.getItem('saved-recipes'));
  if (savedRecipes !== null) {
    recipeList = savedRecipes;
    for (var i = 0; i < recipeList.length; i++) {
    var recLabel = recipeList[i].recipeLabel;
    var recYield = recipeList[i].recipeYield;
    var recSource = recipeList[i].recipeSource
    var recTime = recipeList[i].recipeTime;
    var recImage = recipeList[i].recipeImage;
    var recIngs = recipeList[i].recipeIngredients;
    var recUrl = recipeList[i].recipeUrl;

    renderCards(recLabel, recSource, recYield, recTime, recImage, recIngs, recUrl);
    }
  } else {
    alert('There are no saved recipes');
  }

 
}


function renderCards(name, source, yield, time, image, ingredients, url) {
  console.log(name, yield, time, image, ingredients);
  console.log('renderCards is being called')



  //card column
  var cardColumn = document.createElement('div');
  cardColumn.setAttribute('class', 'column is-one-quarter');
  cardField.appendChild(cardColumn);

  //card element
  var cardEl = document.createElement('div');
  cardEl.setAttribute('class', 'card mt-3');
  cardColumn.appendChild(cardEl);
  //card image
  var cardImgDiv = document.createElement('div');
  cardImgDiv.setAttribute('class', 'card-image');
  cardEl.appendChild(cardImgDiv);

  var cardImgFig = document.createElement('figure');
  cardImgFig.setAttribute('class', 'image is-4by3');
  cardImgDiv.appendChild(cardImgFig);

  var cardImage = document.createElement('img');
  cardImage.setAttribute('src', image);
  cardImage.setAttribute('alt', name);
  cardImgFig.appendChild(cardImage);
  // card content
  var cardContentDiv = document.createElement('div');
  cardContentDiv.setAttribute('class', 'card-content');
  cardEl.appendChild(cardContentDiv);

  var cardMediaDiv = document.createElement('div');
  cardMediaDiv.setAttribute('class', 'media')
  cardContentDiv.appendChild(cardMediaDiv);

  var cardMediaContent = document.createElement('div');
  cardMediaContent.setAttribute('class', 'media-content');
  cardMediaDiv.appendChild(cardMediaContent);

  var cardTitle = document.createElement('p');
  cardTitle.setAttribute('class', 'title is-4');
  cardTitle.textContent = name;
  cardMediaContent.appendChild(cardTitle);

  var cardSource = document.createElement('p');
  cardSource.setAttribute('class', 'subtitle is-6');
  cardSource.textContent = source;
  cardMediaContent.appendChild(cardSource);

  var cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'content');
  cardContentDiv.appendChild(cardContent);

  var cardList = document.createElement('ul');
  cardContent.appendChild(cardList);

  var cardLi1 = document.createElement('li');
  cardList.appendChild(cardLi1);
  var cookTimeStrong = document.createElement('strong');
  cookTimeStrong.textContent = 'Cook Time: ';
  cardLi1.appendChild(cookTimeStrong);
  var cookTimeText = document.createElement('p');
  cookTimeText.textContent = 'about ' + time + ' minutes';
  cardLi1.appendChild(cookTimeText);

  var cardLi2 = document.createElement('li');
  cardList.appendChild(cardLi2);
  var yieldStrong = document.createElement('strong');
  yieldStrong.textContent = 'Yield: ';
  cardLi2.appendChild(yieldStrong);
  var yieldText = document.createElement('p');
  yieldText.textContent = yield + ' servings';
  cardLi2.appendChild(yieldText);
  //card buttons
  var cardBtnRow = document.createElement('div');
  cardBtnRow.setAttribute('class', 'columns is-centered is-multiline');
  cardContentDiv.appendChild(cardBtnRow);

  var cardBtnCol1 = document.createElement('div');
  cardBtnCol1.setAttribute('class', 'column crd-btn-col');
  cardBtnRow.appendChild(cardBtnCol1);
  var cardButton1 = document.createElement('button');
  cardButton1.setAttribute('class', 'button is-success is-rounded');
  cardButton1.textContent = 'View nutrition facts';
  cardBtnCol1.appendChild(cardButton1);
  cardBtnCol1.addEventListener('click', function(){
    getNutritionFacts(name, yield, ingredients);
  });

  var cardBtnCol2 = document.createElement('div');
  cardBtnCol2.setAttribute('class', 'column crd-btn-col');
  cardBtnRow.appendChild(cardBtnCol2);
  var cardButton2 = document.createElement('button');
  cardButton2.setAttribute('class', 'button is-link is-rounded');
  cardButton2.textContent = 'Go to recipe';
  cardBtnCol2.appendChild(cardButton2);
  cardButton2.addEventListener('click', function(){
    window.open(url);
  });

  var cardBtnCol3 = document.createElement('div');
  cardBtnCol3.setAttribute('class', 'column crd-btn-col');
  cardBtnRow.appendChild(cardBtnCol3);
  var cardButton3 = document.createElement('button');
  cardButton3.setAttribute('class', 'button is-danger is-rounded');
  cardButton3.textContent = 'Remove';
  cardBtnCol3.appendChild(cardButton3);

}

function getNutritionFacts(title, yield, ingredients ) {
  console.log('get nut facts is being called');

    var postURL = 'https://api.edamam.com/api/nutrition-details?app_id=' + nutritionID + '&app_key=' + nutritionKey;
  
    const data = {
      "title": title,
      "yield": "About" + yield + "servings",
      "ingr": ingredients
    }
  
  fetch(postURL, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log()
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
  
}

displayCards();


