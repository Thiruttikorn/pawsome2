window.addEventListener('load', function () {
  initApp()
})
function initApp () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user.getIdToken().then(function (accessToken) {
        if (user.email == 'admin@admin.com') {
          location.replace('booking-manage.html')
        } else {
          location.replace('index.html')
          // location.replace('user-manage.html')
        }
      })
    } else {
      if (document.body.classList.contains('hide-page')) {
        document.body.classList.remove('hide-page')
      }
      document.getElementById('signOut').style.display = 'none'
      document.getElementById('usernametext').innerHTML = ''
      hideBooking('none')
      document.getElementById('usernametext2').innerHTML = ''
    }
  })
}

function SignIn () {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  if (email == '') {
    alert('กรุณาระบุอีเมล')
    return false
  } else if (password == '') {
    alert('กรุณาระบุรหัสผ่าน')
    return false
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user
      // console.log(user)

      document.getElementById('signOut').style.display = 'block'
      if (email == 'admin@admin.com') {
        alert(user.email + ' Login successfully!!!')
        setHrefManage('booking-manage.html')
        window.location.href = 'booking-manage.html'
      } else {
        alert('กรุณาใช้อีเมลของแอดมิน เท่านั้น')
        firebase
          .auth()
          .signOut()
          .then(() => {
            location.replace('login.html')
          })
          .catch(error => {
            alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
          })
      }
    })
    .catch(error => {
      // const errorCode = error.code
      // const errorMessage = error.message
      // alert("ไม่สามารถลงชื่อเข้าใช้งานได้");
      // // document.getElementById("nav-register-tab").click();
    })
}

document.querySelectorAll('.icon-person').forEach(item => {
  item.classList.add('active-icon')
})
