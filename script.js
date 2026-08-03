/* ==========================================================================
   20 FOOD ITEMS DATABASE - UPDATED PATHS FOR ROOT DIRECTORY
   ========================================================================== */
const foodItems = [
    { id: 1, name: "Crispy Zinger Burger", category: "junk", price: 850, desc: "Crispy chicken fillet with fresh lettuce & mayonnaise", img: "food-01.jpg", popular: true },
    { id: 2, name: "Cheesy Pepperoni Pizza", category: "junk", price: 1450, desc: "Mozzarella overload with fresh tomato sauce & herbs", img: "food-02.jpg", popular: false },
    { id: 3, name: "Penne Arrabbiata Pasta", category: "junk", price: 950, desc: "Spicy tomato sauce pasta topped with fresh basil", img: "food-03.jpg", popular: true },
    { id: 4, name: "Traditional Handi Karahi", category: "junk", price: 1800, desc: "Rich gravy chicken cooked in traditional spices", img: "food-04.jpg", popular: false },
    { id: 5, name: "Steamed Chicken Dumplings", category: "junk", price: 750, desc: "Freshly steamed momos with spicy chili dipping sauce", img: "food-05.jpg", popular: false },
    { id: 6, name: "Grilled Cheese Patty Sandwich", category: "junk", price: 650, desc: "Toasted bread with melted cheddar & fried patty", img: "food-06.jpg", popular: true },
    { id: 7, name: "Charcoal Roasted Chicken", category: "junk", price: 1600, desc: "Whole roasted chicken served with lemons & herbs", img: "food-07.jpg", popular: false },
    { id: 8, name: "Club Sandwich Combo", category: "junk", price: 700, desc: "Triple layer sandwich loaded with chicken & veggies", img: "food-08.jpg", popular: true },
    { id: 9, name: "Toasted Garlic Club Toast", category: "junk", price: 550, desc: "Multi-layered toasted bread with veggies & cheese", img: "food-09.jpg", popular: false },
    { id: 10, name: "BBQ Grilled Chicken Skewers", category: "junk", price: 1200, desc: "Smoky tender chicken cubes baked in tray", img: "food-10.jpg", popular: false },
    { id: 11, name: "Heart Shape Pepperoni Pizza", category: "junk", price: 1550, desc: "Special heart shaped crust pizza with dip", img: "food-11.jpg", popular: false },
    { id: 12, name: "Square Pan Thin Crust Pizza", category: "junk", price: 1650, desc: "Crispy square pan pizza loaded with sausages", img: "food-12.jpg", popular: false },
    { id: 13, name: "Smoky Beef Cheese Burger", category: "junk", price: 950, desc: "Double juicy beef patty with melted cheddar cheese", img: "food-13.jpg", popular: true },
    { id: 14, name: "Golden Potato Smileys", category: "junk", price: 400, desc: "Crispy fried smiley potato bites with tomato ketchup", img: "food-14.jpg", popular: false },
    { id: 15, name: "Loaded Chili Cheese Fries", category: "junk", price: 650, desc: "Fries topped with melted cheese, jalapenos & sauce", img: "food-15.jpg", popular: false },
    { id: 16, name: "Red Velvet Cream Cake", category: "sweets", price: 2800, desc: "Rich red velvet layers topped with strawberry slices", img: "food-16.jpg", popular: true },
    { id: 17, name: "Dark Fudge Chocolate Cake", category: "sweets", price: 2500, desc: "Moist dark chocolate sponge with cocoa cream", img: "food-17.jpg", popular: false },
    { id: 18, name: "Choco Lava Molten Cake", category: "sweets", price: 600, desc: "Hot oozing chocolate center cake served fresh", img: "food-18.jpg", popular: false },
    { id: 19, name: "Pistachio Milk Cake", category: "sweets", price: 2200, desc: "Soaked three milk sponge topped with pistachios", img: "food-19.jpg", popular: false },
    { id: 20, name: "Caramel Nut Delight Cake", category: "sweets", price: 2900, desc: "Rich caramel glaze topped with roasted almonds", img: "food-20.jpg", popular: true }
];

