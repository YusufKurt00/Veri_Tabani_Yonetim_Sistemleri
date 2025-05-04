document.addEventListener("DOMContentLoaded", () => {
    const userLoggedIn = localStorage.getItem("userLoggedIn");

    // Giriş yapmayan kullanıcılar için arama çubuğunu da aktif et
    if (!userLoggedIn) {
        document.getElementById('search-bar').style.display = 'block';  // Arama çubuğunu görünür yap
    } else {
        document.getElementById('logout-link').style.display = 'block';
    }

    // Sepet sayısını sayfa yüklendiğinde güncelle
    updateCartCount();

    fetchProducts(); // Sayfa açılır açılmaz ürünleri çek
});

// Sepet butonuna tıklanma olayını ekleyelim
document.getElementById('cart-button').addEventListener('click', () => {
    window.location.href = 'cart.html';  // Sepet sayfasına yönlendir
});

// Menü aç/kapat
const profileButton = document.querySelector('.profile-button');
const dropdownContent = document.querySelector('.dropdown-content');

profileButton.addEventListener('click', () => {
    dropdownContent.classList.toggle('show');
});

window.addEventListener('click', (event) => {
    if (!event.target.matches('.profile-button')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
});

// Çıkış yap
document.querySelector('#logout-link').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem("userLoggedIn");
    window.location.href = 'index.html';
});

// Arama yap
const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', () => {
    const query = document.querySelector('#search-input').value.trim();
    if (query === '') {
        fetchProducts();
    } else {
        fetch(`http://localhost:8080/product/search?prefix=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(products => displayProducts(products))
            .catch(error => {
                console.error('Arama yapılırken hata oluştu:', error);
                alert('Arama yapılırken hata oluştu.');
            });
    }
});

// Enter tuşuyla arama
const searchInput = document.querySelector('#search-input');
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchButton.click();
    }
});

// Ürünleri çek
function fetchProducts() {
    fetch('http://localhost:8080/product/list')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Ürünler alınırken hata oluştu:', error);
            alert('Ürünler alınırken hata oluştu.');
        });
}

// Ürünleri ekrana bas
function displayProducts(products) {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = 'Hiç ürün bulunamadı.';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Ürün resmini oluştur
        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = product.name;
        productImage.classList.add('product-image');

        // Ürün ismini oluştur
        const productName = document.createElement('h3');
        productName.classList.add('product-name');
        productName.textContent = product.name;

        // Ürün fiyatını oluştur
        const productPrice = document.createElement('span');
        productPrice.classList.add('price');
        productPrice.textContent = `₺${product.price}`;

        // Detay sayfasına yönlendirmek için kartı tıklanabilir hale getir
        productCard.addEventListener('click', () => {
            window.location.href = `/product/${product._id}`;  // Detay sayfasına yönlendir
        });

        // Sepete ekleme butonu
        const addToCartButton = document.createElement('button');
        addToCartButton.classList.add('add-to-cart-button');
        addToCartButton.textContent = 'Sepete Ekle';

        addToCartButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Sepet butonuna tıklanırken yönlendirmeyi engelle
            addToCart(product);
        });

        // Kartı birleştir
        productCard.appendChild(productImage);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
        productCard.appendChild(addToCartButton);

        productList.appendChild(productCard);
    });
}



// Sepete ürün ekle ve sepetteki ürünleri kaydet
function addToCart(product) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];  // Sepet verisini al
    cartItems.push(product);  // Ürünü sepete ekle
    localStorage.setItem('cart', JSON.stringify(cartItems));  // Sepeti localStorage'a kaydet

    // Sepet sayısını güncelle
    updateCartCount();
    console.log(`Sepete eklendi: ${product.name}`);
}

// Sepet sayısını güncelle
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];  // Sepet verisini al
    document.getElementById('cart-count').textContent = cartItems.length;  // Sepet sayısını güncelle
}
