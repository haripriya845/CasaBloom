// // script.js

// document.addEventListener("DOMContentLoaded", () => {
//   // Handle Add to Cart buttons on index.html
//   const buttons = document.querySelectorAll(".addToCart");

//   buttons.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const card = btn.closest(".card");
//       const title = card.querySelector(".card-title").innerText;
//       const price = card.querySelector(".price").innerText.replace("/-", "").trim();
//       const image = card.querySelector(".card-img-top").src;

//       const product = {
//         id: title,
//         title: title,
//         price: parseFloat(price),
//         image: image,
//         quantity: 1
//       };

//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
//       const existing = cart.find(p => p.id === product.id);

//       if (existing) {
//         if (existing.quantity < 5) {
//           existing.quantity++;
//         } else {
//           alert("Maximum quantity is 5");
//         }
//       } else {
//         cart.push(product);
//       }

//       localStorage.setItem("cart", JSON.stringify(cart));
//       alert("Added to cart!");
//     });
//   });

//   // Handle cart display on cart.html
//   if (window.location.pathname.includes("cart.html")) {
//     const container = document.getElementById("cartContainer");
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];

//     if (cart.length === 0) {
//       container.innerHTML = "<h3>Your cart is empty.</h3>";
//       return;
//     }

//     let total = 0;

//     cart.forEach((item) => {
//       total += item.price * item.quantity;

//       const itemDiv = document.createElement("div");
//       itemDiv.className = "row mb-3 align-items-center border p-3";

//       itemDiv.innerHTML = `
//         <div class="col-md-2">
//           <img src="${item.image}" class="img-fluid" />
//         </div>
//         <div class="col-md-4">
//           <h5>${item.title}</h5>
//           <p>₹${item.price.toFixed(2)}</p>
//         </div>
//         <div class="col-md-3">
//           <button class="btn btn-outline-secondary btn-sm decrease">-</button>
//           <span class="mx-2 quantity">${item.quantity}</span>
//           <button class="btn btn-outline-secondary btn-sm increase">+</button>
//         </div>
//         <div class="col-md-3">
//           <button class="btn btn-danger btn-sm remove">Remove</button>
//         </div>
//       `;

//       container.appendChild(itemDiv);

//       // Increase
//       itemDiv.querySelector(".increase").onclick = () => {
//         if (item.quantity < 5) {
//           item.quantity++;
//           localStorage.setItem("cart", JSON.stringify(cart));
//           location.reload();
//         } else {
//           alert("Maximum quantity is 5");
//         }
//       };

//       // Decrease
//       itemDiv.querySelector(".decrease").onclick = () => {
//         if (item.quantity > 1) {
//           item.quantity--;
//         } else {
//           cart = cart.filter(p => p.id !== item.id);
//         }
//         localStorage.setItem("cart", JSON.stringify(cart));
//         location.reload();
//       };

//       // Remove
//       itemDiv.querySelector(".remove").onclick = () => {
//         cart = cart.filter(p => p.id !== item.id);
//         localStorage.setItem("cart", JSON.stringify(cart));
//         location.reload();
//       };
//     });

//     // Show total price
//     const totalDiv = document.createElement("div");
//     totalDiv.className = "text-end mt-3";
//     totalDiv.innerHTML = `<h4>Total: ₹${total.toFixed(2)}</h4>`;
//     container.appendChild(totalDiv);
//   }
// });
