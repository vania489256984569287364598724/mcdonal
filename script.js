const products = [
    {
        id: 1,
        name: "Біг Мак Комбо",
        description: "Біг Мак, картопля фрі та напій",
        price: 189,
        category: "burger",
        image: "🍔"
    },
    {
        id: 2,
        name: "Біг Мак",
        description: "Класичний бургер з фірмовим соусом",
        price: 119,
        category: "burger",
        image: "🍔"
    },
    {
        id: 3,
        name: "Чізбургер",
        description: "Соковита котлета, сир та соус",
        price: 69,
        category: "burger",
        image: "🍔"
    },
    {
        id: 4,
        name: "Дабл Чізбургер",
        description: "Подвійна порція м'яса та сиру",
        price: 99,
        category: "burger",
        image: "🍔"
    },
    {
        id: 5,
        name: "Гамбургер",
        description: "Класичний гамбургер",
        price: 55,
        category: "burger",
        image: "🍔"
    },
    {
        id: 6,
        name: "МакКріспі",
        description: "Хрустка курочка та свіжі овочі",
        price: 139,
        category: "chicken",
        image: "🍗"
    },
    {
        id: 7,
        name: "Нагетси 6 шт.",
        description: "Хрусткі курячі нагетси",
        price: 89,
        category: "chicken",
        image: "🍗"
    },
    {
        id: 8,
        name: "Нагетси 9 шт.",
        description: "Ще більше хрусткої курочки",
        price: 119,
        category: "chicken",
        image: "🍗"
    },
    {
        id: 9,
        name: "Картопля фрі",
        description: "Золота та хрустка картопля",
        price: 69,
        category: "fries",
        image: "🍟"
    },
    {
        id: 10,
        name: "Велика картопля",
        description: "Велика порція картоплі фрі",
        price: 89,
        category: "fries",
        image: "🍟"
    },
    {
        id: 11,
        name: "Кока-Кола",
        description: "Освіжаючий газований напій",
        price: 49,
        category: "drink",
        image: "🥤"
    },
    {
        id: 12,
        name: "Фанта",
        description: "Апельсиновий газований напій",
        price: 49,
        category: "drink",
        image: "🥤"
    },
    {
        id: 13,
        name: "Спрайт",
        description: "Освіжаючий лимонний напій",
        price: 49,
        category: "drink",
        image: "🥤"
    },
    {
        id: 14,
        name: "Мілкшейк",
        description: "Ніжний молочний коктейль",
        price: 79,
        category: "drink",
        image: "🥛"
    },
    {
        id: 15,
        name: "МакФлурі",
        description: "Ніжне морозиво з топінгом",
        price: 89,
        category: "dessert",
        image: "🍦"
    },
    {
        id: 16,
        name: "МакПиріг",
        description: "Теплий пиріжок з начинкою",
        price: 59,
        category: "dessert",
        image: "🥧"
    }
];

let cart = [];
let currentCategory = "all";

const productsContainer = document.getElementById("products");

function renderProducts(list = products) {

    productsContainer.innerHTML = "";

    if (list.length === 0) {
        productsContainer.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:60px">
                <h2>😔 Нічого не знайдено</h2>
                <p style="color:#888;margin-top:10px">
                    Спробуйте іншу назву товару
                </p>
            </div>
        `;

        return;
    }

    list.forEach(product => {

        productsContainer.innerHTML += `
            <div class="product">

                <div class="product-image">
                    ${product.image}
                </div>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <div class="price">
                        ${product.price} ₴
                    </div>

                    <button
                        class="add-btn"
                        onclick="addProduct(${product.id})">
                        +
                    </button>

                </div>

            </div>
        `;
    });
}

function addProduct(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    // маленька анімація кнопки кошика
    const cartButton = document.querySelector(".cart-btn");

    cartButton.style.transform = "scale(1.1)";

    setTimeout(() => {
        cartButton.style.transform = "";
    }, 180);
}

function removeProduct(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();
}

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeProduct(id);
        return;
    }

    updateCart();
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");
    const emptyCart = document.getElementById("emptyCart");

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div class="cart-item-img">
                    ${item.image}
                </div>

                <div class="cart-info">

                    <h4>${item.name}</h4>

                    <span>
                        ${item.price * item.quantity} ₴
                    </span>

                    <div class="quantity">

                        <button onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <b>${item.quantity}</b>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove"
                    onclick="removeProduct(${item.id})">
                    ✕
                </button>

            </div>
        `;
    });

    document.getElementById("total").textContent = total;
    document.getElementById("cartCount").textContent = count;

    if (cart.length === 0) {
        emptyCart.style.display = "block";
    } else {
        emptyCart.style.display = "none";
    }
}

function openCart() {

    document.getElementById("cart").classList.add("open");

    document
        .getElementById("cartOverlay")
        .classList.add("show");
}

function closeCart() {

    document.getElementById("cart").classList.remove("open");

    document
        .getElementById("cartOverlay")
        .classList.remove("show");
}

function filterProducts(category, button) {

    currentCategory = category;

    document.querySelectorAll(".category")
        .forEach(btn => btn.classList.remove("active"));

    button.classList.add("active");

    const searchValue =
        document.getElementById("search").value.toLowerCase();

    let result = products;

    if (category !== "all") {
        result = result.filter(
            product => product.category === category
        );
    }

    if (searchValue) {
        result = result.filter(product =>
            product.name.toLowerCase().includes(searchValue)
        );
    }

    renderProducts(result);
}

function searchProducts() {

    const value =
        document.getElementById("search").value.toLowerCase();

    let result = products;

    if (currentCategory !== "all") {
        result = result.filter(
            product => product.category === currentCategory
        );
    }

    if (value) {
        result = result.filter(product =>
            product.name.toLowerCase().includes(value)
        );
    }

    renderProducts(result);
}

function makeOrder() {

    if (cart.length === 0) {
        alert("🛒 Спочатку додайте товари до кошика!");
        return;
    }

    alert(
        "🎉 Замовлення оформлено!\n\n" +
        "Дякуємо за замовлення ❤️"
    );

    cart = [];

    updateCart();
    closeCart();
}

// Показуємо товари при завантаженні
renderProducts();
updateCart();
