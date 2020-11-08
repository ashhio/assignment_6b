//an array containing product data
var productArray = [];
//contains total number of products
var totalProducts = 0;
//gets form data from product detail page
const form = document.getElementById('form');

//creates Product object with quantity & glaze information
class Product{
    constructor(type, quantity, glaze) {
        this.type = type;
        this.quantity = quantity;
        this.glaze = glaze; 
    }
}

//called when add to cart button is pressed
function addToCart()
{
    //gets the quantity of items selected from the form
    var type = document.getElementsByName("type")[0].getAttribute("content"); 
    var quantity = form.elements.namedItem("quantity").value;
    var glaze = form.elements.namedItem("glaze").value;

    //adds the quantity selected to the total number of items in the cart
    totalProducts = Number(quantity) + Number(totalProducts);
    //updates the number of items in the cart in the navbar
    document.getElementById("cart-number").innerHTML = totalProducts;  
    
    //creates a new product object and adds it to an array of products
    var roll = new Product(type, quantity, glaze);
    if(productArray)
        productArray.push(roll);
    else{
        productArray = [];
        productArray.push(roll);
    }
}

//stores cart information in local storage
function sendToCart(){
    //Referenced from Steven Moore's help session
    localStorage.setItem("order", JSON.stringify(productArray));
    localStorage.setItem("number", JSON.stringify(totalProducts));
    
}

//called on every page to get the number of items in cart and display it in the navbar
function getCartNumber(){
    var storedNumber = localStorage.getItem("number");
    totalProducts = JSON.parse(storedNumber);
    if(totalProducts)
      document.getElementById("cart-number").innerHTML = totalProducts;  
    else
     document.getElementById("cart-number").innerHTML = 0;  
}

//pulls cart info from local storage and loads it into variables
function getCart(){
    var storedProductArray = localStorage.getItem("order");
    var productArrayNew = JSON.parse(storedProductArray);
    productArray = productArrayNew;  
}

//removes items from cart by removing it from productArray and removing the HTML that displays the item on the page
function removeItemFromCart(elem){
    //gets the quantity of the product to be removed
    var string = elem.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    var quantityString = string.match(/\d+/g);
    var quantity = parseInt(quantityString);

    //subtracts the number of items in the cart by the quantity of the item to be removed and updates the HTML
    totalProducts = totalProducts - quantity;
    document.getElementById("cart-number").innerHTML = totalProducts;  
    
    //calculates the index of the item to be removed in the product array based on position of the HTML node
    var index = Array.from(elem.parentNode.parentNode.parentNode.children).indexOf(elem.parentNode.parentNode)-1;
    //removes the item to be removed from the product array
    productArray.splice(index, 1);

    //removes the item to be removed from the HTML
    elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);    
}

//generates HTML to display items in cart
function showCart(){
    if(productArray && productArray.length > 0){
        document.getElementById("cart-empty").style.display = 'none';

        var cart = document.querySelector(".cart-item-list");
        var newCartItem; 

        for(var x = 0; x < productArray.length; x++) {
            //creates new HTML nodes for each cart item based on existing HTML
            newCartItem = document.querySelector(".cart-item").cloneNode(true);
            newCartItem.style.display = 'flex'; 
            
            //changes HTML node contents to reflect the product in the cart
            newCartItem.querySelector('.cart-item-type').innerHTML = productArray[x].type;
            newCartItem.querySelector('.cart-item-quantity').innerHTML = "Quantity: " + productArray[x].quantity;
            newCartItem.querySelector('.cart-item-glaze').innerHTML = "Glaze: " + productArray[x].glaze;
            
            //adds the new node to the HTML document in the correct location
            cart.appendChild(newCartItem);
        }
    }
}


