var nameField = document.getElementById("name");
var email;
var pass;
var confirmPass = document.getElementById("confirm-pass");
var submitBtn = document.getElementById("submit");
var state = false;
const database = firebase.database();
const auth = firebase.auth();

submitBtn.addEventListener("click", (e) => {
  const gender = document.querySelectorAll('input[name="gender"]');
  this.email = document.getElementById("email").value;
  this.pass = document.getElementById("signup-pwd").value; 
  var selectedVal;
  for (const radioBtn of gender) {
    if (radioBtn.checked) {
      selectedVal = radioBtn.value;
    }
    //TODO handler for if no box is checked
  }
  
  //auth.createUserWithEmailAndPassword(email, pass);
  database.ref("Users").set({
    Name: nameField.value,
    Email: email,
    Password: pass,
    Gender: selectedVal,
  });
});
function nav() {
  var menu = document.querySelector("ul");
  menu.classList.toggle("active");
}
function passCount(obj) {
  document.getElementById("pass").innerHTML = obj.value.length + "/10";
  console.log(obj.value.length);
}
function confirmCount(obj) {
  document.getElementById("confirm-pass").innerHTML = obj.value.length + "/10";
}

function openPopup(obj) {
  $(obj).css("display", "grid");
}

function closePopup(obj) {
  $(obj).css("display", "none");
  $(obj).css("display", "none");
}
function toggle() {
  if (state) {
    document.getElementById("login-pwd").type = "password";
    document.getElementById("signup-pwd").type = "password";
    document.getElementById("signup-cpwd").type = "password";
    $('.fas').removeClass("fa-eye").addClass("fa-eye-slash");
    state = false;
  } else {
    document.getElementById("login-pwd").type = "text";
    document.getElementById("signup-pwd").type = "text";
    document.getElementById("signup-cpwd").type = "text";
    $('.fas').removeClass("fa-eye-slash").addClass("fa-eye");
    state = true;
  }
}
