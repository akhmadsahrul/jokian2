const app = Vue.createApp({

  data() {

    return {
      // SIDEBAR
      sidebarShow: false,

      // USER LOGIN
      user: JSON.parse(
        localStorage.getItem("userLogin")
      ) || { nama: "" },

      greeting: "",

      // DATA STOK
      stok: typeof dataBahanAjar !== "undefined"
        ? dataBahanAjar
        : [],
      // FILTER
      filterUpbjj: "",

      filterKategori: "",

      warningFilter: "",

      sortBy: "",

      // MASTER DATA
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
      // FORM
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
  // COMPUTED
  computed: {

    filteredStok() {

      let data = [...this.stok]

      // FILTER UPBJJ
      if (this.filterUpbjj) {

        data = data.filter(

          item =>
            item.upbjj === this.filterUpbjj

        )

      }

      // FILTER KATEGORI
      if (

        this.filterUpbjj &&

        this.filterKategori

      ) {

        data = data.filter(

          item =>
            item.kategori ===
            this.filterKategori

        )

      }

      // FILTER WARNING
      if (this.warningFilter === "kosong") {

        data = data.filter(

          item => item.qty === 0

        )

      }

      else if (
        this.warningFilter === "menipis"
      ) {

        data = data.filter(

          item =>
            item.qty > 0 &&
            item.qty < item.safety

        )

      }

      // SORT JUDUL
      if (this.sortBy === "judul") {

        data.sort((a, b) =>

          a.judul.localeCompare(
            b.judul
          )

        )

      }

      // SORT QTY
      else if (this.sortBy === "qty") {

        data.sort((a, b) =>

          a.qty - b.qty

        )

      }

      // SORT HARGA
      else if (this.sortBy === "harga") {

        data.sort((a, b) =>

          a.harga - b.harga

        )

      }

      return data

    }

  },

  // METHODS
  methods: {

    // TOGGLE SIDEBAR
    toggleSidebar() {

      this.sidebarShow =
        !this.sidebarShow

    },

    // CLOSE SIDEBAR
    closeSidebar() {

      this.sidebarShow = false

    },

    // RESET FILTER
    resetFilter() {

      this.filterUpbjj = ""

      this.filterKategori = ""

      this.warningFilter = ""

      this.sortBy = ""

    },

    // TAMBAH BAHAN AJAR
    tambahBahan() {

      // VALIDASI
      if (

        !this.form.kode ||

        !this.form.judul ||

        !this.form.kategori ||

        !this.form.upbjj

      ) {

        Swal.fire({

          icon: "warning",

          title: "Data belum lengkap",

          text: "Mohon isi seluruh field wajib"

        })

        return

      }

      // PUSH DATA
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

      // RESET FORM
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

      // ALERT
      Swal.fire({

        icon: "success",

        title: "Berhasil",

        text: "Data bahan ajar berhasil ditambahkan",

        timer: 1500,

        showConfirmButton: false

      })

      // TUTUP MODAL
      const modal =
        bootstrap.Modal.getInstance(

          document.getElementById(
            "modalTambah"
          )

        )

      if (modal) {

        modal.hide()

      }

    },

    // EDIT STOK
    editStok(index) {

      const item =
        this.filteredStok[index]

      const realIndex =
        this.stok.findIndex(

          s => s.kode === item.kode

        )

      Swal.fire({

        title: "Edit Qty",

        input: "number",

        inputValue: item.qty,

        showCancelButton: true,

        confirmButtonText: "Simpan",

        cancelButtonText: "Batal"

      }).then((result) => {

        if (result.isConfirmed) {

          this.stok[realIndex].qty =
            Number(result.value)

        }

      })

    },

    // LOGOUT
    logout() {

      Swal.fire({

        title: "Yakin logout?",

        text: "Anda akan keluar dari sistem",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText: "Logout",

        cancelButtonText: "Batal",

        confirmButtonColor: "#d33"

      }).then((result) => {

        if (result.isConfirmed) {

          localStorage.removeItem(
            "userLogin"
          )

          window.location.href =
            "index.html"

        }

      })

    }

  },

  // MOUNTED
  mounted() {

    // CEK LOGIN
    if (!this.user.nama) {

      window.location.href =
        "index.html"

    }

    // GREETING
    const jam =
      new Date().getHours()

    if (jam >= 5 && jam < 12) {

      this.greeting =
        "Selamat pagi"

    }

    else if (
      jam >= 12 &&
      jam < 15
    ) {

      this.greeting =
        "Selamat siang"

    }

    else if (
      jam >= 15 &&
      jam < 18
    ) {

      this.greeting =
        "Selamat sore"

    }

    else {

      this.greeting =
        "Selamat malam"

    }

  },

  // WATCH
  watch: {

    filterUpbjj(newValue) {

      // RESET KATEGORI
      this.filterKategori = ""

      console.log(
        "UPBJJ berubah:",
        newValue
      )

    },

    filterKategori(newValue) {

      console.log(
        "Kategori berubah:",
        newValue
      )

    }

  }

})

app.mount("#app")