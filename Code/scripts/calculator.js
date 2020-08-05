function nav() {
  var menu = document.querySelector("ul");
  menu.classList.toggle("active");
}
var multiplier, calories, userSelection, gender;
var weight;
function calculate() {
  var w = parseInt(window.innerWidth);
  if (w >= 768) {
    $("#content-wrapper").css("grid-template-columns", ".5fr .2fr .5fr .4fr");
  } else {
    $("#content-wrapper").css(
      "grid-template-columns",
      "max-content max-content"
    );
    $("#content-wrapper").css("column-gap", "3em");
  }
  $(".calculation").css("display", "inline");

  this.gender = $("input[name=gender]:checked").val();
  if (gender == "Female") {
    this.multiplier = 12;
  } else {
    this.multiplier = 15;
  }
  this.weight = document.getElementById("weight").value;
  this.userSelection = document.getElementById("goals").value;
  this.calories = calcCalories(weight, multiplier);
  calcMacros(weight, userSelection, calories);
  console.log(weight);
}
function add() {
  this.gender = $("input[name=gender]:checked").val();
  calcMacros(weight, userSelection, calories + 250);
}
function subtract() {
  this.gender = $("input[name=gender]:checked").val();
  calcMacros(weight, userSelection, calories - 250);
}

function calcCalories(weight, multiplier) {
  return weight * multiplier;
}

function calcMacros(weight, userSelection, calories) {
  var proteinPercentage,
    fatPercentage,
    carbs,
    proteins,
    fats,
    carbCalories,
    proteinCalories,
    fatCalories;

  if (userSelection == "Cut") {
    proteinPercentage = 1.1;
    fatPercentage = 0.2;
    calories = calories - 250;
  } else if (userSelection == "Bulk") {
    proteinPercentage = 0.8;
    fatPercentage = 0.25;
    calories = calories + 250; 
  } else {
    proteinPercentage = 0.8;
    fatPercentage = 0.2;
  }
  proteins = Math.round(weight * proteinPercentage);
  proteinCalories = proteins * 4;
  fatCalories = Math.round((calories - proteinCalories) * fatPercentage);
  fats = Math.round(fatCalories / 9.0);
  carbCalories = calories - proteinCalories - fatCalories;
  carbs = Math.round(carbCalories / 4.0);
  this.calories = calories;
  document.getElementById("calories-calc").innerHTML = calories;
  document.getElementById("protein-calc").innerHTML = proteins + "g";
  document.getElementById("protein-cal-calc").innerHTML = proteinCalories;
  document.getElementById("carb-calc").innerHTML = carbs + "g";
  document.getElementById("carb-cal-calc").innerHTML = carbCalories;
  document.getElementById("fat-calc").innerHTML = fats + "g";
  document.getElementById("fat-cal-calc").innerHTML = fatCalories;
}
function getCookie(cookieName) {
  cookieName += "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  console.log(cookieName);
  console.log(cookieArray);
  console.log(cookieArray[0].indexOf(cookieName));
  for (var i = 0; i < cookieArray.length; i++) {
    var cookiePair = cookieArray[i];
    while (cookiePair.charAt(0) == " ") {
      cookiePair = cookiePair.substring(1);
    }
    if (cookiePair.indexOf(cookieName) == 0) {
      return cookiePair.substring(cookieName.length, cookiePair.length);
    }
  }
  return "";
}
