const app = Vue.createApp({

  data() {

    return {

      // ======================
      // SIDEBAR
      // ======================

      sidebarShow: false,

      // ======================
      // USER
      // ======================

      greeting: "",

      user: JSON.parse(
        localStorage.getItem("userLogin")
      ) || {},

      // ======================
      // DATA
      // ======================

      tracking: dataTracking,

      paketList,

      pengirimanList,

      // ======================
      // FORM
      // ======================

      form: {

        nim: "",

        nama: "",

        ekspedisi: "",

        paket: "",

        tanggalKirim: ""

      }

    }

  },

  // ======================
  // COMPUTED
  // ======================

  computed: {

    // GENERATE NOMOR DO
    generateDO() {

      const tahun = new Date().getFullYear()

      const jumlah =
        Object.keys(this.tracking).length + 1

      const nomor =
        String(jumlah).padStart(3, "0")

      return `DO${tahun}-${nomor}`

    },

    // DETAIL PAKET
    selectedPaket() {

      return this.paketList.find(

        item => item.kode == this.form.paket

      )

    }

  },

  // ======================
  // METHODS
  // ======================

  methods: {

    // SIDEBAR
    toggleSidebar() {

      this.sidebarShow =
        !this.sidebarShow

    },

    closeSidebar() {

      this.sidebarShow = false

    },

    // LOGOUT
    logout() {

      Swal.fire({

        title: "Yakin mau logout?",

        text: "Anda akan keluar dari sistem",

        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",

        cancelButtonColor: "#6c757d",

        confirmButtonText: "Ya, Logout",

        cancelButtonText: "Batal"

      }).then((result) => {

        if (result.isConfirmed) {

          localStorage.removeItem("userLogin")

          Swal.fire({

            title: "Berhasil!",

            text: "Anda berhasil logout",

            icon: "success",

            timer: 1500,

            showConfirmButton: false

          })

          setTimeout(() => {

            window.location.href =
              "index.html"

          }, 1500)

        }

      })

    },

    // TAMBAH DO
    tambahDO() {

      // VALIDASI
      if (

        !this.form.nim ||

        !this.form.nama ||

        !this.form.ekspedisi ||

        !this.form.paket

      ) {

        alert("Data belum lengkap!")

        return

      }

      // SIMPAN
      this.tracking[this.generateDO] = {

        nim: this.form.nim,

        nama: this.form.nama,

        status: "Diproses",

        ekspedisi: this.form.ekspedisi,

        tanggalKirim:
          this.form.tanggalKirim,

        paket: this.form.paket,

        total:
          this.selectedPaket.harga,

        perjalanan: []

      }

      // RESET FORM
      this.form = {

        nim: "",

        nama: "",

        ekspedisi: "",

        paket: "",

        tanggalKirim: ""

      }

      alert("Delivery Order berhasil ditambahkan!")

      // TUTUP MODAL
      const modal =
        bootstrap.Modal.getInstance(

          document.getElementById(
            "modalTambah"
          )

        )

      modal.hide()

    }

  },

  // ======================
  // MOUNTED
  // ======================

  mounted() {

    // CEK LOGIN
    if (!this.user.nama) {

      window.location.href =
        "index.html"

    }

    // GREETING
    let jam = new Date().getHours()

    if (jam >= 5 && jam < 12) {

      this.greeting =
        "Selamat pagi"

    }

    else if (jam >= 12 && jam < 15) {

      this.greeting =
        "Selamat siang"

    }

    else if (jam >= 15 && jam < 18) {

      this.greeting =
        "Selamat sore"

    }

    else {

      this.greeting =
        "Selamat malam"

    }

  }

})

app.mount("#app")