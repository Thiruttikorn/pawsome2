// function SignUp () {
//   const fname = document.getElementById('fname').value
//   const lname = document.getElementById('lname').value
//   const email = document.getElementById('email-regis').value
//   const password = document.getElementById('password-regis').value
//   const repassword = document.getElementById('repassword-regis').value
//   // var user = firebase.auth().currentUser
//   var auth = firebase.auth()
//   if (fname == '') {
//     alert('กรุณาระบุชื่อผู้ใช้')
//     return false
//   } else if (lname == '') {
//     alert('กรุณาระบุนามสกุลผู้ใช้')
//     return false
//   } else if (email == '') {
//     alert('กรุณาระบุอีเมล')
//     return false
//   } else if (password == '') {
//     alert('กรุณาระบุรหัสผ่าน')
//     return false
//   } else if (repassword == '') {
//     alert('กรุณาระบุรหัสผ่านอีกครั้ง')
//     return false
//   } else if (repassword != password) {
//     alert('กรุณาระบุรหัสผ่านให้ตรงกัน')
//     return false
//   } else {
//     var postListRef = firebase.database().ref('users')
//     var newPostRef = postListRef.push()

//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         newPostRef.set(
//           {
//             name: fname + ' ' + lname,
//             email: email,
//             password: password
//           },
//           error => {
//             if (error) {
//               console.log('เพิ่มบัญชีผู้ใช้ไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่')
//               return false
//               // The write failed...
//             } else {
//               console.log('เพิ่มบัญชีผู้ใช้สำเร็จ')
//               // location.reload()
//               // Data saved successfully!
//               return false
//             }
//           }
//         )
//         const user = userCredential.user
//         console.log(user)
//         alert('Registration successfully!!')

//         if (email == 'admin@admin.com') {
//           setHrefManage('booking-manage.html')
//           window.location.href = 'booking-manage.html'
//         } else {
//           setHrefManage('user-manage.html')
//           window.location.href = 'user-manage.html'
//         }
//       })
//       .catch(error => {
//         const errorCode = error.code
//         const errorMessage = error.message
//         // ..
//         console.log(errorMessage)
//         alert('เกิดข้อผิดพลาด กรุณาสมัครสมาชิกใหม่อีกครั้ง')
//       })
//   }

//   // if (chk === false) {
//   //   var newPostRef = postListRef.push();
//   //   newPostRef.set({
//   //     name: fname+" "+lname,
//   //     email: email,
//   //     password: password
//   //   }, (error) => {
//   //     if (error) {
//   //       alert("เพิ่มบัญชีผู้ใช้ไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่");
//   //       return false
//   //       // The write failed...
//   //     } else {
//   //       alert("เพิ่มบัญชีผู้ใช้สำเร็จ");
//   //       location.reload()
//   //       // Data saved successfully!
//   //       return false
//   //     }
//   //   });
//   // } else {
//   //   alert("มีบัญชีผู้ใช้นี้อยู่แล้ว กรุณากรอกข้อมูลใหม่อีกครั้ง");

//   // }
// }

window.addEventListener('load', function () {
  initApp()
})

function initApp () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      document.getElementById('signOut').style.display = 'inline-block'

      user.getIdToken().then(function () {
        if (user.email == 'admin@admin.com') {
          setHrefManage('booking-manage.html')
        }
       else {
          setHrefManage('index.html')
        }
        document.getElementById('usernametext').innerHTML = user.email
        document.getElementById('usernametext2').innerHTML = user.email
        hideBooking('block')
      })
    } else {
      document.getElementById('usernametext').innerHTML = ''
      document.getElementById('usernametext2').innerHTML = ''
      hideBooking('none')
    }
  })
}

function setHrefManage (page) {
  document.querySelectorAll('.bookicon').forEach(item => {
    item.href = page
  })
}
