document.addEventListener('DOMContentLoaded', function() {
    
    
    const activeUserEmail = localStorage.getItem('activeUser');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    if (activeUserEmail) {
        welcomeMessage.textContent = ` ${activeUserEmail}`;
        
        //Sembunyikan tombol Login dan Sign Up
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        
        //Tampilkan tombol Logout
        logoutLink.style.display = 'block';

    } else {
        //Pastikan tombol Login dan Sign Up terlihat
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';

        //Sembunyikan tombol Logout dan pesan selamat datang
        logoutLink.style.display = 'none';
        welcomeMessage.style.display = 'none';
    }


    logoutLink.addEventListener('click', function() {
        // Hapus data pengguna aktif dari localStorage
        localStorage.removeItem('activeUser');
        alert('Anda telah berhasil logout.');
        // Arahkan kembali ke halaman login
        window.location.href = 'indexlogin.html';
    });
});