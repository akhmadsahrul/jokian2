function login(event) {

  event.preventDefault()

  const email = document.getElementById("email").value.trim()

  const password = document.getElementById("password").value.trim()

  // Cari pengguna
  const pengguna = dataPengguna.find(

    u => u.email === email &&
         u.password === password

  )

  if (pengguna) {

    // SIMPAN LOGIN
    localStorage.setItem(

      "userLogin",

      JSON.stringify(pengguna)

    )

    Swal.fire({

      icon: "success",

      title: "Login Berhasil",

      text: `Selamat datang, ${pengguna.nama}!`,

      timer: 1500,

      showConfirmButton: false

    }).then(() => {

      window.location.href = "dashboard.html"

    })

  }

  else {

    Swal.fire({

      icon: "error",

      title: "Login Gagal",

      text: "Email atau password salah"

    })

  }

  return false

}