const app = Vue.createApp({

  data() {

    return {

      sidebarShow: false,

      greeting: "",

      user: JSON.parse(localStorage.getItem("userLogin")) || {},

      tracking: dataTracking,

      paketList,

      pengirimanList,

      form: {

        nim: "",

        nama: "",

        ekspedisi: "",

        paket: "",

        tanggalKirim: ""

      }

    }

  },

  computed: {

    // GENERATE NOMOR DO
    generateDO() {

      const tahun = new Date().getFullYear()

      const jumlah = Object.keys(this.tracking).length + 1

      const nomor = String(jumlah).padStart(3, "0")

      return `DO${tahun}-${nomor}`

    },

    // DETAIL PAKET
    selectedPaket() {

      return this.paketList.find(
        item => item.kode == this.form.paket
      )

    }

  },

  methods: {

    toggleSidebar() {

      this.sidebarShow = !this.sidebarShow

    },

    closeSidebar() {

      this.sidebarShow = false

    },

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

      // SIMPAN DATA
      this.tracking[this.generateDO] = {

        nim: this.form.nim,

        nama: this.form.nama,

        status: "Diproses",

        ekspedisi: this.form.ekspedisi,

        tanggalKirim: this.form.tanggalKirim,

        paket: this.form.paket,

        total: this.selectedPaket.harga,

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
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalTambah")
      )

      modal.hide()

    }

  },

  mounted() {

    let jam = new Date().getHours()

    if (jam >= 5 && jam < 12) {

      this.greeting = "Selamat pagi"

    }

    else if (jam >= 12 && jam < 15) {

      this.greeting = "Selamat siang"

    }

    else if (jam >= 15 && jam < 18) {

      this.greeting = "Selamat sore"

    }

    else {

      this.greeting = "Selamat malam"

    }

  }

})

app.mount("#app")