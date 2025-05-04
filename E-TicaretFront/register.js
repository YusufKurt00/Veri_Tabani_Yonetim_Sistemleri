document.addEventListener("DOMContentLoaded", function() {
    // Formu seç
    const registerForm = document.getElementById('register-form');

    // Form gönderildiğinde çalışacak fonksiyon
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();  // Sayfanın yeniden yüklenmesini engelle

        // Form verilerini al
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirm-password').value;

        // Şifrelerin eşleşip eşleşmediğini kontrol et
        if (password !== confirmPassword) {
            alert('Şifreler uyuşmuyor!');
            return;
        }

        // Backend'e JSON formatında POST isteği gönder
        fetch('http://localhost:8080/customer/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // JSON formatında veri göndereceğiz
            },
            body: JSON.stringify({ name, email, password, passwordConfirm: confirmPassword })  // JSON verisini body kısmında gönderiyoruz
        })
        .then(response => response.text())  // Backend'den gelen yanıtı metin olarak al
        .then(data => {
            if (data === "Registration successful!") {
                alert('Kayıt başarılı! Giriş yapabilirsiniz.');
                // Kayıt başarılıysa kullanıcıyı anasayfaya yönlendir
                window.location.href = 'index.html';  // Anasayfaya yönlendirme
            } else {
                alert('Kayıt başarısız! ' + data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Bir hata oluştu.');
        });
    });
});
