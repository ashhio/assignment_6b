//referenced from JS help session run by Steven Moore

//an array containing product data
var productArray = [];
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

    //console.log(type + ' ' + quantity + ' ' + glaze + ' ');

    //adds the quantity selected to the total number of items in the cart
    totalProducts = Number(quantity) + Number(totalProducts);
    //updates the number of items in the cart in the navbar
    document.getElementById("cart-number").innerHTML = totalProducts;  
    
    var roll = new Product(type, quantity, glaze);
    if(productArray)
        productArray.push(roll);
    else{
        productArray = [];
        productArray.push(roll);
    }
    
}


function sendToCart()
{
    //Referenced from Steven Moore's help session
    localStorage.setItem("order", JSON.stringify(productArray));
    localStorage.setItem("number", JSON.stringify(totalProducts));
    
}

function getCartNumber(){
    var storedNumber = localStorage.getItem("number");
    totalProducts = JSON.parse(storedNumber);
    if(totalProducts)
      document.getElementById("cart-number").innerHTML = totalProducts;  
    else
     document.getElementById("cart-number").innerHTML = 0;  
}

function getCart(){
   //localStorage.clear();
    var storedProductArray = localStorage.getItem("order");
    var productArrayNew = JSON.parse(storedProductArray);
    productArray = productArrayNew;

   
}

function removeItemFromCart(elem){
    var string = elem.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    var quantityString = string.match(/\d+/g);
    var quantity = parseInt(quantityString);
    totalProducts = totalProducts - quantity;
   document.getElementById("cart-number").innerHTML = totalProducts;  

    var index = Array.from(elem.parentNode.parentNode.parentNode.children).indexOf(elem.parentNode.parentNode)-1; //oh no lol
  
    productArray.splice(index, 1);
    elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
  //  location.reload();
    
    
}

function showCart(){
    if(productArray && productArray.length > 0) 
    {
        document.getElementById("cart-empty").style.display = 'none';
        //var elementArray = [];

        var cart = document.querySelector(".cart-item-list");
        var newCartItem; 

        for(var x = 0; x < productArray.length; x++)
            {
            //elementArray.push(document.querySelector(".cart-item").cloneNode(true));
            // document.querySelector(".cart-item").cloneNode(true);
            newCartItem = document.querySelector(".cart-item").cloneNode(true);
            newCartItem.style.display = 'flex'; 
            
            newCartItem.querySelector('.cart-item-type').innerHTML = productArray[x].type;
            newCartItem.querySelector('.cart-item-quantity').innerHTML = "Quantity: " + productArray[x].quantity;
            newCartItem.querySelector('.cart-item-glaze').innerHTML = "Glaze: " + productArray[x].glaze;

            cart.appendChild(newCartItem);
            }

        /*console.log(elementArray[0]);
        document.getElementById("cart-empty").innerHTML = elementArray[0];*/
    }
}


