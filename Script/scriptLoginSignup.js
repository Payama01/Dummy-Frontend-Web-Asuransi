// Menunggu hingga seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener("DOMContentLoaded", function() {

    // Cek apakah kita berada di halaman sign up dengan mencari tombol sign up
    const signUpButton = document.querySelector(".btn");
    if (document.body.contains(document.querySelector('input[placeholder="Konfirmasi Password"]'))) {
        signUpButton.addEventListener("click", handleSignUp);
    }

    // Cek apakah kita berada di halaman login dengan mencari tombol login
    const loginButton = document.querySelector(".btn");
    if (document.body.contains(document.querySelector('a[href="indexsignup.html"]'))) {
        loginButton.addEventListener("click", handleLogin);
    }

});

/**
 * Fungsi untuk menangani proses sign up.
 */
function handleSignUp() {
    // Mengambil nilai dari setiap input field di halaman sign up
    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Konfirmasi Password"]').value;
    const fullName = document.querySelector('input[type="text"]').value;
    const phone = document.querySelector('input[type="tel"]').value;

    // Validasi sederhana: memastikan semua field terisi
    if (!email || !password || !confirmPassword || !fullName || !phone) {
        alert("Harap isi semua kolom yang tersedia.");
        return; // Menghentikan eksekusi fungsi jika ada field yang kosong
    }

    // Validasi: memastikan password dan konfirmasi password cocok
    if (password !== confirmPassword) {
        alert("Password dan Konfirmasi Password tidak cocok.");
        return; // Menghentikan eksekusi jika tidak cocok
    }

    // Membuat objek untuk menyimpan data pengguna baru
    const newUser = {
        email: email,
        password: password,
        fullName: fullName,
        phone: phone
    };

    // Menyimpan data pengguna ke localStorage.
    // JSON.stringify mengubah objek JavaScript menjadi string agar bisa disimpan.
    localStorage.setItem(email, JSON.stringify(newUser));

    // Memberi notifikasi bahwa pendaftaran berhasil
    alert("Sign up berhasil! Anda akan diarahkan ke halaman login.");

    // Mengarahkan pengguna ke halaman login setelah berhasil mendaftar
    window.location.href = "indexlogin.html";
}

function handleLogin() {
    // Mengambil nilai dari input email dan password di halaman login
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
            
            // Simpan informasi pengguna yang sedang login
            localStorage.setItem('activeUser', email);

            // PERUBAHAN: Cek apakah ada URL redirect yang tersimpan
            const redirectUrl = localStorage.getItem('redirectUrl');
            
            if (redirectUrl) {
                // Jika ada, arahkan ke sana dan hapus dari penyimpanan
                localStorage.removeItem('redirectUrl');
                window.location.href = redirectUrl;
            } else {
                // Jika tidak, arahkan ke halaman utama seperti biasa
                window.location.href = "/Index/indexHome.html";
            }
            
        } else {
            alert("Password yang Anda masukkan salah.");
        }
    } else {
        alert("Email tidak ditemukan. Silakan sign up terlebih dahulu.");
    }
}