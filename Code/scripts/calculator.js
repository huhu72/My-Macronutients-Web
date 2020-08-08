var multiplier, calories, userSelection, gender, weight, email, password;
function nav() {
  var menu = document.querySelector("ul ");
  menu.classList.toggle("active");
}
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

//Logs in user and make changes to the page
function login() {
  //User is signed in
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  }
  //logs in the user
  else {
    window.email = document.getElementById("login-email").value;
    window.password = document.getElementById("login-pwd").value;
    if (email.length < 4 || password.length < 4) {
      alert("Please enter a valid log in information");
      return;
    }
    firebaseSignIn(email, password);
    setCookie("email", email);
    setCookie("password", password);
  }
}
function initApp() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      window.user = user;
      window.userID = user.uid;
      username.innerHTML = user.displayName;
      uGender();
      $("#nav-logout").css("display", "grid");
      $("#nav-login").css("display", "none");
      $(".login").css("display","none");

    } else {
      $(".loading").css("display", "none");
      $("#nav-login").css("display", "grid");
     
    }
  });
}
function uGender() {
  var genderDBReference = firebase
    .database()
    .ref("Users/" + userID + "/Gender");
  genderDBReference
    .once("value", function (snap) {
      userGender = snap.val();
    })
    .then(function () {
      if (userGender == "Male") {
        $("#avatar").css("background-image", "url(/images/male.svg)");
      } else {
        $("#avatar").css("background-image", "url(/images/female.svg)");
      }
      $(".loading").css("display", "none");
    });
}
window.onload = function () {
  $(".loading").css("display", "grid");
  initApp();
};
function openPopup(obj) {
  $(obj).css("display", "grid");
}
function closePopup(obj) {
  $(obj).css("display", "none");
}
