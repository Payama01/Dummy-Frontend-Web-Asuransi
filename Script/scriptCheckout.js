document.addEventListener('DOMContentLoaded', function() {
    //Ambil data dari localStorage
    const storedData = localStorage.getItem('checkoutData');
    const detailContainer = document.getElementById('detail-checkout');
    
    if (!storedData) {
        detailContainer.innerHTML = "<h3>Data checkout tidak ditemukan. Silakan ulangi proses pembelian.</h3>";
        return;
    }

    const checkoutData = JSON.parse(storedData);

    //Cek tipe asuransi dan panggil fungsi yang sesuai
    if (checkoutData.type === 'Asuransi Mobil') {
        const premiTahunan = hitungPremiMobil(checkoutData.hargaMobil, checkoutData.tahunPembuatan);
        checkoutData.premiTahunan = premiTahunan;
        tampilkanDetailMobil(checkoutData, detailContainer);

    } else if (checkoutData.type === 'Asuransi Kesehatan') {
        const premiTahunan = hitungPremiKesehatan(
            checkoutData.tanggalLahir,
            checkoutData.merokok,
            checkoutData.riwayatHipertensi,
            checkoutData.riwayatDiabetes
        );
        checkoutData.premiTahunan = premiTahunan;
        tampilkanDetailKesehatan(checkoutData, detailContainer);

    } else if (checkoutData.type === 'Asuransi Jiwa') {
        const premiBulanan = hitungPremiJiwa(checkoutData.tanggalLahir, checkoutData.nilaiPertanggungan);
        checkoutData.premiBulanan = premiBulanan;
        tampilkanDetailJiwa(checkoutData, detailContainer);
    }

    //Tambahkan fungsi pada tombol bayar
    const bayarButton = document.getElementById('bayar-button');
    bayarButton.addEventListener('click', function() {
        const metodePembayaran = document.getElementById('payment-method').value;
        


        // Ambil riwayat yang sudah ada, atau buat array baru jika belum ada
        const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];

        // Tambahkan data transaksi baru ke dalam array riwayat
        const newTransaction = {
            ...checkoutData, // Salin semua data dari checkout
            paymentMethod: metodePembayaran,
            transactionDate: new Date().toISOString(),status: 'Lunas' 
            
        };
        history.push(newTransaction);

        // Simpan kembali array riwayat yang sudah diperbarui ke localStorage
        localStorage.setItem('paymentHistory', JSON.stringify(history));

        alert(`Terima kasih! Pembayaran dengan metode ${metodePembayaran} akan segera diproses.`);
        
        localStorage.removeItem('checkoutData');
        window.location.href = 'indexHome.html';
    });
});

function hitungUmur(tanggalLahir) {
    if (!tanggalLahir) return 0;
    const today = new Date();
    const birthDate = new Date(tanggalLahir);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const formatRupiah = (angka) => {
    if (isNaN(angka) || angka === null) return "Data tidak valid";
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
};

function hitungPremiMobil(hargaMobil, tahunPembuatan) {
    const x = parseFloat(hargaMobil);
    const tahunSekarang = new Date().getFullYear();
    const umurMobil = tahunSekarang - parseInt(tahunPembuatan);
    if (umurMobil <= 3) return 0.025 * x;
    if (umurMobil <= 5) return (x < 200000000) ? 0.04 * x : 0.03 * x;
    if (umurMobil > 5) return 0.05 * x;
    return 0;
}

function hitungPremiJiwa(tanggalLahir, nilaiPertanggungan) {
    const u = hitungUmur(tanggalLahir);
    const t = parseFloat(nilaiPertanggungan);
    let m = 0;
    if (u <= 30) m = 0.002;
    else if (u > 30 && u <= 50) m = 0.004;
    else if (u > 50) m = 0.01;
    return m * t;
}

function hitungPremiKesehatan(tanggalLahir, merokok, hipertensi, diabetes) {
    const P = 2000000;
    const u = hitungUmur(tanggalLahir);
    const k1 = (merokok === 'ya') ? 1 : 0;
    const k2 = (hipertensi === 'ya') ? 1 : 0;
    const k3 = (diabetes === 'ya') ? 1 : 0;
    let m = 0;
    if (u <= 20) m = 0.1;
    else if (u > 20 && u <= 35) m = 0.2;
    else if (u > 35 && u <= 50) m = 0.25;
    else if (u > 50) m = 0.4;
    return P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);
}

function tampilkanDetailMobil(data, container) {
    container.innerHTML = `
        <h2>Ringkasan ${data.type}</h2>
        <p><strong>Nama Pemilik:</strong> ${data.namaPemilik || 'N/A'}</p>
        <p><strong>Merk Mobil:</strong> ${data.merkMobil || 'N/A'}</p>
        <p><strong>Harga Mobil:</strong> ${formatRupiah(data.hargaMobil)}</p>
        <h3 class="total-harga">Premi per Tahun: ${formatRupiah(data.premiTahunan)}</h3>
    `;
}

function tampilkanDetailKesehatan(data, container) {
    container.innerHTML = `
        <h2>Ringkasan ${data.type}</h2>
        <p><strong>Nama Lengkap:</strong> ${data.nama || 'N/A'}</p>
        <p><strong>Tanggal Lahir:</strong> ${data.tanggalLahir || 'N/A'}</p>
        <p><strong>Merokok:</strong> ${data.merokok || 'N/A'}</p>
        <p><strong>Riwayat Hipertensi:</strong> ${data.riwayatHipertensi || 'N/A'}</p>
        <p><strong>Riwayat Diabetes:</strong> ${data.riwayatDiabetes || 'N/A'}</p>
        <h3 class="total-harga">Premi per Tahun: ${formatRupiah(data.premiTahunan)}</h3>
    `;
}

function tampilkanDetailJiwa(data, container) {
    container.innerHTML = `
        <h2>Ringkasan ${data.type}</h2>
        <p><strong>Nama Lengkap:</strong> ${data.nama || 'N/A'}</p>
        <p><strong>Tanggal Lahir:</strong> ${data.tanggalLahir || 'N/A'}</p>
        <p><strong>Nilai Pertanggungan:</strong> ${formatRupiah(data.nilaiPertanggungan)}</p>
        <h3 class="total-harga">Premi per Bulan: ${formatRupiah(data.premiBulanan)}</h3>
    `;
}