var nameField = document.getElementById("name");
var email= document.getElementById("email");
var pass = document.getElementById("pass");
var confirmPass = document.getElementById("confirm-pass");
var submitBtn = document.getElementById("submit");
const database = firebase.database();
const auth = firebase.auth();

submitBtn.addEventListener('click',e=> {

    const gender = document.querySelectorAll('input[name="gender"]');
    let selectedVal;
    for(const radioBtn of gender){
        if(radioBtn.checked){
            selectedVal = radioBtn.value;
        }
        //TODO handler for if no box is checked
    }
    auth.createUserWithEmailAndPassword(email.value,pass.value);
    database.ref("Users").set({
        Name: nameField.value,
        Email: email.value,
        Password: pass.value,
        Gender : selectedVal
       });
    
    
  });
function nav(){
    var menu = document.querySelector('ul');
    menu.classList.toggle('active');

}
function passCount(obj){
    document.getElementById('pass').innerHTML = obj.value.length + '/10'
    console.log(obj.value.length);

}
function confirmCount(obj){
    document.getElementById('confirm-pass').innerHTML = obj.value.length + '/10'

}

function openPopup(obj){
    $(obj).css("display", "grid");
}


function closePopup(obj){
    $(obj).css("display", "none");
    $(obj).css("display", "none");
}
