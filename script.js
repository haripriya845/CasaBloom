document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Add to Cart buttons
  const addButtons = document.querySelectorAll(".addToCart");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {

      const card = button.closest(".card");
      const name = card.querySelector(".card-title").innerText;
      const price = parseFloat(card.querySelector(".price").innerText.replace(/[^\d.]/g, ""));
      const image = card.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let item = cart.find(p => p.name === name);

      if (item) {
        if (item.quantity < 5) {
          item.quantity++;
        } else {
          alert("Max 5 allowed!");
        }
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Item added!");
    });
  });

  // 2. Cart Page
  const cartBox = document.getElementById("cartContainer");
  if (cartBox) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartBox.innerHTML = "<p>Your cart is empty</p>";
      return;
    }

    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;

      const box = document.createElement("div");
      box.classList.add("card", "mb-3");

      box.innerHTML = `
        <div class="row align-items-center">
          <div class="col-md-2 text-center">
            <img src="${item.image}" width="80">
          </div>
          <div class="col-md-7">
            <h5>${item.name}</h5>
            <p>Price: ₹${item.price} × ${item.quantity}</p>
            <button class="minus">-</button>
            <button class="plus">+</button>
            <button class="remove">Remove</button>
          </div>
        </div>
      `;

      cartBox.appendChild(box);

      // Plus button
      box.querySelector(".plus").addEventListener("click", () => {
        if (item.quantity < 5) {
          item.quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        } else {
          alert("Max 5 allowed!");
        }
      });

      // Minus button
      box.querySelector(".minus").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart = cart.filter(p => p.name !== item.name);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });

      // Remove button
      box.querySelector(".remove").addEventListener("click", () => {
        cart = cart.filter(p => p.name !== item.name);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });

    // Show total
    const totalBox = document.createElement("div");
    totalBox.innerHTML = `<h3>Total: ₹${total}</h3>`;
    cartBox.appendChild(totalBox);

    // Checkout button
    const checkoutBtn = document.createElement("div");
    checkoutBtn.innerHTML = `<button>Proceed to Checkout</button>`;
    cartBox.appendChild(checkoutBtn);
  }
});
