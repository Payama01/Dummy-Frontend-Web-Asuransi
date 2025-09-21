document.addEventListener('DOMContentLoaded', function() {
    
    
    const activeUserEmail = localStorage.getItem('activeUser');
    const welcomeMessage = document.getElementById('welcome-message');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    if (activeUserEmail) {
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

    logoutLink.addEventListener('click', function() {
        // Hapus data pengguna aktif dari localStorage
        localStorage.removeItem('activeUser');
        alert('Anda telah berhasil logout.');
        // Arahkan kembali ke halaman login
        window.location.href = 'indexlogin.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Cari tombol submit di halaman
    const submitButton = document.querySelector('.submit-button');

    // Jika tombol tidak ditemukan, hentikan eksekusi
    if (!submitButton) {
        console.error("Tombol submit tidak ditemukan di halaman ini.");
        return;
    }

    // Tambahkan event listener pada tombol submit
    submitButton.addEventListener('click', function(event) {
        event.preventDefault(); // Mencegah form untuk submit secara default

        let formData = {}; // Objek kosong untuk menampung data form
        const pageTitle = document.title; // Mengambil judul halaman untuk identifikasi

        // Cek halaman mana yang aktif berdasarkan judulnya
        if (pageTitle.toLowerCase().includes('jiwa')) {
            formData = getDataAsuransiJiwa();
        } else if (pageTitle.toLowerCase().includes('kesehatan')) {
            formData = getDataAsuransiKesehatan();
        } else if (pageTitle.toLowerCase().includes('mobil')) {
            formData = getDataAsuransiMobil();
        } else {
            alert('Tipe asuransi tidak dikenali.');
            return;
        }

        // Simpan data ke localStorage
        // JSON.stringify mengubah objek JavaScript menjadi format string
        localStorage.setItem('checkoutData', JSON.stringify(formData));

        // Beri notifikasi dan arahkan ke halaman checkout
        alert('Data berhasil disimpan! Anda akan diarahkan ke halaman checkout.');
        window.location.href = 'indexCheckout.html'; // Ganti dengan nama file checkout Anda
    });
});

function getDataAsuransiJiwa() {
    const formBox = document.querySelector('.form-box');
    const nama = formBox.querySelectorAll('input')[0].value;
    const tanggalLahir = formBox.querySelectorAll('input')[1].value;
    const pertanggungan = formBox.querySelector('select').value;

    return {
        type: 'Asuransi Jiwa',
        nama: nama,
        tanggalLahir: tanggalLahir,
        nilaiPertanggungan: pertanggungan
    };
}

function getDataAsuransiKesehatan() {
    const nama = document.querySelector('input[placeholder="Contoh: Carlos Sainz"]').value;
    const tanggalLahir = document.querySelector('input[type="date"]').value;
    const pekerjaan = document.querySelector('input[placeholder="Contoh: Guru"]').value;
    const merokok = document.querySelector('input[name="merokok"]:checked').value;
    const hipertensi = document.querySelector('input[name="hipertensi"]:checked').value;
    const diabetes = document.querySelector('input[name="diabetes"]:checked').value;

    return {
        type: 'Asuransi Kesehatan',
        nama: nama,
        tanggalLahir: tanggalLahir,
        pekerjaan: pekerjaan,
        merokok: merokok,
        riwayatHipertensi: hipertensi,
        riwayatDiabetes: diabetes
    };
}


function getDataAsuransiMobil() {
    const merk = document.querySelector('input[placeholder="Contoh: Toyota"]').value;
    const jenis = document.querySelector('input[placeholder="Contoh: Avanza"]').value;
    const tahun = document.querySelector('input[placeholder="Contoh: 2023"]').value;
    const harga = document.querySelector('input[placeholder="Contoh: 250000000"]').value;
    const plat = document.querySelector('input[placeholder="Contoh: B 1234 ABC"]').value;
    const namaPemilik = document.querySelector('input[placeholder="Sesuai KTP"]').value;


    return {
        type: 'Asuransi Mobil',
        merkMobil: merk,
        jenisMobil: jenis,
        tahunPembuatan: tahun,
        hargaMobil: harga,
        nomorPlat: plat,
        namaPemilik: namaPemilik
    };
}