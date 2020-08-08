var email,password;
window.onload = function () {
    $(".loading").css("display", "grid");
    initApp();
  }
  function nav() {
    var menu = document.querySelector("ul ");
    menu.classList.toggle("active");
  }
  function openPopup(obj) {
    $(obj).css("display", "grid");
  }
  function closePopup(obj) {
    $(obj).css("display", "none");
  }
  function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        window.user = user;
        window.userID = user.uid;
        username.innerHTML = user.displayName;
        $("#logout").css("display", "block");
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