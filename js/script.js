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
(function($) {
  
  "use strict";

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }


  // document ready
  $(document).ready(function() {
    initPreloader();
    if (document.body.classList.contains('hide-page')) {
      document.body.classList.remove('hide-page')
    }
  }); // End of a document

})(jQuery);

function checkLogin() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user.getIdToken().then(function (accessToken) {
        if (user.email != 'admin@admin.com') {
          location.replace('login.html')
        }else{
          document.getElementById('usernametext').innerHTML = user.email
          document.getElementById('usernametext2').innerHTML = user.email
          document.getElementById('signOut').style.display = 'inline-block'
        }
      })
    } else {
      if (document.body.classList.contains('hide-page')) {
          document.body.classList.remove('hide-page')
      }
      document.getElementById('signOut').style.display = 'none'
      document.getElementById('usernametext').innerHTML = ''
      document.getElementById('usernametext2').innerHTML = ''
    }
  })
}
document.querySelectorAll(".signout").forEach(item => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      item.style.display = "block";
      item.addEventListener("click", () => {
        firebase
        .auth()
        .signOut()
        .then(() => {
          location.replace("login.html")
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
        })
      });
    } else {
      item.style.display = "none";
    }
  })


});

