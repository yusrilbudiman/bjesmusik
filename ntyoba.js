// Memuat Popper.js
const popperScript = document.createElement('script');
popperScript.src = 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js';
popperScript.defer = true; // Pastikan script Popper.js dimuat setelah elemen HTML
document.body.appendChild(popperScript);

// Memuat Bootstrap JS
const bootstrapScript = document.createElement('script');
bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js';
bootstrapScript.defer = true; // Pastikan script Bootstrap dimuat setelah Popper.js
document.body.appendChild(bootstrapScript);

  
  
function scrollToCheckout() {
            document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
        }

        function lanjutkanPembayaran(event) {
            event.preventDefault();
            let nama = document.getElementById("nama").value;
            let email = document.getElementById("email").value;
            let telepon = document.getElementById("telepon").value;
            let alamat = document.getElementById("alamat").value;
            let tanggalWaktu = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

            if (!nama || !email || !telepon || !alamat) {
                alert("Harap lengkapi semua data!");
                return;
            }

            // Simpan ke Google Spreadsheet
            let sheetUrl = "https://script.google.com/macros/s/AKfycbzLLFI_CGWDBPquPr7ximlZlnNh2T8NLvQFUYGAxJ5yllBvov6Vq18lyW_o5CckH5rpjA/exec";
            let formData = new FormData();
            formData.append("nama", nama);
            formData.append("email", email);
            formData.append("telepon", telepon);
            formData.append("alamat", alamat);
            formData.append("tanggal_waktu", tanggalWaktu);

            fetch(sheetUrl, { method: "POST", body: formData })
                .then(response => response.text())
                .then(result => console.log("Data berhasil disimpan", result))
                .catch(error => console.error("Error menyimpan data:", error));

            // Kirim pesan ke WhatsApp
            let message = `Halo, saya ingin membeli Kaos B-jes Musik!%0A%0ANama: ${nama}%0AEmail: ${email}%0ANo. Telepon: ${telepon}%0AAlamat: ${alamat}`;
            let whatsappUrl = `https://wa.me/6285890398082?text=${message}`;
            window.open(whatsappUrl, "_blank");
         }
