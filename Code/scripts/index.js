var nameField = document.getElementById("name");
var email;
var password;
var confirmPass = document.getElementById("confirm-pass");
var submitBtn = document.getElementById("submit");
var state = false;
const database = firebase.database();
const auth = firebase.auth();

function signup(obj) {
  const gender = document.querySelectorAll('input[name="gender"]');
  this.email = document.getElementById("email").value;
  this.password = document.getElementById("signup-pwd").value;
  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }

  var selectedVal;
  for (const radioBtn of gender) {
    if (radioBtn.checked) {
      selectedVal = radioBtn.value;
    }
    //TODO handler for if no box is checked
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
  // [END createwithemail]
  database.ref("Users").set({
    Name: nameField.value,
    Email: email,
    Password: pass,
    Gender: selectedVal,
  });
  $(obj).css("display", "flex");
}

function nav() {
  var menu = document.querySelector("ul");
  menu.classList.toggle("active");
}
function passCount(obj) {
  
  document.getElementById("pass").innerHTML = obj.value.length + "/6";
 
}
function confirmCount(obj) {
  document.getElementById("confirm-pass").innerHTML = obj.value.length + "/6";
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
