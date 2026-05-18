function login(event) {
  event.preventDefault()

  const email    = document.getElementById("email").value.trim()
  const password = document.getElementById("password").value.trim()

  // Cari pengguna yang cocok
  const pengguna = dataPengguna.find(
    u => u.email === email && u.password === password
  )

  if (pengguna) {
    // Simpan data user ke localStorage agar bisa dipakai di halaman lain
    localStorage.setItem("user", JSON.stringify(pengguna))

    Swal.fire({
      icon: "success",
      title: "Login Berhasil",
      text: `Selamat datang, ${pengguna.nama}!`,
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      window.location.href = "dashboard.html"
    })

  } else {
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: "Email atau password salah. Silakan coba lagi."
    })
  }

  return false
}