document.addEventListener('DOMContentLoaded', function() {

    const activeUserEmail = localStorage.getItem('activeUser');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const historyLink = document.getElementById('history-link');

    if (activeUserEmail) {
        welcomeMessage.textContent = ` ${activeUserEmail}`;
        
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        
        logoutLink.style.display = 'block';
        historyLink.style.display = 'block';

    } else {
        loginLink.style.display = 'block';
        signupLink.style.display = 'block';

        logoutLink.style.display = 'none';
        historyLink.style.display = 'none';
        welcomeMessage.style.display = 'none';
    }


    logoutLink.addEventListener('click', function() {
        localStorage.removeItem('activeUser');
        localStorage.removeItem('paymentHistory');
        alert('Anda telah berhasil logout.');
        // Arahkan kembali ke halaman login
        window.location.href = 'indexlogin.html';
    });

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