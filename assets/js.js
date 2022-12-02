const hamburger = document.querySelector(".fa-bars");
const navMenu = document.querySelector(".navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// -----------carte--------
let carteIcon = document.querySelector("#carte-icon");
let carte = document.querySelector(".carte");
let products_container = document.querySelector(".products_container");
let closeCarte = document.querySelector("#close");

carteIcon.onclick = () => {
  carte.classList.toggle("active-carte");
};
closeCarte.onclick = () => {
  carte.classList.remove("active-carte");
};

//  ----- carte working js ------

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// ---------- filtre Menu -------

var filterBtns = document.getElementsByClassName("btn1");
var boxes = document.getElementsByClassName("box");

for (const filterBtn of filterBtns) {
   filterBtn.addEventListener("click", () => {
      var clickedBtn = filterBtn.innerText;
      for (const box of boxes) {
         if(clickedBtn === "ALL")
         {
            box.classList.remove("hide");
         }
         else if(box.className.includes(clickedBtn))
         {
            box.classList.remove("hide");
         }
         else{
            box.classList.add("hide");
         }
         
      }
   })
}

// ---------- End filtre ---------

// --- creation des functions ---

function ready() {
  // --- effacer les items de carte ---
  var removeCarteButtons = document.getElementsByClassName("remove-item");
  for (var i = 0; i < removeCarteButtons.length; i++) {
    var button = removeCarteButtons[i];
    button.addEventListener("click", removeCarteItem);
  }

  // quantité changes

  var qteInputs = document.getElementsByClassName("qte");
  for (var i = 0; i < removeCarteButtons.length; i++) {
    var input = qteInputs[i];
    // ----changement---
    input.addEventListener("change", updatetotal);
  }
}

// add to carte
var addCart = document.getElementsByClassName("add-cart");
for (var i = 0; i < addCart.length; i++) {
  var button = addCart[i];
  button.addEventListener("click", addCartClicked);
  updatetotal();
}

// remove items from carte
function removeCarteItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

// quantité changed

function qteChanged(event) {
  var input = event.target;
  updatetotal();
}

// add To cart

function addCartClicked(event) {
  var button = event.target;
  var shopMenu = button.parentElement;
  var title = shopMenu.getElementsByClassName("menu-title")[0].innerText;
  var prix = shopMenu.getElementsByClassName("price")[0].innerText;
  var menuImg = shopMenu.getElementsByClassName("menu-img")[0].src;
  addMenuToCarte(title, prix, menuImg);
}

// ------ ADD MENU TO CART ------

function addMenuToCarte(title, prix, menuImg) {
  var carteMenu = document.getElementsByClassName("carte-content")[0];
  var carteShopBox = document.createElement("div");
  var carteBoxCentent = `
         <img src="${menuImg}" alt="image product" class="carte-img">
            <div class="detail-item">
               <div class="name">${title}</div>
               <div class="price">${prix}</div>
               <input type="number" class="qte" value="1" min = "1">
            </div>
         <i class="fa fa-trash remove-item" aria-hidden="true" id="remove-item" ></i>
      `;
  carteShopBox.classList.add("carte-box");
  carteShopBox.innerHTML = carteBoxCentent;
  carteMenu.append(carteShopBox);
  carteShopBox
    .getElementsByClassName("remove-item")[0]
    .addEventListener("click", removeCarteItem);
  carteShopBox
    .getElementsByClassName("qte")[0]
    .addEventListener("change", qteChanged);
  updatetotal();
  alert("Vous avez ajouté le menu a votre panier");
}

// update total
function updatetotal() {
  var cartContent = document.getElementsByClassName("carte-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("carte-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var carteBox = cartBoxes[i];
    var prixElement = carteBox.getElementsByClassName("price")[0];
    var qteElement = carteBox.getElementsByClassName("qte")[0];
    var prix = parseFloat(prixElement.innerText.replace("$", ""));
    var qte = qteElement.value;
    total = total + prix * qte;
  }
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}

// function updateTotal2(prix, add = true){

//    let totalElement = document.getElementById('total')
//    let total = totalElement.textContent

//    prix = parseFloat(prix.replace("$" , ""))

//    total = Number.parseFloat(total)
//    total = (add) ? total + prix : total - prix;

//    totalElement.textContent = total
// }

var buyBtn = document.querySelector(".btn-buy");
buyBtn.addEventListener("click", (e) => {
   updatetotal();
   var totalPrice = document.querySelector(".total-price").innerText;
   confirm("le paiement effectué avec succès \n Total Facture : " + totalPrice);
   location.reload()
   // alert("l'achat succsees");
})
