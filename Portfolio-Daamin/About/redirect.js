
let loadknop = document.getElementById("loadPageButton");





// Add an event listener to the button
loadknop.addEventListener("click", function(){
 
loadknop.innerHTML= '<i class="fa fa-spinner fa-spin"></i> Loading'
  });

  function redirect () {
    setTimeout(myURL, 1500);
    let result = document.getElementById("result");
    result.innerHTML = "<b>Error 404";
 }

 function myURL() {
    document.location.href = 'index.html';
 }


 let loadknop2 = document.getElementById("loadPageButton2");





// Add an event listener to the button
loadknop2.addEventListener("click", function(){
 
loadknop2.innerHTML= '<i class="fa fa-spinner fa-spin"></i> Loading'
  });

  function redirect2() {
    setTimeout(myURL2, 1500);
    let result = document.getElementById("result");
    result.innerHTML = "<b>Error 404";
 }

 function myURL2() {
    document.location.href = '../index.html';
 }