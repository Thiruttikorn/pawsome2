
window.addEventListener('load', function () {
  selectAnimal();

})
document
  .getElementById('v-pills-pets-tab')
  .addEventListener('click', function (event) {
    selectAnimal()
  })
document
  .getElementById('v-pills-service-tab')
  .addEventListener('click', function (event) {
    selectService()
  })

 function selectAnimal () {
  var postListRef = firebase.database().ref('animal_type')
  var html = ''
  document.getElementById('table-animaltype').innerHTML = ''
  postListRef.on(
    'value',
     function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const data = childSnapshot.val()
        html += `<tr>
    <th scope="row">${data.ANM_ID}</th>
    <td>${data.ANM_Name}</td>
    <td>${data.ANM_Code}</td>
    <td>
    ${
      data.ANM_Active == '1'
        ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
    ปกติ`
        : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
    ไม่ใช้งาน`
    }</td>
   <td> <button class="w-auto btn btn-secondary btn-sm p-1 delanimal"
            type="button" value="${childSnapshot.key}"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน
      
        </button></td> 
</tr>`
      })
      document.getElementById('table-animaltype').innerHTML = html;
      delanimal();

    }
  )
 
}


 function selectService () {
  var postListRef = firebase.database().ref('service_type')
  var html = ''
  document.getElementById('table-servicetype').innerHTML = ''
  postListRef.on(
    'value',
     function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        const data = childSnapshot.val()

        html += `<tr>
    <th scope="row">${data.SV_ID}</th>
    <td>${data.SV_Name}</td>
    <td>${data.SV_Code}</td>
    <td>
    ${
      data.SV_Active == '1'
        ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
    ปกติ`
        : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
    ไม่ใช้งาน`
    }</td>
    <td> <button class="w-auto btn btn-secondary btn-sm p-1 delservice"
    type="button" value="${childSnapshot.key}"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button></td> 
</tr>`
      })
      document.getElementById('table-servicetype').innerHTML = html;
      delservice();
    }
  )
}

// table-animaltype
document
  .getElementById('saveanimal')
  .addEventListener('click', function (event) {
    const animaltype = document.getElementById('animaltype').value

    if (animaltype == '') {
      alert('กรุณาระบุประเภทสัตว์')
      return false
    } else {
      let coll = 0
      var postListRef = firebase.database().ref('animal_type')
      postListRef.on('value', function (snapshot) {
        document.getElementById('table-animaltype').innerHTML = ''
        if (snapshot.numChildren() != undefined) {
          coll = snapshot.numChildren()
        }
      })
      var newPostRef = postListRef.push()
      newPostRef.set(
        {
          ANM_ID: coll == 0 ? 1 : coll + 1,
          ANM_Name: animaltype,
          ANM_Code: 'ANM0' + (coll == 0 ? 1 : coll + 1),
          ANM_Active: '1'
        },
        error => {
          if (error) {
            alert('เพิ่มข้อมูลไม่สำเร็จ')

            return false
            // The write failed...
          } else {
            alert('เพิ่มข้อมูลสำเร็จ')

            location.reload()
            // Data saved successfully!
            return false
          }
        }
      )
    }
  })

document
  .getElementById('saveservice')
  .addEventListener('click', function (event) {
    const animaltype = document.getElementById('servicetype').value

    if (animaltype == '') {
      alert('กรุณาระบุประเภทบริการ')
      return false
    } else {
      let coll = 0

      var postListRef = firebase.database().ref('service_type')
      postListRef.on('value', function (snapshot) {
        document.getElementById('table-servicetype').innerHTML = ''
        if (snapshot.numChildren() != undefined) {
          coll = snapshot.numChildren()
        }
      })
      var newPostRef = postListRef.push()
      newPostRef.set(
        {
          SV_ID: coll == 0 ? 1 : coll + 1,
          SV_Name: animaltype,
          SV_Code: 'SV0' + (coll == 0 ? 1 : coll + 1),
          SV_Active: '1'
        },
        error => {
          if (error) {
            console.log('เพิ่มข้อมูลไม่สำเร็จ')

            return false
            // The write failed...
          } else {
            alert('เพิ่มข้อมูลสำเร็จ')

            location.reload()
            // Data saved successfully!
            return false
          }
        }
      )
    }
  })




  
function delanimal(){
  console.log(document.querySelectorAll(".delanimal"))
  document.querySelectorAll(".delanimal").forEach(item => {
    item.addEventListener("click", function (event) {
      document.getElementById('table-animaltype').innerHTML = '';
      firebase.database().ref("animal_type").child(event.target.value).update({'ANM_Active': "0"}).then(() => {
        document.getElementById('table-animaltype').innerHTML = '';
          alert('อัพเดทสถานะสำเร็จ');
          selectAnimal()
              })
              .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
              })
      // firebase.database().ref("animal_type/"+event.target.value).update({
      //   ANM_Active : 0
      // }).then(() => {
      
      //   alert('อัพเดทสถานะสำเร็จ');
      //   selectAnimal()
      //       })
      //       .catch(error => {
      //         alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
      //       })
      // firebase.database().ref("animal_type/"+event.target.value).remove().then(() => {
      
      //   alert('อัพเดทสถานะสำเร็จ');
      //   selectAnimal()
      //       })
      //       .catch(error => {
      //         alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
      //       })
    });



});
}
function delservice(){
  document.querySelectorAll(".delservice").forEach(item => {
    item.addEventListener("click", function (event) {
      document.getElementById('table-servicetype').innerHTML = '';
      firebase.database().ref("service_type").child(event.target.value).update({'SV_Active': "0"}).then(() => {
        document.getElementById('table-servicetype').innerHTML = '';
          alert('อัพเดทสถานะสำเร็จ');
          selectService()
              })
              .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
              })
      // firebase.database().ref("animal_type/"+event.target.value).update({
      //   ANM_Active : 0
      // }).then(() => {
      
      //   alert('อัพเดทสถานะสำเร็จ');
      //   selectAnimal()
      //       })
      //       .catch(error => {
      //         alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
      //       })
      // firebase.database().ref("animal_type/"+event.target.value).remove().then(() => {
      
      //   alert('อัพเดทสถานะสำเร็จ');
      //   selectAnimal()
      //       })
      //       .catch(error => {
      //         alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
      //       })
    });



});
}