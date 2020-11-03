var quantity = "1";
var glazeIndex = 0;
var images = ["assets/original.jpg", "assets/original1.jpg", "assets/original2.jpg", "assets/original3.jpg"]

// when the page starts loading
function loading () {
    var count = localStorage.getItem("count") || "0";
    document.getElementById("cart").innerHTML = "Cart (" + count + ")"; 
    if(document.getElementById("cartContents") !== null){
        document.getElementById("numOfItems").innerHTML = "The cart has " + count + " items.";
        if(count === "0"){
            document.getElementById("numOfItems").innerHTML += " Browse the shop to add items to cart.";
        }
    }
}

// when the user adds an item to cart
function addToCart (type) {
    var count = localStorage.getItem("count") || "0";
    var newCount = parseInt(count) + parseInt(quantity);
    localStorage.setItem("count", newCount);
    document.getElementById("cart").innerHTML = "Cart (" + localStorage.getItem("count") + ")"; 
    var message = type + " has been added to cart!";
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