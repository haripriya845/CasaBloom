
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".addToCart");

  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".card");
      const name = card.querySelector(".card-title").innerText;
      const priceText = card.querySelector(".price").innerText;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
      const image = card.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const found = cart.find(item => item.name === name);

      if (found) {
        if (found.quantity < 5) {
          found.quantity++;
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
        <div class="row g-0 align-items-center">
          <div class="col-md-2 text-center">
            <img src="${item.image}" class="img-fluid rounded-start" width="80">
          </div>
          <div class="col-md-7">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Price: ₹${item.price} × ${item.quantity}</p>
              <div class="btn-group" role="group">
                <button class="btn btn-outline-secondary btn-sm minus">-</button>
                <button class="btn btn-outline-secondary btn-sm plus">+</button>
                <button class="btn btn-outline-danger btn-sm remove">Remove</button>
              </div>
            </div>
          </div>
        </div>
      `;
      cartBox.appendChild(box);

      box.querySelector(".plus").addEventListener("click", () => {
        if (item.quantity < 5) {
          item.quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        } else {
          alert("Max 5 allowed!");
        }
      });

      box.querySelector(".minus").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          cart = cart.filter(p => p.name !== item.name);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });

      box.querySelector(".remove").addEventListener("click", () => {
        cart = cart.filter(p => p.name !== item.name);
        localStorage.setItem("cart", JSON.stringify(cart));
        location.reload();
      });
    });

    const totalBox = document.createElement("div");
    totalBox.classList.add("text-end", "mt-4");
    totalBox.innerHTML = `<h3 class="text-primary">Total: ₹${total}</h3>`;
    cartBox.appendChild(totalBox);

    const checkoutBtn = document.createElement("div");
    checkoutBtn.classList.add("text-end", "mt-3");
    checkoutBtn.innerHTML = `<button class="btn btn-success btn-lg">Proceed to Checkout</button>`;
    cartBox.appendChild(checkoutBtn);
  }
});
