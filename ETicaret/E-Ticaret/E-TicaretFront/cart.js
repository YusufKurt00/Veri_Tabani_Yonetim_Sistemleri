document.addEventListener("DOMContentLoaded", () => {
    displayCartItems();

    // Ödeme yap butonuna tıklanma olayını ekleyelim
    document.getElementById('checkout-button').addEventListener('click', () => {
        const userLoggedIn = localStorage.getItem("userLoggedIn");

        if (!userLoggedIn) {
            // Eğer kullanıcı giriş yapmadıysa, hesap oluşturma mesajı göster
            alert('Önce bir hesap oluşturun veya giriş yapın.');
            window.location.href = 'login.html'; // Giriş sayfasına yönlendir
        } else {
            // Kullanıcı giriş yaptıysa ödeme işlemi
            alert('Ödeme işlemi başarılı!');
            localStorage.removeItem('cart');  // Ödeme sonrası sepeti temizle
            window.location.href = 'index.html';
        }
    });
});

// Sepetteki ürünleri dinamik olarak görüntüle
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItemsList.innerHTML = ''; // Sepet listeyi temizle
    let totalPrice = 0;

    if (cartItems.length === 0) {
        cartItemsList.innerHTML = 'Sepetinizde ürün bulunmamaktadır.';
    } else {
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">₺${item.price}</p>
                </div>
                <button class="cart-item-remove" data-index="${index}">Sepetten Sil</button>
            `;
            cartItemsList.appendChild(itemElement);

            totalPrice += item.price;

            // Sepetten Silme Butonuna Tıklanma Olayı
            itemElement.querySelector('.cart-item-remove').addEventListener('click', (event) => {
                const itemIndex = event.target.getAttribute('data-index');
                removeFromCart(itemIndex);
            });
        });
    }

    totalPriceElement.textContent = `Toplam Fiyat: ₺${totalPrice.toFixed(2)}`;
}

// Sepetten bir ürünü sil
function removeFromCart(index) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1); // İlgili ürünü sil
    localStorage.setItem('cart', JSON.stringify(cartItems)); // Yeni sepeti kaydet

    displayCartItems(); // Sepet ürünlerini tekrar göster
}

// Sepete ürün ekleme işlemi
function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);  // Sepete ürünü ekle
    localStorage.setItem('cart', JSON.stringify(cartItems));  // Sepeti localStorage'a kaydet

    updateCartCount();  // Sepet sayısını güncelle
}

// Sepet sayısını güncelle
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cartItems.length;
}
