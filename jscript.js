//for display function
var pictureArray = [];
var priceArray = [];
var total = 0;
var arrayPrice = [];
var arrayPicture = [];

function add(price, id){

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
console.log(arrayPrice.toString());
console.log(arrayPicture.toString());
var text = id + " has been added to your cart!";
window.alert(text);
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
    var holder1 = getCookie("picture");
    pictureArray = holder1.split(",");
    var holder2 = getCookie("price");
    priceArray = holder2.split(",");
    console.log(priceArray.toString);
    if(priceArray==""){
        var t = document.createTextNode("Your Cart is Empty ):");
        var p = document.createElement("p");
        p.appendChild(t)
        document.getElementById("pic").appendChild(p);
    }
    else{
    for(var i=0; i<pictureArray.length; i++){
    //creating image
    var d = document.createElement("div");
    document.getElementById("pic").appendChild(d);
    var x = document.createElement("img");
    x.src = pictureArray[i];
    d.appendChild(x);
    //create a parent div for delete button and price
    var parentDiv = document.createElement("div");
    d.appendChild(parentDiv);

        parentDiv.textContent = "$" + priceArray[i];
        parentDiv.className = "delItem"

        //divider between text and button
        var div = document.createElement("div");
        div.className="divider";
        parentDiv.appendChild(div);

    //creating delete button
    var delBut = document.createElement("button");
    var t = document.createTextNode("Delete");
    delBut.appendChild(t);
    delBut.className="btn2";
    delBut.addEventListener("click", blah);

    
    div.appendChild(delBut);
    }
    
    for(var i=0; i<priceArray.length; i++){
        //var x = document.createElement("p");
        //x.textContent = "$" + priceArray[i];
        //document.getElementById("food").appendChild(x);
        total+=Number(priceArray[i]);
    }
    total = Math.round(total*100)/100;
    document.getElementById("cart").innerHTML= "Total<br>$"+total;
    }
    setCookie("total",total);
    //checkout button
    var endDiv = document.createElement("div");
    document.getElementById("cart").appendChild(endDiv);
    var clearCart = document.createElement("button");
    clearCart.className="btn2";
    var clearText = document.createTextNode("Clear Cart");
    clearCart.appendChild(clearText);
    clearCart.addEventListener("click",clear);
    var checkOut = document.createElement("button");
    var text = document.createTextNode("Check Out");
    checkOut.className = "btn2";
    var link = document.createElement("a");
    link.className="linker";
    link.href="checkout.html"
    link.appendChild(text);
    checkOut.appendChild(link);
    endDiv.appendChild(clearCart);
   var divide= document.createElement("div");
   divide.className="divider";
   endDiv.appendChild(divide);
    endDiv.appendChild(checkOut);
}
function blah(){
  console.log(priceArray.toString());
  console.log(pictureArray.toString());
 // console.log(i);

  var mom = this.parentNode;
  var grandma = mom.parentNode;
  var gg = grandma.parentNode;
  var item = gg.firstChild.src;
  console.log(item);
  var index = pictureArray.indexOf(item);
  console.log(index);
  pictureArray.splice(index,1);
  priceArray.splice(index,1);
  priceSave(priceArray);
  pictureSave(pictureArray);
  console.log(priceArray.toString());
  console.log(pictureArray.toString());
  location.reload();
 /* //grandma.removeChild(mom);
  var itemRemove = grandma.textContent;
  itemRemove=itemRemove.toString();
  console.log(itemRemove);
  itemRemove = itemRemove.slice(1,itemRemove.length);
  console.log(itemRemove);
  console.log(itemRemove.length);
  if(itemRemove.length==11){
    itemRemove= itemRemove.slice(0,5);
  }
  else if(itemRemove.length==10){
     itemRemove= itemRemove.slice(0,4);
  }
   console.log(itemRemove);
  var index = priceArray.indexOf(itemRemove);
  console.log(index);

  var itemIndex = priceArray.indexOf(itemRemove);
  pictureArray.splice(index,1);
  priceArray.splice(index,1);
  priceSave(priceArray);
  pictureSave(pictureArray);
  console.log(priceArray.toString());
  console.log(pictureArray.toString());
  //location.reload();*/
}
function clear(){
    setCookie("picture", "");
    setCookie("price", "");
    location.reload();
}
function checkoutDisplay(){
    var total = getCookie("total");
    console.log(total);
    document.getElementById("check").innerHTML="Your Total is<br>$"+total;
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
