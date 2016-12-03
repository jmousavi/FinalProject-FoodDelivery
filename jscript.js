
function add(price, id){
var arrayPrice = [];
var arrayPicture = [];
var picture = document.getElementById(id).src;

var priceCookie = getCookie("price");
var pictureCookie = getCookie("picture");
if (priceCookie==""){
     //add to list
     //priceSave()
     arrayPrice.push(price);
     priceSave(arrayPrice);
}
else{
    //get cookie, add cookie to list, add price to list
    //priceSave()
	var holder = getCookie("price");
    arrayPrice = holder.split(",");
    arrayPrice.push(price);
    priceSave(arrayPrice);
}
if (pictureCookie==""){
     //add to list
     //priceSave()
     arrayPicture.push(picture);
     pictureSave(arrayPicture);
}
else{
    //get cookie, add cookie to list, add picture to list
    //pictureSave()
    var holder = getCookie("picture");
    arrayPicture = holder.split(",");
    arrayPicture.push(picture);
    pictureSave(arrayPicture);
}
}
function priceSave(arrayPrice){
var toSave = arrayPrice.toString();
setCookie("price", toSave);
}
function pictureSave(arrayPicture){
var toSave = arrayPicture.toString();
setCookie("picture", toSave);
}
function display(){
    var pictureArray = [];
    var priceArray = [];
    var holder1 = getCookie("picture");
    pictureArray = holder1.split(",");
    var holder2 = getCookie("price");
    priceArray = holder2.split(",");
    console.log(priceArray.toString);
    if(priceArray==""){

    }
    else{
    for(var i=0; i<pictureArray.length; i++){
    var x = document.createElement("img");
    x.src = pictureArray[i];
    document.getElementById("pic").appendChild(x);
    }
    var text = "";
    var total=0;
    for(var i=0; i<priceArray.length; i++){
        total+=Number(priceArray[i]);
        text+="$"+priceArray[i]+"<br>";
    }
    document.getElementById("cart").innerHTML= text+"<br>$"+total;
    }
}
//courtesy of w3schools at http://www.w3schools.com/js/js_cookies.asp
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
//courtesy of w3schools at http://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
