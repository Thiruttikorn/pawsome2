function SignUp() {
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email-regis").value;
  const password = document.getElementById("password-regis").value;
  const repassword = document.getElementById("repassword-regis").value;
  var user = firebase.auth().currentUser;
  var auth = firebase.auth();
  if (fname == "") {
    alert("กรุณาระบุชื่อผู้ใช้");
    return false;
  }
  else if (lname == "") {
    alert("กรุณาระบุนามสกุลผู้ใช้");
    return false;
  }
  else if (email == "") {
    alert("กรุณาระบุอีเมล");
    return false;
  }
  else if (password == "") {
    alert("กรุณาระบุรหัสผ่าน");
    return false;
  }
  else if (repassword == "") {
    alert("กรุณาระบุรหัสผ่านอีกครั้ง");
    return false;
  }
  else {
    auth
    .createUserWithEmailAndPassword(email, password)
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        // ...
    });
    window.location.href = "user-manage.html";
}
  // var postListRef = firebase.database().ref('users');
  // var newPostRef = postListRef.push();
  // const auth = firebase.auth();
  // createUserWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in 
  //   const user = userCredential.user;
  //   console.log(user);
  //   alert("Registration successfully!!");
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // ..
  //   console.log(errorMessage);
  //   alert(error);
  // });		  	

  // var chk = "";
  // postListRef.on('value', function (snapshot) {
  //   snapshot.forEach(function (childSnapshot) {
  //     var childData = childSnapshot.val();
  //     if (childData.name == fname+" "+lname && childData.email == email && childData.password == password) {
  //       chk = true;
  //       return false;
  //     } else {
  //       chk = false;
  //       return false;
  //     }
  //   });
  // });
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

function SignIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // var user = firebase.auth().currentUser;
  if (email == "") {
    alert("กรุณาระบุอีเมล");
    return false;
  }
  else if (password == "") {
    alert("กรุณาระบุรหัสผ่าน");
    return false;
  }
  var auth = firebase.auth();
  firebase.auth().signInWithEmailAndPassword(email, password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    console.log(user);
		    alert(user.email+" Login successfully!!!");
        
		    document.getElementById('signOut').style.display = 'block';
        window.location.href = "user-manage.html";
		    // ...
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
		    console.log(errorMessage);
		    alert(errorMessage);
		  });		
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


  // let getUsersAuth;
  // postListRef.on('value', (snapshot) => {
  //   getUsersAuth = snapshot.val();


  // }, (errorObject) => {
  //   console.log('The read failed: ' + errorObject.name);
  // });
  // if (getUsersAuth.email == email && getUsersAuth.password == password) {
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //     .then(() => {
  //       alert("ลงชื่อเข้าใช้งานสำเร็จ")
  //       firebase.auth().onAuthStateChanged(user => {
  //         if (user) {

  //           var fireBase_name = user.username;

  //           // var fireBase_emailVerified = user.emailVerified;
  //           // var fireBase_uid = user.uid;
  //           document.getElementById("usernametext").innerHTML = fireBase_name
  //           console.log(fireBase_name)

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
  // }
  // else {
  //   alert("ข้อมูลไม่ถูกต้อง กรุณากรอกข้อมูลใหม่อีกครั้ง");

  //   // var newPostRef = postListRef.push();
  //   // newPostRef.set({
  //   // username: name,
  //   //     email: email,
  //   //     password : password
  //   // }, (error) => {
  //   //     if (error) {
  //   //          alert("เพิ่มบัญชีผู้ใช้ไม่สำเร็จ กรุณาติดต่อเจ้าหน้าที่");
  //   //       // The write failed...
  //   //     } else {
  //   //       alert("เพิ่มบัญชีผู้ใช้สำเร็จ");
  //   //       // Data saved successfully!
  //   //     }
  //   //   });
  // }

  // var database = firebase.database();
  // firebase.database().ref('users/U1').set({
  //     username: name,
  //     email: email,
  //     password : password
  // }, (error) => {
  //     if (error) {
  //         alert(error.message)
  //       // The write failed...
  //     } else {
  //       // Data saved successfully!
  //     }
  //   });
  //     firebase.auth().createUserWithEmailAndPassword(email,password)
  //     .then(() => {
  //       // Signed in 
  //      user.sendEmailVerification().then(function(){
  //         alert("ส่งอีเมลยืนยันผู้ใช้ไปที่"+email)
  //      }).catch(function(error){
  // alert(error.message)
  //      });

  //     })
  //     .catch((error) => {
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       alert(error.message)
  //       // ..
  //     });

}

     window.addEventListener('load', function() {
            initApp();
        });
        function initApp() {
          const userss = firebase.auth().currentUser;
          
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                  console.log(user)
                    document.getElementById("signOut").style.display = "inline-block";
                    user.getIdToken().then(function(accessToken) {
                      document.getElementById("usernametext").innerHTML = user.email;
                      document.getElementById("usernametext2").innerHTML = user.email



                    });
                } else {
                    document.getElementById('usernametext').innerHTML = '';
                    document.getElementById("usernametext2").innerHTML = ''

                }
            });
        };

document.getElementById('signOut').addEventListener('click', function(event) {

  firebase.auth().signOut().then(() => {
//     const user = firebase.auth().currentUser; 
// user.delete().then(() => {
//   location.reload()
// }).catch((error) => {
//     // An error occurred
//     // ...
// });

location.reload()
  }).catch((error) => {
   alert("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่")
  });
  

});