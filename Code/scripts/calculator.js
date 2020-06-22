function nav(){
    var menu = document.querySelector('ul');
    menu.classList.toggle('active');

}
function calculate(){
    var w = parseInt(window.innerWidth);
    if(w >= 768 ){
    $('#content-wrapper').css("grid-template-columns",".5fr .2fr .5fr .4fr")
    }
    else{
    $('#content-wrapper').css("grid-template-columns","auto auto")
    }
    $('.calculation').css("display","inline");
}

