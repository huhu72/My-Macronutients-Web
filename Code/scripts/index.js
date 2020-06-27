var state = false;
var checked = false;
var welcome = document.getElementById("welcome");
var password, email, name, confirm_password;
const database = firebase.database();
const auth = firebase.auth();

function signup(loading) {
  const gender = document.querySelectorAll('input[name="gender"]');
  email = document.getElementById("email").value;
  name = document.getElementById("name").value;
  confirmPass = document.getElementById("signup-cpwd").value;
  password = document.getElementById("signup-pwd").value;
  var selectedVal;
  for (const radioBtn of gender) {
    if (radioBtn.checked) {
      selectedVal = radioBtn.value;
      checked = true;
    }
  }
  if (!checked) {
    $(".gender-radio").css("border", ".1px solid red");
    alert("Please choose a gender");
    return;
  }
  if (name.length == 0) {
    alert("Please put in your name");
    return;
  }
  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }
  if (confirmPass != password) {
    alert("Please make sure your passwords match");
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
        return;
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

  database.ref("Users").set({
    Name: name,
    Email: email,
    Password: password,
    Gender: selectedVal,
  });

  $(loading).css("display", "grid");
  setTimeout(function () {
    $(loading).css("display", "none");
    $(".signup").css("display", "none");
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            welcome.innerHTML = "Welcome " + user.displayName;
            $("#signup-btn").css("display", "none");
            $("#login-btn").css("display", "none");
          })
          .catch(function (error) {
            alert(error);
          });
        console.log("Signed in");
      } else {
        firebaseSignIn(email, password);
        user
          .updateProfile({
            displayName: name,
          })
          .then(function () {
            welcome.innerHTML = "Welcome " + user.displayName;
            $("#signup-btn").css("display", "none");
            $("#login-btn").css("display", "none");
          })
          .catch(function (error) {
            alert(error);
          });
      }
    });
  }, 2800);
}
function login(loading) {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-pwd").value;
  var user = firebase.auth().currentUser;
  $(loading).css("display", "grid");
  setTimeout(function () {
    $(loading).css("display", "none");
    firebaseSignIn(email, password);
    if (user) {
      welcome.innerHTML = "Welcome " + user.displayName;
      $("#signup-btn").css("display", "none");
      $("#login-btn").css("display", "none");
      $(".login").css("display", "none");
    } else {
      return;
    }
  }, 2800);
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
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}
function nav() {
  var menu = document.querySelector("ul");
  menu.classList.toggle("active");
}
function passCount(obj) {
  var password_counter = document.getElementById("password-counter");
  this.password = obj.value;

  if (obj.value.length < 6) {
    password_counter.innerHTML = obj.value.length + "/6";
    $("#signup-pwd-wrapper").css("border-bottom", " .8px solid red");
  } else {
    password_counter.innerHTML = "";
    $("#signup-pwd-wrapper").css("border-bottom", " .8px solid #707070");
  }
}
function confirmCount(obj) {
  var confirm_password_counter = document.getElementById(
    "confirm-password-counter"
  );
  if (obj.value.length < 6) {
    confirm_password_counter.innerHTML = obj.value.length + "/6";
    $("#confirm-signup-pwd-wrapper").css("border-bottom", " .8px solid red");
  } else if (obj.value != this.password) {
    confirm_password_counter.innerHTML = "Passwords do not match";
    $("#confirm-signup-pwd-wrapper").css("border-bottom", " .8px solid red");
    $("#confirm-password-counter").css("color", "red");
  } else {
    confirm_password_counter.innerHTML = "";
    $("#confirm-signup-pwd-wrapper").css(
      "border-bottom",
      " .8px solid #707070"
    );
  }
}
function nameCount(obj) {
  this.name = obj.value;
  if (obj.value.length < 1) {
    $("#name").css("border-bottom", " .8px solid red");
  } else {
    $("#name").css("border-bottom", " .8px solid #707070");
  }
}
function emailCount(obj) {
  var name = document.getElementById("name").value;
  this.email = obj.value;
  if (obj.value.length < 5) {
    $("#email").css("border-bottom", " .8px solid red");
  } else {
    $("#email").css("border-bottom", " .8px solid #707070");
  }
  if (name.length == 0) {
    $("#name").css("border-bottom", " .8px solid red");
  }
}
function openPopup(obj) {
  $(obj).css("display", "grid");
}

function closePopup(obj) {
  $(obj).css("display", "none");
}
function toggle() {
  if (state) {
    document.getElementById("login-pwd").type = "password";
    document.getElementById("signup-pwd").type = "password";
    document.getElementById("signup-cpwd").type = "password";
    $(".fas").removeClass("fa-eye").addClass("fa-eye-slash");
    state = false;
  } else {
    document.getElementById("login-pwd").type = "text";
    document.getElementById("signup-pwd").type = "text";
    document.getElementById("signup-cpwd").type = "text";
    $(".fas").removeClass("fa-eye-slash").addClass("fa-eye");
    state = true;
  }
}
