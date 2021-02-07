const searchButton = document.getElementById('search_button');
const mealAllList = document.getElementById('meals');
searchButton.addEventListener('click', getAllMeal);

function getAllMeal() {
    let searchInput = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `<div onclick="displayFoodDetail('${meal.strMeal}')" class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>`;
            });} 
            else {
                html = `<h1>No Result Found!</h1>`// bonus part
            }
            mealAllList.innerHTML = html;
        })
}

const displayFoodDetail = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderFoodInfo(data.meals[0]))
}

const renderFoodInfo = meal => {
    const foodDiv = document.getElementById('details');
    foodDiv.innerHTML = `
            <img src = "${meal.strMealThumb}">
            <h1>${meal.strMeal}</h1>
            <h5>Ingredients</h5>
            <p>${meal.strIngredient1}</p>
            <p>${meal.strIngredient2}</p>
            <p>${meal.strIngredient3}</p>
            <p>${meal.strIngredient4}</p>
            <p>${meal.strIngredient5}</p>
            <p>${meal.strIngredient6}. Etc</p>
    `
}
