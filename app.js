const buttons = document.querySelectorAll("button");
let btn;
const cartItems = document.querySelector(".cart-items");
const total = document.querySelector(".total");
let allTotal = 0;

for (let i = 0; i < buttons.length; i++) {
  btn = buttons[i];

  btn.addEventListener("click", (e) => addToCart(e));
}

function addToCart(e) {
  e.preventDefault();
  const descEl = e.target.parentElement.previousElementSibling;
  const name = descEl.childNodes[1].childNodes[1].innerText;
  const price = descEl.childNodes[1].childNodes[1].nextElementSibling.innerText;
  const quantity = e.target.previousElementSibling.value;

  priceNumber = parseFloat(price.substring(1));
  quantityNumber = parseInt(quantity);

  if (quantityNumber > 0) {
    let totalAmount = priceNumber * quantityNumber;

    e.target.innerText = "Added";
    e.target.style.backgroundColor = "#eee";
    e.target.setAttribute("disabled", true);

    cartItems.innerHTML += `<li><span>${name}</span><span>${price} </span>x<span> ${quantity} </span> =<span> $${totalAmount.toFixed(
      2
    )}</span><button class="delete">  <i class="fa-solid fa-trash-can"></i></button></li>`;

    const deleteButtons = cartItems.querySelectorAll(".delete");

    for (let n = 0; n < deleteButtons.length; n++) {
      let deleteBtn = deleteButtons[n];
      deleteBtn.addEventListener("click", (e) => {
        removeProduct(e);
      });
    }

    allTotal += totalAmount;
    total.innerHTML = `Total: $${allTotal.toFixed(2)}`;
    total.classList.remove("hide");
  } else {
    alert("Please enter at least one product to your cart.");
  }
}

function removeProduct(e) {
  e.preventDefault();

  const liElement = e.target.closest("li");
  const decrAmount = e.target.previousElementSibling.innerText;
  const decrAmountNum = parseFloat(decrAmount.substring(2));
  allTotal -= decrAmountNum.toFixed(2);

  const name = liElement.childNodes[0].innerText;

  const products = document.querySelectorAll(".item");

  products.forEach((product) => {
    const item = product.querySelector(".description h3").innerText;

    if (item === name) {
      product.querySelector(".actions input").value = 0;
      product.querySelector(".actions button").removeAttribute("disabled");
      product.querySelector(".actions button").innerText = "Add";
      product.querySelector(".actions button").style.backgroundColor = "yellow";
    } else {
      console.log("error");
    }
  });

  e.target.closest("li").remove();

  total.innerHTML = `<h3>Total:<span> $${allTotal.toFixed(2)}</span></h3>`;
}
