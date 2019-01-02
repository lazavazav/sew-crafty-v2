 $(".add-to-cart").click(function(event) {
  event.preventDefault();
  var name = $(this).attr("data-name");
  var price = Number($(this).attr("data-price"));
  addItemToCart(name, price, 1);
  displayCart();
    });

function displayCart() {
  var cartArray = listCart();
  var output = "";
  for (var i in cartArray) {
    output += "<li>"+cartArray[i].name
      +" "+cartArray[i].count
      +" x "+cartArray[i].price
      +" = "+cartArray[i].total
      +" <button class='delete-item' data-name='"+cartArray[i].name+"'>delete</button>"
      +"</li>";
  }
    $("#show-cart").html(output);
    $("#total-cart").html(totalCart());
  }


$("#show-cart").on("click", ".delete-item", function(event) {
   var name = $(this).attr("data-name");
  removeItemFromCart(name);
  displayCart();
});
                       
                       
var cart = [];
var Item = function(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
}

function addItemToCart (name, price, count) {
for (var i in cart) {
    if(cart[i].name === name) {
       cart[i].count += count;
      return;
       }
   }
      var item = new Item(name, price, count);
      cart.push(item);
     
 }

function removeItemFromCart(name) {
  for (var i in cart) {
    if(cart[i].name === name) {
      cart[i].count --;
      if(cart[i].count === 0) {
        cart.splice(i, 1);
      }
      break;
    }
  } 
}


function countCart () {
  var totalCount = 0;
  for (var i in cart) {
    totalCount += cart[i].count;
  }
  return totalCount;
}

function totalCart() {
  var totalCost = 0;
  for (var i in cart) {
    totalCost += cart[i].price * cart[i].count;
  }
  return totalCost;
}


function listCart() {
  var cartCopy = [];
  for (var i in cart) {
    var item = cart[i];
    var itemCopy = {};
    for (var p in item) {
    itemCopy[p] = item[p]; }
    itemCopy.total = item.price * item.count;
    cartCopy.push(itemCopy);
    }
  return cartCopy;
}

function saveCart () {
  localStorage.setItem("shopping cart", JSON.stringify(cart));
}



function loadCart () {
  cart = JSON.parse(localStorage.getItem("shopping cart"));
}