
document.getElementById('saveanimal').addEventListener('click', function (event) {
    const animaltype = document.getElementById('animaltype').value;
    if (animaltype == '') {
        alert('กรุณาระบุประเภทสัตว์')
        return false
      }else{
        var postListRef = firebase.database().ref('animal_type');
        var newPostRef = postListRef.push();
        let coll = 0;
        let chk = false;
         postListRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
     
            coll+=1;
            chk = true;
          });

          console.log(coll);
      
                });
                // if(chk==true){
                    newPostRef.set({
                  ANM_ID: (coll==0 ? 1 : coll+1),
                  ANM_Name: animaltype,
                  ANM_Code: "ANM0"+(coll==0 ? 1 : coll+1),
                  ANM_Active : "1"
                }, (error) => {
                  if (error) {
                    console.log("เพิ่มข้อมูลไม่สำเร็จ");
                    return false
                    // The write failed...
                  } else {
                    console.log("เพิ่มข้อมูลใช้สำเร็จ");
                  //   location.reload()
                    // Data saved successfully!
                    return false
                  }
                });
                // }

      }
});