const products = [
  {
    id: 1,
    name: "Camiseta Chica",
    price: 19.99,
    image: "img/camisetaChica1.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Camiseta Chica",
    price: 19.99,
    image: "img/camisetaChica2.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Camiseta Chica",
    price: 19.99,
    image: "img/camisetaChica3.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Camiseta Chica",
    price: 19.99,
    image: "img/camisetaChica4.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Camiseta Chico",
    price: 19.99,
    image: "img/camisetaChico1.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Camiseta Chico",
    price: 19.99,
    image: "img/camisetaChico2.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Camiseta Chico",
    price: 19.99,
    image: "img/camisetaChico3.jpeg",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Pantalón",
    price: 39.99,
    image: "img/pantalon.jpeg",
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: 9,
    name: "Pantalón",
    price: 29.99,
    image: "img/pantalonPirata.jpeg",
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: 10,
    name: "Vestido",
    price: 59.99,
    image: "img/vestido1.jpeg",
    sizes: ["38", "39", "40", "41", "42"],
  },
  {
    id: 11,
    name: "Vestido",
    price: 49.99,
    image: "img/vestido2.jpeg",
    sizes: ["38", "39", "40", "41", "42"],
  },
  {
    id: 12,
    name: "Vestido",
    price: 39.99,
    image: "img/vestido3.jpeg",
    sizes: ["38", "39", "40", "41", "42"],
  },
];

let productContainer = document.getElementById("products");
let productCart = [];
let divCart = document.getElementById("cart");
let btnCart = document.getElementById("toggle-cart");
let itemsCart = document.getElementById("cart-items");
let totalCart = document.getElementById("cart-total");
let countCart = document.getElementById("count-cart");

function renderizarProductos() {
  productContainer.innerHTML = products
    .map(
      (producto) =>
        `<div class="product-card">
        <img src="${producto.image}" alt="${producto.name}"/>
        <h3>${producto.name}</h3>
        <p>Precio: ${producto.price} €</p>
        <select id="size-${producto.id}">
          ${producto.sizes
            .map((size) => `<option value="${size}">${size}</option>`)
            .join("")}
        </select>
        <button onclick="addCarrito(${producto.id})">Añadir al carrito</button>
    </div>`
    )
    .join(" ");
}

function addCarrito(productoId) {
  let producto = products.find((producto) => producto.id === productoId);
  let talla = document.getElementById(`size-${producto.id}`).value;

  productCart.push({ ...producto, talla });
  updateCarrito();
}

function updateCarrito() {
  let total = productCart.reduce((suma, item) => suma + item.price, 0);

  if (total === 0) {
    total = "0.00";
  }

  itemsCart.innerHTML = productCart
    .map(
      (item, index) =>
        `<div class="cart-item">
          <ul>
            <li>${item.name} ${item.talla} <span>${item.price} €</span></li>
          </ul>
          <button onclick="deleteItem(${index})">🗑</button>
        </div>`
    )
    .join("");

  totalCart.innerHTML = "Total: " + total + " €";
  countCart.innerHTML = productCart.length;
  saveStorageCart();
}

function deleteItem(index) {
  productCart.splice(index, 1);
  updateCarrito();
}

function saveStorageCart() {
  localStorage.setItem("cart", JSON.stringify(productCart));
}

function loadStorageCart() {
  let productloadStorageCart = localStorage.getItem("cart");

  if (productloadStorageCart) {
    productCart = JSON.parse(productloadStorageCart);
    updateCarrito();
  }
}

btnCart.addEventListener("click", () => {
  divCart.classList.toggle("open");
});

renderizarProductos();
loadStorageCart();
