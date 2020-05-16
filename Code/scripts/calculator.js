function nav(){
    var menu = document.querySelector('ul');
    menu.classList.toggle('active');

}
function calculate(){
    $('#content-wrapper').css("grid-template-columns",".5fr .2fr .5fr .4fr")
    $('.calculation').css("display","inline");
    
}
function navCalculate(){
    $('#content-wrapper').css("grid-template-columns","auto auto")
    $('.calculation').css("display","inline");
    
}
