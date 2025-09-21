document.addEventListener('DOMContentLoaded', function() {
    const activeUserEmail = localStorage.getItem('activeUser');
    const welcomeMessage = document.getElementById('welcome-message');

    if (activeUserEmail) {
        // Jika ada pengguna yang login, tampilkan emailnya
        welcomeMessage.textContent = ` ${activeUserEmail}`;
        welcomeMessage.style.display = 'block';
    } else {
        // Jika tidak ada yang login, sembunyikan pesan selamat datang
        welcomeMessage.style.display = 'none';
        
        alert("Anda harus login untuk melihat riwayat.");
        window.location.href = 'indexlogin.html';
    }

    const historyContainer = document.getElementById('history-list');
    // Ambil data riwayat dari localStorage, jika tidak ada, gunakan array kosong
    const history = JSON.parse(localStorage.getItem('paymentHistory')) || [];

    // Jika tidak ada riwayat sama sekali
    if (history.length === 0) {
        historyContainer.innerHTML = '<p id="no-history-message">Belum ada riwayat pembayaran.</p>';
        return;
    }

    // Urutkan riwayat dari yang terbaru ke terlama berdasarkan tanggal transaksi
    history.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));

    // Loop melalui setiap item riwayat dan tampilkan di halaman
    history.forEach(transaction => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';

        // Format tanggal agar lebih mudah dibaca
        const formattedDate = new Date(transaction.transactionDate).toLocaleDateString('id-ID', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        let detailsHTML = '';
        let totalHTML = ''; 

        // Tentukan detail dan total berdasarkan tipe asuransi
        if (transaction.type === 'Asuransi Mobil') {
            detailsHTML = `
                <p><strong>Nama Pemilik:</strong> ${transaction.namaPemilik}</p>
                <p><strong>Merk Mobil:</strong> ${transaction.merkMobil}</p>
            `;
            totalHTML = `<p class="total-harga">Premi Tahunan: ${formatRupiah(transaction.premiTahunan)}</p>`;
        } else if (transaction.type === 'Asuransi Kesehatan') {
            detailsHTML = `
                <p><strong>Nama Lengkap:</strong> ${transaction.nama}</p>
                <p><strong>Merokok:</strong> ${transaction.merokok}</p>
            `;
            totalHTML = `<p class="total-harga">Premi Tahunan: ${formatRupiah(transaction.premiTahunan)}</p>`;
        } else if (transaction.type === 'Asuransi Jiwa') {
            detailsHTML = `
                <p><strong>Nama Lengkap:</strong> ${transaction.nama}</p>
                <p><strong>Pertanggungan:</strong> ${formatRupiah(transaction.nilaiPertanggungan)}</p>
            `;
            totalHTML = `<p class="total-harga">Premi Bulanan: ${formatRupiah(transaction.premiBulanan)}</p>`;
        }

        // Gabungkan semua menjadi satu blok HTML
        itemDiv.innerHTML = `
            <div class="history-item-header">
                <h2>${transaction.type}</h2>
                <span class="date">${formattedDate}</span>
            </div>
            <div class="history-item-body">
                ${detailsHTML}
                <p><strong>Metode Bayar:</strong> ${transaction.paymentMethod}</p>
                
                <p><strong>Status Pembayaran:</strong> <span class="status-lunas">${transaction.status || 'N/A'}</span></p>
                ${totalHTML}
            </div>
        `;
        // Tambahkan blok HTML ke dalam container di halaman
        historyContainer.appendChild(itemDiv);
    });
});

// Fungsi bantu untuk format Rupiah
const formatRupiah = (angka) => {
    if (isNaN(angka) || angka === null) return "N/A";
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(angka);
};