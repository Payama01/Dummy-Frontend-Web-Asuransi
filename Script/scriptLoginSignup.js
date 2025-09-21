document.addEventListener("DOMContentLoaded", function() {
    // Cek apakah berada di halaman sign up
    if (document.querySelector('input[placeholder="Konfirmasi Password"]')) {
        const signUpButton = document.querySelector(".btn");
        signUpButton.addEventListener("click", handleSignUp);
    }

    // Cek apakah berada di halaman login
    if (document.querySelector('a[href="indexsignup.html"]')) {
        const loginButton = document.querySelector(".btn");
        loginButton.addEventListener("click", handleLogin);
    }
});

function handleSignUp() {
    // Mengambil nilai dari setiap input field
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Konfirmasi Password"]').value;
    const fullName = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;

    //Validasi semua field harus diisi
    if (!email || !password || !confirmPassword || !fullName || !phone) {
        alert("Kesalahan: Semua kolom wajib diisi.");
        return;
    }

    //Validasi format email menggunakan Regular Expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Kesalahan: Format email tidak valid.");
        return;
    }

    //Validasi panjang kata sandi minimal 8 karakter
    if (password.length < 8) {
        alert("Kesalahan: Kata sandi minimal harus 8 karakter.");
        return;
    }

    //Validasi kata sandi dan konfirmasi harus sesuai
    if (password !== confirmPassword) {
        alert("Kesalahan: Kata sandi dan konfirmasi kata sandi tidak cocok.");
        return;
    }

    //Validasi nama lengkap
    const nameRegex = /^[a-zA-Z\s]+$/; // Hanya huruf dan spasi
    if (fullName.length < 3 || fullName.length > 32) {
        alert("Kesalahan: Nama lengkap harus antara 3 hingga 32 karakter.");
        return;
    }
    if (!nameRegex.test(fullName)) {
        alert("Kesalahan: Nama lengkap tidak boleh mengandung angka atau simbol.");
        return;
    }
    
    //Validasi nomor handphone
    const phoneRegex = /^08[0-9]{8,14}$/; // Diawali 08, diikuti 8-14 digit angka
    if (!phoneRegex.test(phone) || phone.length < 10 || phone.length > 16) {
        alert("Kesalahan: Format nomor handphone tidak valid. (Contoh: 081234567890)");
        return;
    }

    // Jika semua validasi berhasil, lanjutkan proses
    const newUser = {
        email: email,
        password: password,
        fullName: fullName,
        phone: phone
    };

    localStorage.setItem(email, JSON.stringify(newUser));

    alert("Sign up berhasil! Anda akan diarahkan ke halaman login.");
    window.location.href = "indexlogin.html";
}

function handleLogin() {
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (!email || !password) {
        alert("Harap masukkan email dan password.");
        return;
    }

    const userData = localStorage.getItem(email);

    if (userData) {
        const user = JSON.parse(userData);
        if (user.password === password) {
            alert("Login berhasil!");
            localStorage.setItem('activeUser', email);
            
            const redirectUrl = localStorage.getItem('redirectUrl');
            if (redirectUrl) {
                localStorage.removeItem('redirectUrl');
                window.location.href = redirectUrl;
            } else {
                window.location.href = "/Index/indexHome.html";
            }
        } else {
            alert("Password yang Anda masukkan salah.");
        }
    } else {
        alert("Email tidak ditemukan. Silakan sign up terlebih dahulu.");
    }
}