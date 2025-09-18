// Menunggu seluruh halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // --- BAGIAN 1: MENGATUR TAMPILAN BERDASARKAN STATUS LOGIN ---
    
    const activeUserEmail = localStorage.getItem('activeUser');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    if (activeUserEmail) {
        // Jika ada pengguna yang login:
        // 1. Tampilkan pesan selamat datang dengan email pengguna
        welcomeMessage.textContent = ` ${activeUserEmail}`;
        
        // 2. Sembunyikan tombol Login dan Sign Up
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        
        // 3. Tampilkan tombol Logout
        logoutLink.style.display = 'block';

    } else {
        // Jika tidak ada yang login:
        // 1. Pastikan tombol Login dan Sign Up terlihat
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';

        // 2. Sembunyikan tombol Logout dan pesan selamat datang
        logoutLink.style.display = 'none';
        welcomeMessage.style.display = 'none';
    }

    // --- BAGIAN 2: MENAMBAHKAN FUNGSI PADA TOMBOL LOGOUT ---

    logoutLink.addEventListener('click', function() {
        // Hapus data pengguna aktif dari localStorage
        localStorage.removeItem('activeUser');
        alert('Anda telah berhasil logout.');
        // Arahkan kembali ke halaman login
        window.location.href = 'indexlogin.html';
    });


    // --- BAGIAN 3: FUNGSI UNTUK TOMBOL KATEGORI ASURANSI (Kode dari sebelumnya) ---

    const insuranceButtons = document.querySelectorAll('.kategori-button');
    insuranceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const activeUser = localStorage.getItem('activeUser');

            if (activeUser) {
                // Jika pengguna sudah login, arahkan ke halaman detail
                let destination = '';
                if (button.textContent.includes('Mobil')) {
                    destination = 'indexDetailMobil.html';
                } else if (button.textContent.includes('Kesehatan')) {
                    destination = 'indexDetailKesehatan.html';
                } else if (button.textContent.includes('Jiwa')) {
                    destination = 'indexDetailJiwa.html';
                }
                window.location.href = destination;
            } else {
                // Jika belum login, minta login terlebih dahulu
                alert('Anda harus login terlebih dahulu untuk melihat detail asuransi.');
                let intendedDestination = '';
                if (button.textContent.includes('Mobil')) {
                    intendedDestination = 'indexDetailMobil.html';
                } else if (button.textContent.includes('Kesehatan')) {
                    intendedDestination = 'indexDetailKesehatan.html';
                } else if (button.textContent.includes('Jiwa')) {
                    intendedDestination = 'indexDetailJiwa.html';
                }
                localStorage.setItem('redirectUrl', intendedDestination);
                window.location.href = 'indexlogin.html';
            }
        });
    });
});