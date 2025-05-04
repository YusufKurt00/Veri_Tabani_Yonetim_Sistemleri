document.getElementById("forgot-password-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    try {
        const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json(); // Yanıtı JSON olarak al

        const messageEl = document.getElementById("message");

        if (response.ok) {
            messageEl.style.color = "green";
            messageEl.textContent = result.message || "Şifre sıfırlama bağlantısı email adresinize gönderildi.";
        } else {
            messageEl.style.color = "red";
            messageEl.textContent = result.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
        }

    } catch (error) {
        document.getElementById("message").textContent = "Sunucu hatası. Lütfen sonra tekrar deneyin.";
    }
});
