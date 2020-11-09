var quantity = "1";
var glazeIndex = 0;
var images = ["assets/original.jpg", "assets/original1.jpg", "assets/original2.jpg", "assets/original3.jpg"];
var glazes = ["None", "Sugar Milk", "Vanilla Milk", "Double Chocolate"];

// display the items in the cart
function displayCart(count, items){
    var mainCart = document.getElementById("cartContents");
    mainCart.innerHTML = "<p id='numOfItems'></p>";
    document.getElementById("numOfItems").innerHTML = "Total: " + count + " items";
    var delivery;
    if(count === 0){
        document.getElementById("numOfItems").innerHTML += "</br> Browse the shop to add items to cart.";
        document.getElementById("checkout").style.opacity = 0.4;
        delivery = 0;
    }
    else {
        for(var i = 0; i < 4; i++){
            if(items[i] !== undefined && items[i] !== null && items[i] !== 0){
                var currItem = document.createElement("div");
                currItem.className = "oneChoice";
                var currImg = document.createElement("img");
                currImg.src = images[i];
                currImg.alt = "Original roll";
                currImg.className = "itemImg";
                currItem.appendChild(currImg);
                var currItemInfo = document.createElement("div");
                currItemInfo.className = "choiceInfo";
                var itemCost = 3 * items[i];
                currItemInfo.innerHTML = "<h3>Original <span class='cost'>$" + itemCost.toString() + ".00</span></h3>";
                currItemInfo.innerHTML += "<p>Quantity: " + items[i].toString() +  "<span class='glazeOption'>Glaze: "+ glazes[i] + "</span> <span class='deleteOption'><button class='delete' onClick=deleteItem(" + i.toString() + ")>Delete</button></span></p>"
                currItem.appendChild(currItemInfo);
                mainCart.appendChild(currItem);
            }
            delivery = 3;
        }
    }
    var subtotal = count * 3;
    var total = subtotal + delivery;
    document.getElementById("subtotal").innerHTML = "$" + subtotal.toString() + ".00";
    document.getElementById("delivery").innerHTML = "$" + delivery.toString() + ".00";
    document.getElementById("total").innerHTML = "$" + total.toString() + ".00";

}

// when the page starts loading
function loading () {
    var count = localStorage.getItem("count") || "0";
    var items;
    if(localStorage.getItem("items")){
        items= JSON.parse(localStorage.getItem("items"));
    } else {
        items = new Array(4);
    }
    document.getElementById("cart").innerHTML = "Cart (" + count + ")"; 
    if(document.getElementById("cartContents") !== null){
        displayCart(parseInt(count), items);
    }
}

// when the user adds an item to cart
function addToCart (type) {
    var items;
    if(localStorage.getItem("items")){
        items= JSON.parse(localStorage.getItem("items"));
    } else {
        items = new Array(4);
    }
    var count = localStorage.getItem("count") || "0";
    var q = parseInt(quantity);
    var newCount = parseInt(count) + q;
    localStorage.setItem("count", newCount);
    document.getElementById("cart").innerHTML = "Cart (" + localStorage.getItem("count") + ")"; 
    var message = type + " has been added to cart!";
    if(items[glazeIndex] !== undefined && items[glazeIndex] !== null){
        items[glazeIndex] += q;
    } else {
        items[glazeIndex] = q;
    }
    localStorage.setItem("items", JSON.stringify(items));
    alert(message);
}

// when the user selects the quantity for their item
function chooseQuantity (e) {
    quantity = e.options[e.selectedIndex].text;
}

// when the user changes the glaze for the roll
function changeGlaze (e, index) {
    e.style.backgroundColor = "#533112";
    e.style.color= "white";
    if(glazeIndex !== index){
        var prevGlaze = document.getElementsByClassName("glaze")[glazeIndex];
        prevGlaze.style.backgroundColor="white";
        prevGlaze.style.color="#533112";
        glazeIndex = index;
        var img = document.getElementById("rollImg");
        img.src = images[index];
    }
}

// function to delete items from shopping cart
function deleteItem(index){
    var items;
    if(localStorage.getItem("items")){
        items= JSON.parse(localStorage.getItem("items"));
    } else {
        items = new Array(4);
    }
    var count = localStorage.getItem("count") || "0";
    var previousQuantity = items[index];
    count -= previousQuantity;
    items[index] = 0;
    localStorage.setItem("count", count);
    localStorage.setItem("items", JSON.stringify(items));
    loading();
    displayCart(count, items);
}