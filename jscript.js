/*Author: Jasmin Mousavi
  Final Project: Ordering Food*/
//for display function
var pictureArray = [];
var priceArray = [];
var total = 0;
var arrayPrice = [];
var arrayPicture = [];
var checked = false;

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
			delBut.addEventListener("click", deleteFunct);


			div.appendChild(delBut);
		}

		for(var i=0; i<priceArray.length; i++){
			//var x = document.createElement("p");
			//x.textContent = "$" + priceArray[i];
			//document.getElementById("food").appendChild(x);
			total+=Number(priceArray[i]);
		}
		total = Math.round(total*100)/100;
		total = total.toFixed(2);
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
function deleteFunct(){
	var mom = this.parentNode;
	var grandma = mom.parentNode;
	var gg = grandma.parentNode;
	var item = gg.firstChild.src;
	var index = pictureArray.indexOf(item);
	pictureArray.splice(index,1);
	priceArray.splice(index,1);
	priceSave(priceArray);
	pictureSave(pictureArray);

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
	/* if(total==0){
	   var empty = document.createElement("div");
	   var text = document.createTextNode("Your cart is empty");
	   empty.appendChild(text);
	   document.getElementById("checks").appendChild(empty);
	   }
	   else{*/
	var gTotal = Number(total)+4;
	gTotal = gTotal.toFixed(2);
	var parent = document.createElement("div");
	document.getElementById("checks").appendChild(parent);
	var grandTotal = document.createElement("p");
	grandTotal.innerHTML= "Total: $"+ total+"<br>Delivery Fee: $4.00<br>Grand Total: $"+gTotal+"<br><br>How will you be paying?<br>";
	parent.appendChild(grandTotal);

	var cash = document.createTextNode("Cash");
	var card = document.createTextNode("Card");

	var divider = document.createElement("div");
	divider.className="divider";

	var cashCheckbox = document.createElement("input");
	cashCheckbox.type = "checkbox";
	cashCheckbox.id = "cashCheck";
	//cashCheckbox.className = "checker";
	var cardCheckbox = document.createElement("input");
	cardCheckbox.type = "checkbox";
	cardCheckbox.id = "cardCheck";
	cardCheckbox.addEventListener("click",getInfo)
		grandTotal.appendChild(cash);
	grandTotal.appendChild(cashCheckbox);
	grandTotal.appendChild(divider);
	grandTotal.appendChild(card);
	grandTotal.appendChild(cardCheckbox);

	var secondDiv = document.createElement("div");
	document.getElementById("deliv").appendChild(secondDiv);
	var deliveryText = document.createTextNode("Where would you like your food delivered?");
	secondDiv.appendChild(deliveryText);
	var newP = document.createElement("div");
	newP.innerHTML = "Enter your adress:<br>"
		var address = document.createElement("input");
	address.id = "addy";
	var divider2 = document.createElement("div");
	divider2.className="divider";
	secondDiv.appendChild(newP);
	newP.appendChild(address);
	address.addEventListener("change",saveAddress);
	var finishButton = document.createElement("button");
	var finishText = document.createTextNode("Finish");
	finishButton.className = "btn2";
	var link = document.createElement("a");
	link.className="linker";
	link.href="finish.html"
		link.appendChild(finishText);
	finishButton.appendChild(link);
	secondDiv.appendChild(finishButton);
}
function saveAddress(){
	var address = document.getElementById("addy").value;
	setCookie("savedAddress",address);

}
function getInfo(){
	var parent=this.parentNode;

	if(checked == false){
		var child = document.createElement("div");
		child.id = "bob";
		parent.appendChild(child);
		var text = document.createTextNode("Enter Credit Card Number:");
		text.id = "t";
		var cardInput = document.createElement("input");
		cardInput.id = "ci";
		cardInput.addEventListener("change",saveCard);
		child.appendChild(text);
		child.appendChild(cardInput);
		checked = true;

	}
	else{
		var x = document.getElementById("bob");
		parent.removeChild(x);
		checked=false;
	}
}
function saveCard(){
	var card = document.getElementById("ci").value;
	setCookie("cardInfo", card);
}
function finishDisplay(){
	var card = getCookie("cardInfo");
	var address = getCookie("savedAddress");
	total = getCookie("total");
	if(total==0){
		document.getElementById("deliv").innerHTML="Your cart is empty";
	}
	else{
		if(card==""||card=="undefined"){
			if(address=="undefined"||address==""){
				document.getElementById("deliv").innerHTML="Please press the back button and enter address";
			}
			else{
				var grandTotal = Number(total)+4;
				grandTotal = grandTotal.toFixed(2);
				var address = getCookie("savedAddress");
				document.getElementById("deliv").innerHTML="You will owe $"+grandTotal+" cash<br>Your food item(s) will be delivered to:<br>"+address;
			}
		}
		else{
			if(address=="undefined"||address==""){
				document.getElementById("deliv").innerHTML="Please press the back button and enter address";
			}
			else{
				var grandTotal = Number(total)+4;
				grandTotal = grandTotal.toFixed(2);
				var address = getCookie("savedAddress");
				document.getElementById("deliv").innerHTML="Your food item(s) will be delivered to:<br>"+address;
			}
		}
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