let cart = JSON.parse(localStorage.getItem("savoria_cart")) || [];
let isVoucherApplied = false;
let discountPercent = 0;
let isFreeDelivery = false;

document.addEventListener("DOMContentLoaded", () => {
    renderFoodGrid(foodItems);
    updateCartUI();
    initTheme();
    initHamburgerMenu();
    initScrollToTop();
    initModals();
    initCheckoutForm();
    initVoucher();
    initCheckoutButtonDirectScroll();
});

function renderFoodGrid(items) {
    const foodGrid = document.getElementById("food-grid");
    if (!foodGrid) return;
    foodGrid.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = "food-card";
        card.innerHTML = `
            <div class="food-img-wrapper">
                ${item.popular ? `<span class="popular-tag">🔥 Popular</span>` : ""}
                <img src="${item.img}" alt="${item.name}" loading="lazy">
            </div>
            <div class="food-info">
                <h3>${item.name}</h3>
                <p class="food-desc">${item.desc}</p>
                <div class="food-bottom">
                    <span class="price">Rs. ${item.price}</span>
                    <button class="add-cart-btn" onclick="addToCart(${item.id})" title="Add to Cart">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        foodGrid.appendChild(card);
    });
}

function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navLinks = document.getElementById("nav-links");

    hamburgerBtn?.addEventListener("click", () => {
        navLinks.classList.toggle("show-nav");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show-nav");
        });
    });
}

document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".category-card").forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const cat = card.getAttribute("data-category");
        if (cat === "all") {
            renderFoodGrid(foodItems);
        } else {
            renderFoodGrid(foodItems.filter(item => item.category === cat));
        }
    });
});

document.getElementById("search-input")?.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    renderFoodGrid(foodItems.filter(item => 
        item.name.toLowerCase().includes(term) || item.desc.toLowerCase().includes(term)
    ));
});

function addToCart(id) {
    const item = foodItems.find(f => f.id === id);
    const existing = cart.find(c => c.id === id);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    saveAndRefreshCart();
    openCartSidebar();
}

function updateQty(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(c => c.id !== id);
        }
    }
    saveAndRefreshCart();
}

function saveAndRefreshCart() {
    localStorage.setItem("savoria_cart", JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsWrapper = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("cart-subtotal");
    const finalTotalEl = document.getElementById("cart-final-total");
    const deliveryFeeEl = document.getElementById("delivery-fee");
    const discountRow = document.getElementById("discount-row");
    const discountEl = document.getElementById("cart-discount");

    const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
    if (cartCount) cartCount.innerText = totalQty;

    if (cartItemsWrapper) {
        cartItemsWrapper.innerHTML = "";
        if (cart.length === 0) {
            cartItemsWrapper.innerHTML = `<p style="text-align:center; margin-top:2rem; color:var(--text-secondary);">Your cart is empty!</p>`;
        } else {
            cart.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "cart-item";
                itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <span>Rs. ${item.price}</span>
                        <div class="qty-controls">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <strong>Rs. ${item.price * item.qty}</strong>
                `;
                cartItemsWrapper.appendChild(itemDiv);
            });
        }
    }

    const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
    let deliveryFee = isFreeDelivery || subtotal === 0 ? 0 : 150;
    let discountAmount = isVoucherApplied ? Math.round((subtotal * discountPercent) / 100) : 0;
    
    if (subtotalEl) subtotalEl.innerText = `Rs. ${subtotal}`;
    if (deliveryFeeEl) deliveryFeeEl.innerText = deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`;
    
    if (discountRow) {
        if (isVoucherApplied && discountAmount > 0) {
            discountRow.style.display = "flex";
            if (discountEl) discountEl.innerText = `- Rs. ${discountAmount}`;
        } else {
            discountRow.style.display = "none";
        }
    }

    const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);
    if (finalTotalEl) finalTotalEl.innerText = `Rs. ${finalTotal}`;
}

function initVoucher() {
    const applyBtn = document.getElementById("apply-voucher-btn");
    const voucherInput = document.getElementById("voucher-input");
    const voucherMsg = document.getElementById("voucher-message");

    applyBtn?.addEventListener("click", () => {
        const code = voucherInput.value.trim().toUpperCase();
        if (code === "FREEDOM14") {
            isVoucherApplied = true;
            discountPercent = 14;
            isFreeDelivery = true;
            voucherMsg.style.color = "#70e000";
            voucherMsg.innerText = "🎉 Promo Applied! 14% OFF + Free Delivery!";
            updateCartUI();
        } else {
            voucherMsg.style.color = "#d90429";
            voucherMsg.innerText = "Invalid Voucher Code!";
        }
    });
}

function initCheckoutButtonDirectScroll() {
    const checkoutBtn = document.getElementById("checkout-btn-cart");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");

    checkoutBtn?.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Add food items first.");
            return;
        }
        cartSidebar?.classList.remove("active");
        cartOverlay?.classList.remove("active");

        const contactSection = document.getElementById("contact");
        contactSection?.scrollIntoView({ behavior: "smooth" });
    });
}

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");

function openCartSidebar() {
    cartSidebar?.classList.add("active");
    cartOverlay?.classList.add("active");
}

document.getElementById("cart-btn")?.addEventListener("click", openCartSidebar);
document.getElementById("close-cart")?.addEventListener("click", () => {
    cartSidebar?.classList.remove("active");
    cartOverlay?.classList.remove("active");
});
cartOverlay?.addEventListener("click", () => {
    cartSidebar?.classList.remove("active");
    cartOverlay?.classList.remove("active");
});

function initModals() {
    const loginModal = document.getElementById("login-modal");
    document.getElementById("login-modal-btn")?.addEventListener("click", () => loginModal?.classList.add("active"));
    document.getElementById("close-login")?.addEventListener("click", () => loginModal?.classList.remove("active"));

    document.getElementById("login-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Logged in successfully!");
        loginModal?.classList.remove("active");
    });

    document.getElementById("go-to-tracker")?.addEventListener("click", () => {
        document.getElementById("order-confirm-modal")?.classList.remove("active");
        document.getElementById("track-order")?.scrollIntoView({ behavior: "smooth" });
        simulateLiveFoodpandaTracker();
    });
}

function initCheckoutForm() {
    const form = document.getElementById("checkout-form");
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before submitting your order.");
            return;
        }

        document.getElementById("order-confirm-modal")?.classList.add("active");
        cart = [];
        saveAndRefreshCart();
        form.reset();
    });
}

function simulateLiveFoodpandaTracker() {
    const step2 = document.getElementById("step-2");
    const step3 = document.getElementById("step-3");
    const step4 = document.getElementById("step-4");
    const badge = document.getElementById("current-status-badge");
    const timeEl = document.getElementById("estimated-time");

    badge.innerText = "Food Being Prepared";

    setTimeout(() => {
        step2.classList.remove("active");
        step2.classList.add("completed");
        step3.classList.add("active");
        badge.innerText = "Rider On The Way";
        if (timeEl) timeEl.innerText = "Estimated Delivery: 10 - 15 Mins";
    }, 6000);

    setTimeout(() => {
        step3.classList.remove("active");
        step3.classList.add("completed");
        step4.classList.add("completed", "active");
        badge.innerText = "Delivered!";
        badge.style.backgroundColor = "#70e000";
        if (timeEl) timeEl.innerText = "Order Delivered. Enjoy your meal!";
    }, 12000);
}

function initTheme() {
    const savedTheme = localStorage.getItem("savoria_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
}

document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("savoria_theme", newTheme);
});

function initScrollToTop() {
    const scrollTopBtn = document.getElementById("scroll-top-btn");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn?.classList.add("show");
        } else {
            scrollTopBtn?.classList.remove("show");
        }
    });

    scrollTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
