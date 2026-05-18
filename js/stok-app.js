const app = Vue.createApp({

  data() {
    return {
      user: JSON.parse(localStorage.getItem("user") || '{"nama":""}'),
      greeting: "",

      stok: typeof dataBahanAjar !== "undefined" ? dataBahanAjar : [],

      filterUpbjj: "",
      filterKategori: "",
      warningFilter: "",
      sortBy: "",

      upbjjList: [
        "Jakarta",
        "Bandung",
        "Surabaya",
        "Medan",
        "Makassar",
        "Semarang",
        "Yogyakarta",
        "Palembang",
        "Denpasar",
        "Pontianak"
      ],

      kategoriList: [
        "Modul",
        "Buku Materi Pokok",
        "Suplemen",
        "Panduan Praktikum",
        "Kaset / CD",
        "Lainnya"
      ],

      form: {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ""
      }
    }
  },

  computed: {
    filteredStok() {
      let data = [...this.stok]

      // Filter UPBJJ
      if (this.filterUpbjj) {
        data = data.filter(item => item.upbjj === this.filterUpbjj)
      }

      // Filter Kategori (hanya aktif jika filterUpbjj dipilih)
      if (this.filterUpbjj && this.filterKategori) {
        data = data.filter(item => item.kategori === this.filterKategori)
      }

      // Filter Warning
      if (this.warningFilter === "kosong") {
        data = data.filter(item => item.qty === 0)
      } else if (this.warningFilter === "menipis") {
        data = data.filter(item => item.qty > 0 && item.qty < item.safety)
      }

      // Sort
      if (this.sortBy === "judul") {
        data.sort((a, b) => a.judul.localeCompare(b.judul))
      } else if (this.sortBy === "qty") {
        data.sort((a, b) => a.qty - b.qty)
      } else if (this.sortBy === "harga") {
        data.sort((a, b) => a.harga - b.harga)
      }

      return data
    }
  },

  methods: {
    resetFilter() {
      this.filterUpbjj = ""
      this.filterKategori = ""
      this.warningFilter = ""
      this.sortBy = ""
    },

    tambahBahan() {
      if (!this.form.kode || !this.form.judul) {
        alert("Kode dan Judul wajib diisi!")
        return
      }

      this.stok.push({
        kode: this.form.kode,
        judul: this.form.judul,
        kategori: this.form.kategori,
        upbjj: this.form.upbjj,
        lokasiRak: this.form.lokasiRak,
        harga: Number(this.form.harga),
        qty: Number(this.form.qty),
        safety: Number(this.form.safety),
        catatanHTML: this.form.catatanHTML
      })

      // Reset form
      this.form = {
        kode: "",
        judul: "",
        kategori: "",
        upbjj: "",
        lokasiRak: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ""
      }

      // Tutup modal
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalTambah"))
      if (modal) modal.hide()
    },

    editStok(index) {
      const item = this.filteredStok[index]
      const realIndex = this.stok.findIndex(s => s.kode === item.kode)

      const qtyBaru = prompt(`Edit Qty untuk "${item.judul}":`, item.qty)

      if (qtyBaru !== null && !isNaN(qtyBaru)) {
        this.stok[realIndex].qty = Number(qtyBaru)
      }
    },

    toggleSidebar() {
      this.sidebarShow = !this.sidebarShow
    },

    closeSidebar() {
      this.sidebarShow = false
    }
  },

  mounted() {
    if (!this.user.nama) {
      window.location.href = "index.html"
    }

    const jam = new Date().getHours()

    if (jam >= 5 && jam < 12) {
      this.greeting = "Selamat pagi"
    } else if (jam >= 12 && jam < 15) {
      this.greeting = "Selamat siang"
    } else if (jam >= 15 && jam < 18) {
      this.greeting = "Selamat sore"
    } else {
      this.greeting = "Selamat malam"
    }
  },

  watch: {
    filterUpbjj(newValue) {
      // Reset kategori saat UPBJJ berubah
      this.filterKategori = ""
      console.log("UPBJJ berubah:", newValue)
    },

    filterKategori(newValue) {
      console.log("Kategori berubah:", newValue)
    }
  }

})

app.mount("#app")