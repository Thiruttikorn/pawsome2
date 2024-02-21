
var firebaseConfig = { // enter the details below
  apiKey: "AIzaSyBtBLjODkH8iFlpPPJ31qeIIM5lDWSNgSc",
authDomain: "pawsome-e2cd3.firebaseapp.com",
databaseURL: "https://pawsome-e2cd3-default-rtdb.firebaseio.com",
projectId: "pawsome-e2cd3",
storageBucket: "pawsome-e2cd3.appspot.com",
messagingSenderId: "584456719961",
appId: "1:584456719961:web:db1bca363db76e90482b48",
measurementId: "G-K6NCFMXZ40"
};
firebase.initializeApp(firebaseConfig);
function SignUp () {
  const fname = document.getElementById('fname').value
  const lname = document.getElementById('lname').value
  const email = document.getElementById('email-regis').value
  const password = document.getElementById('password-regis').value
  const repassword = document.getElementById('repassword-regis').value
  var user = firebase.auth().currentUser
  var auth = firebase.auth()
  if (fname == '') {
    alert('กรุณาระบุชื่อผู้ใช้')
    return false
  } else if (lname == '') {
    alert('กรุณาระบุนามสกุลผู้ใช้')
    return false
  } else if (email == '') {
    alert('กรุณาระบุอีเมล')
    return false
  } else if (password == '') {
    alert('กรุณาระบุรหัสผ่าน')
    return false
  } else if (repassword == '') {
    alert('กรุณาระบุรหัสผ่านอีกครั้ง')
    return false
  } else if (repassword != password) {
    alert('กรุณาระบุรหัสผ่านให้ตรงกัน')
    return false
  } else {
    var postListRef = firebase.database().ref('users');
    var newPostRef = postListRef.push();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        newPostRef.set({
          name: fname+" "+lname,
          email: email,
          password: password
        }, (error) => {
          if (error) {
            console.log("เพิ่มบัญชีผู้ใช้ไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่");
            return false
            // The write failed...
          } else {
            console.log("เพิ่มบัญชีผู้ใช้สำเร็จ");
            // location.reload()
            // Data saved successfully!
            return false
          }
        });
        const user = userCredential.user;
        console.log(user);
        alert('Registration successfully!!');
   
        if(email=="admin@admin.com"){
          setHrefManage('admin-manage.html');
          window.location.href = 'admin-manage.html';
        }else{
          setHrefManage('user-manage.html');
          window.location.href = 'user-manage.html';
        }
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
        console.log(errorMessage)
        alert('เกิดข้อผิดพลาด กรุณาสมัครสมาชิกใหม่อีกครั้ง')
      })

  }

  // if (chk === false) {
  //   var newPostRef = postListRef.push();
  //   newPostRef.set({
  //     name: fname+" "+lname,
  //     email: email,
  //     password: password
  //   }, (error) => {
  //     if (error) {
  //       alert("เพิ่มบัญชีผู้ใช้ไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่");
  //       return false
  //       // The write failed...
  //     } else {
  //       alert("เพิ่มบัญชีผู้ใช้สำเร็จ");
  //       location.reload()
  //       // Data saved successfully!
  //       return false
  //     }
  //   });
  // } else {
  //   alert("มีบัญชีผู้ใช้นี้อยู่แล้ว กรุณากรอกข้อมูลใหม่อีกครั้ง");

  // }
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
    .auth().signInWithEmailAndPassword(email,password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user
      // console.log(user)
      alert(user.email + ' Login successfully!!!')

      document.getElementById('signOut').style.display = 'block';
      if(email=="admin@admin.com"){
        setHrefManage('admin-manage.html');
          window.location.href = 'admin-manage.html';
        }else{
          setHrefManage('user-manage.html');
          window.location.href = 'user-manage.html';
        }
    })
    .catch(error => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(errorMessage)
      alert("ไม่สามารถลงชื่อเข้าใช้งานได้ กรุณาสมัครสมาชิก");
      document.getElementById("nav-register-tab").click();
    })
  // var postListRef = firebase.database().ref('users');
  // var chk = "";
  // postListRef.on('value', function (snapshot) {
  //   snapshot.forEach(function (childSnapshot) {
  //     var childData = childSnapshot.val();
  //     if (childData.email == email && childData.password == password) {
  //       chk = true;
  //       return false;
  //     } else {
  //       chk = false;
  //       return false;
  //     }
  //   });
  // });
  // if (chk === true) {
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       alert("ลงชื่อเข้าใช้งานสำเร็จ")
  //       firebase.auth().onAuthStateChanged(user => {
  //         if (user) {
  //     document.getElementById("signOut").style.display = "inline-block";
  //     user.getIdToken().then(function(accessToken) {
  //       document.getElementById("usernametext").innerHTML = user.email;
  //       document.getElementById("usernametext2").innerHTML = user.email

  //                     });

  //           window.location.href = "index.html";
  //         }

  //       });
  //       // Signed in
  //       //  user.sendEmailVerification().then(function(){
  //       //     alert("ส่งอีเมลยืนยันผู้ใช้ไปที่"+email)
  //       //  }).catch(function(error){
  //       //       alert(error.message)
  //       //  });

  //     })
  //     .catch((error) => {
  //       alert("ลงชื่อเข้าใช้งานไม่สำเร็จ กรุณากรอกข้อมูลใหม่อีกครั้ง");
  //       // ..
  //     });
  // } else {
  //   alert("ข้อมูลไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้ง");

  // }
}

window.addEventListener('load', function () {
  initApp()
})
function initApp () {
  // const userss = firebase.auth().currentUser

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user)
      document.getElementById('signOut').style.display = 'inline-block'
      user.getIdToken().then(function (accessToken) {
        if(user.email=="admin@admin.com"){
          setHrefManage('admin-manage.html');
        }else{
          setHrefManage('user-manage.html');
        }
        document.getElementById('usernametext').innerHTML = user.email;
        document.getElementById('usernametext2').innerHTML = user.email;
      })
    } else {
      document.getElementById('usernametext').innerHTML = '';
      document.getElementById('usernametext2').innerHTML = '';
    }
  })
}

document.getElementById('signOut').addEventListener('click', function (event) {
  firebase
    .auth()
    .signOut()
    .then(() => {
      //     const user = firebase.auth().currentUser;
      // user.delete().then(() => {
      //   location.reload()
      // }).catch((error) => {
      //     // An error occurred
      //     // ...
      // });

      location.reload()
    })
    .catch(error => {
      alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
    })
})

document.querySelectorAll(".booking").forEach(item => {
  item.addEventListener("click", () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if(user.email=="admin@admin.com"){
          setHrefManage('admin-manage.html');
          window.location.href = 'admin-manage.html';
        }else{
          setHrefManage('user-manage.html');
          window.location.href = 'user-manage.html';
        }
        
        // document.getElementById('signOut').style.display = 'inline-block'
        // user.getIdToken().then(function (accessToken) {
        //   document.getElementById('usernametext').innerHTML = user.email
        //   document.getElementById('usernametext2').innerHTML = user.email
        // })
      } else {
        alert('กรุณาลงชื่อเข้าใช้ระบบ');
        window.location.href = 'login.html';
      }
    })
  });
});

function setHrefManage(page){
  document.querySelectorAll(".bookicon").forEach(item => {
    item.href = page;
    console.log(page)
  });
  
}