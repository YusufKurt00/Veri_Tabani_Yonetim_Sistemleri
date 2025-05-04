// Sayfa yenilenmeden form geçişi yapmak için kullanılan fonksiyon
function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const formTitle = document.getElementById('form-title');

    // Eğer "login" seçildiyse giriş formunu göster, diğerini gizle
    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        formTitle.innerText = 'Giriş Yap';
    }
    // Eğer "register" seçildiyse kayıt formunu göster, diğerini gizle
    else if (formType === 'register') {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        formTitle.innerText = 'Kayıt Ol';
    }
}

// Başlangıçta giriş formunun görünmesini sağlıyoruz
window.onload = function () {
    toggleForm('login');
};

// Kullanıcı kayıt işlemi
function register() {
    const username = document.getElementById("username").value;  // Kullanıcı adı
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    const userData = { username, password };  // Kullanıcı adı ve şifre

    fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kayıt başarısız!");
            }
            return response.json();
        })
        .then(data => {
            alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.");
            toggleForm("login"); // Kayıttan sonra giriş formuna geçiş
        })
        .catch(error => {
            console.error("Hata:", error);
            alert("Kayıt başarısız! Lütfen tekrar deneyin.");
        });
}

// Kullanıcı giriş işlemi (Request Body kullanarak)
function login() {
    const username = document.getElementById("login-username").value;  // Kullanıcı adı
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
        alert("Lütfen kullanıcı adı ve şifre girin!");
        return;
    }

    // Login için kullanıcı adı ve şifreyi JSON formatında body'ye ekliyoruz
    const loginData = { username, password };

    fetch("http://localhost:8080/authenticate", {
        method: "POST", // POST kullanıyoruz
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData) // JSON formatında gönderim
    })
        .then(response => response.json()) // Yanıtı JSON'a çeviriyoruz
        .then(data => {
            console.log(data); // Yanıtı burada kontrol edebilirsiniz
            if (data && data.accessToken && data.refreshToken) {  // Backend'den gelen token'ları kontrol ediyoruz
                alert("Giriş başarılı!");
                localStorage.setItem("accessToken", data.accessToken);  // Access token'ı kaydediyoruz
                localStorage.setItem("refreshToken", data.refreshToken);  // Refresh token'ı kaydediyoruz
                window.location.href = "dashboard.html"; // Başarıyla giriş yaptıysa yönlendir
            } else {
                alert("Giriş başarısız! Yanıt: " + JSON.stringify(data)); // Yanıtı burada kontrol edin
                throw new Error("Giriş başarısız!");
            }
        })
        .catch(error => {
            console.error("Hata:", error);
            alert("Giriş başarısız! Lütfen tekrar deneyin.");
        });
}
