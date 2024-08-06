
//////// login ////////////
function SignIn () {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  if (email == '') {
    alert('กรุณาระบุอีเมล')
    return false
  } else if (password == '') {
    alert('กรุณาระบุรหัสผ่าน')
    return false
  }else{
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
    
        if (email == 'admin@admin.com') {
          alert('Login successfully!!!');
          window.location.href = 'booking-manage.html'
        } else {
          alert('กรุณาใช้อีเมลของแอดมิน เท่านั้น')
          firebase
            .auth()
            .signOut()
            .then(() => {
              location.replace('index.html')
            })
            .catch(error => {
              alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
            })
        }
      })
      .catch(error => {
        alert("ไม่สามารถลงชื่อเข้าใช้งานได้\nกรุณาตรวจสอบรหัสผ่านและชื่อผู้ใช้งาน");
      })  
  }
 
}
