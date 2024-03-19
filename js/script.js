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



  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });


  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();

     
   
  }); // End of a document

})(jQuery);

function hideBooking(style){
  document.querySelectorAll(".bookicon").forEach(item => {
    item.style.display = style;
  });
}
document.querySelectorAll(".booking").forEach(item => {
  item.addEventListener("click", () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if(user.email=="admin@admin.com"){
          setHrefManage('booking-manage.html');
          window.location.href = 'booking-manage.html';
        }else{
          setHrefManage('user-manage.html');
          window.location.href = 'user-manage.html';
        }
        
      } else {
        alert('กรุณาลงชื่อเข้าใช้ระบบ');
        window.location.href = 'login.html';
      }
    })
  });
});

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
