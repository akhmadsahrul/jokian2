const app = Vue.createApp({

  data() {

    return {

      // ======================
      // STATE
      // ======================

      sidebarShow: false,

      dropdownOpen: false,

      greeting: "",

      user: JSON.parse(localStorage.getItem("userLogin")) || {},

      // ======================
      // DATA
      // ======================

      dataPengguna,

      stok: dataBahanAjar,

      tracking: dataTracking,

      upbjjList,

      kategoriList,

      paketList,

      pengirimanList

    }

  },

  // ======================
  // COMPUTED
  // ======================

  computed: {

    totalBahan() {

      let total = 0

      this.stok.forEach(item => {
        total += item.qty
      })

      return total.toLocaleString()

    },

    totalTracking() {

      return Object.keys(this.tracking).length

    },

    totalUser() {

      return this.dataPengguna.length

    }

  },

  // ======================
  // METHODS
  // ======================

  methods: {

    toggleSidebar() {

      this.sidebarShow = !this.sidebarShow

    },

    closeSidebar() {

      this.sidebarShow = false

    },

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

          // hapus login
          localStorage.removeItem("userLogin")

          Swal.fire({

            title: "Berhasil!",

            text: "Anda berhasil logout",

            icon: "success",

            timer: 1500,

            showConfirmButton: false

          })

          // redirect
          setTimeout(() => {

            window.location.href = "index.html"

          }, 1500)

        }

      })

    }

  },

  // ======================
  // MOUNTED
  // ======================

  mounted() {

    // cek login
    if (!this.user.nama) {

      window.location.href = "index.html"

    }

    // greeting
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

  },

  // ======================
  // WATCH
  // ======================

  watch: {

    sidebarShow(newValue) {

      console.log("Sidebar:", newValue)

    },

    dropdownOpen(newValue) {

      console.log("Dropdown:", newValue)

    }

  }

})

app.mount("#app")