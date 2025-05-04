document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Sayfa yenilenmesini engelle

        // Form verilerini al
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // Backend'e POST isteği gönder
        fetch('http://localhost:8080/customer/login?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Form verisi göndermek için
            },
        })
        .then(response => response.text()) // Gelen yanıtı metin olarak al
        .then(data => {
            if (data === "Login successful!") {
                alert('Giriş başarılı!');
                localStorage.setItem("userLoggedIn", "true");
                // Giriş başarılıysa kullanıcıyı anasayfaya yönlendir
                window.location.href = 'index.html'; // Anasayfaya yönlendirme
            } else {
                alert('Giriş başarısız! ' + data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Bir hata oluştu.');
        });
    });
});
