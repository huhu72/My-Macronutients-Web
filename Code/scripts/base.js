/*function setCookie(name, value) {
    var date = new Date();
    var l = ";samesite=strict";
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    document.cookie =
      name + "=" + value + ";" + "expires=" + date.toUTCString() + l + ";path=/";
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
  function deleteCookie() {
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }*/
var userID;
var database = firebase.database();
const auth = firebase.auth();

function nav() {
  var menu = document.querySelector("ul");
  menu.classList.toggle("active");
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
    // setCookie("email", email);
    //setCookie("password", password);
  }
}
function firebaseSignIn(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
        $(".loading").css("display", "none");
        return;
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}
function logout() {
  firebase
    .auth()
    .signOut()
    .then(
      function () {
        location.reload();
        console.log("Signed Out");
      },
      function (error) {
        console.error("Sign Out Error", error);
      }
    );
  // deleteCookie();
}

 function initApp(page) {
  firebase.auth().onAuthStateChanged(function (user) {
    
    if (user) {
      window.user = user;
      window.userID = user.uid;
      username.innerHTML = user.displayName;
      if (page == "main") {
        welcome.innerHTML = "Welcome " + user.displayName;
        $("#signup-btn").css("display", "none");
        $("#login-btn").css("display", "none");
        $(".signup").css("display", "none");
      } else if (page == "progress") {
        $(".non-member").css("display", "none");
      }else{}
      $("#logout").css("display", "block");
      $(".login").css("display", "none");
      $("#nav-login").css("display", "none");
      $("#nav-logout").css("display", "grid");
      $(".loading").css("display", "none");
      uGender();
    } else {
      $("#nav-login").css("display", "grid");
      $(".loading").css("display", "none");
    }
  });
} 
function uGender() {
  var genderDBReference = firebase
    .database()
    .ref("Users/" + userID + "/Profile/Gender");
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
function openPopup(obj) {
  $(obj).css("display", "grid");
}
function closePopup(obj) {
  $(obj).css("display", "none");
}
