// // Show login form by default
// document.getElementById("authContainer").style.display = "block";
// document.getElementById("storeContainer").style.display = "none";

// Function to show the signup form and hide the login form
function showSignup() {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("signupBox").style.display = "flex";
}

// Function to show the login form and hide the signup form
function showLogin() {
    document.getElementById("signupBox").style.display = "none";
    document.getElementById("loginBox").style.display = "flex";
}

// Function to handle login
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    alert(`Logged in with Email: ${email}`);
    document.getElementById("authContainer").style.display = "none";
    document.getElementById("storeContainer").style.display = "block";
}

// Function to handle signup
function signup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const dob = document.getElementById("signupDOB").value;

    if (!name || !email || !password || !dob) {
        alert("Please fill in all fields.");
        return;
    }

    alert(`Account created for: ${name}\nEmail: ${email}\nDOB: ${dob}`);
    showLogin();
}

// Store-related JavaScript
let products = [];
fetch("products.json")
    .then((response) => response.json())
    .then((data) => (showProducts(data)));

const cart = {};
const addToCart = (id) => {
    if (!cart[id]) cart[id] = 1;
    showCart();
};

const increment = (id) => {
    cart[id] = cart[id] + 1;
    showCart();
};

const decrement = (id) => {
    cart[id] = cart[id] - 1;
    if (cart[id] === 0) delete cart[id];
    showCart();
};

const displayCart = () => {
    cartBox.style.display = "block";
    productBox.style.display = "none";
};

const hideCart = () => {
    cartBox.style.display = "none";
    productBox.style.display = "block";
};

const deleteCart = (id) => {
    delete cart[id];
    showCart();
};

const showTotal = () => {
    let total = products.reduce((sum, value) => {
        return sum + value.price * (cart[value.id] ?? 0);
    }, 0);
    order.innerHTML = total.toFixed(2);
};

const showCart = () => {
    let count = Object.keys(cart).length;
    items.innerHTML = count;
    showTotal();
    let str = "";
    products.map((value) => {
        if (cart[value.id]) {
            str += `<div>
            ${value.id}-${value.name}-${value.price}-
            <button onclick='decrement(${value.id})'>-</button>
            ${cart[value.id]}
            <button onclick='increment(${value.id})'>+</button>
            -${value.price * cart[value.id]}
            -<button onclick='deleteCart(${value.id})'>Delete</button>
            </div>`;
        }
    });
    divCart.innerHTML = str;
};

const showProducts = (data) => {
    products = data;
    let str = "<div class='row'>";
    products.map((value) => {
        str += `
        <div class='box'>
        <img src='${value.url}'>
        <h3>${value.name}</h3>
        <p>${value.desc}</p>
        <h4>$${value.price.toFixed(2)}</h4>
        <button onclick='addToCart(${value.id})' id="v">Add to Cart</button>
        </div>
        `;
    });
    divProducts.innerHTML = str + "</div>";
};

const me = () => {
    fetch('customer.json')
        .then(response => response.json())
        .then(customer => {
            alert(`Customer Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nAddress: ${customer.address}`);
        })
        .catch(error => {
            console.error('Error fetching customer details:', error);
            alert('Failed to load customer details. Please try again later.');
        });
};

const showMenu = () => {
    hideCart();
    fetch("products.json")
        .then((response) => response.json())
        .then((data) => (showProducts(data)));
};