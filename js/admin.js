window.addEventListener('load', function () {
  selectAnimal()
})
// ========= Animal Type ==============================
document
  .getElementById('v-pills-pets-tab')
  .addEventListener('click', function (event) {
    document.getElementById('tb-animal').style.display =
    'inline-table';
    selectAnimal()
  })
  function selectAnimal () {
    var postListRef = firebase.database().ref('animal_type')
    var html = ''
    document.getElementById('updateanimal').style.display = 'none'
    document.getElementById('saveanimal').style.display = 'inline-block'

    document.getElementById('animaltype').value = ''

    document.getElementById('animalid').value = ''

    document.getElementById('animalcode').value = ''

    document.getElementById('animalactive').value = ''
    document.getElementById('animalkey').value = ''

    document.getElementById('table-animaltype').innerHTML = ''
    postListRef.on('value', function (snapshot) {
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
    <td> <button class="w-auto btn btn-danger btn-sm p-1 delanimal"
              type="button" value="${
                childSnapshot.key
              }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน
        
          </button>
          <button class="w-auto btn btn-warning btn-sm p-1 updateanimal"
              type="button" value="${
                childSnapshot.key
              }"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข
        
          </button></td> 
          
  </tr>`
      })
      document.getElementById('table-animaltype').style.display =
        'table-row-group'

      document.getElementById('table-animaltype').innerHTML = html
      delanimal()
      editanimal()
    })
  }
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
        document.getElementById('tb-animal').style.display = 'none';        if (snapshot.numChildren() != undefined) {
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
            document
            .getElementById('v-pills-pets-tab').click();
            return false
            // The write failed...
          } else {
            alert('เพิ่มข้อมูลสำเร็จ')

            document
            .getElementById('v-pills-pets-tab').click();
            // Data saved successfully!
            return false
          }
        }
      )
    }
  })
  function delanimal () {
    document.querySelectorAll('.delanimal').forEach(item => {
      item.addEventListener('click', function (event) {
        document.getElementById('tb-animal').style.display = 'none';
        firebase
          .database()
          .ref('animal_type')
          .child(event.target.value)
          .update({ ANM_Active: '0' })
          .then(() => {
            alert('อัพเดทสถานะสำเร็จ')
            document
            .getElementById('v-pills-pets-tab').click();
          })
          .catch(error => {
            alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
            document
            .getElementById('v-pills-pets-tab').click();
          })
       
      })
    })
  }
  function editanimal () {
    document.querySelectorAll('.updateanimal').forEach(item => {
      item.addEventListener('click', function (event) {
        document.getElementById('updateanimal').style.display = 'inline-block'
        document.getElementById('saveanimal').style.display = 'none'
        document.getElementById('animalkey').value = event.target.value
        firebase
          .database()
          .ref('animal_type')
          .child(event.target.value)
          .on('child_added', snapshot => {
            const newPost = snapshot.val()
            if (snapshot.key == 'ANM_Name') {
              document.getElementById('animaltype').value = newPost
            } else if (snapshot.key == 'ANM_ID') {
              document.getElementById('animalid').value = newPost
            } else if (snapshot.key == 'ANM_Code') {
              document.getElementById('animalcode').value = newPost
            } else if (snapshot.key == 'ANM_Active') {
              document.getElementById('animalactive').value = newPost
            }
          })
        document
          .getElementById('updateanimal')
          .addEventListener('click', function (event) {
            document.getElementById('tb-animal').style.display = 'none';
            updateanimal()
          })
       
      })
    })
  }
  function updateanimal () {
    const animaltype = document.getElementById('animaltype').value
    const animalid = document.getElementById('animalid').value
    const animalactive = document.getElementById('animalactive').value
    const animalcode = document.getElementById('animalcode').value
    const animalkey = document.getElementById('animalkey').value
    if (animaltype == '') {
      document.getElementById('tb-animal').style.display = 'inline-table';

      alert('กรุณาระบุประเภทสัตว์')
      return false
    } else {
      document.getElementById('tb-animal').style.display = 'none';
      firebase
        .database()
        .ref('animal_type')
        .child(animalkey)
        .update({
          ANM_ID: animalid,
          ANM_Name: animaltype,
          ANM_Code: animalcode,
          ANM_Active: animalactive
        })
        .then(() => {
          alert('อัพเดทข้อมูลสำเร็จ')
  
          document
          .getElementById('v-pills-pets-tab').click();
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
          document
          .getElementById('v-pills-pets-tab').click();

        })
    }
  
  }
// ========= End Animal Type ==============================

// ========= Service Type ==============================
document
  .getElementById('v-pills-service-tab')
  .addEventListener('click', function (event) {
     document.getElementById('tb-service').style.display =
     'inline-table';
    selectService()
  })
function selectService () {
  var postListRef = firebase.database().ref('service_type')
  var html = ''
  document.getElementById('updateservice').style.display = 'none';
  document.getElementById('saveservice').style.display = 'inline-block';

  document.getElementById('servicetype').value = '';

  document.getElementById('serviceid').value = '';

  document.getElementById('servicecode').value = '';

  document.getElementById('serviceactive').value = '';
  document.getElementById('servicekey').value = '';

  document.getElementById('table-servicetype').innerHTML = '';
  postListRef.on('value', function (snapshot) {
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
    type="button" value="${
      childSnapshot.key
    }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button>
<button class="w-auto btn btn-warning btn-sm p-1 updateservice"
type="button" value="${
  childSnapshot.key
}"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

</button>
</td> 
</tr>`
    })
    document.getElementById('table-servicetype').style.display =
    'table-row-group'
    document.getElementById('table-servicetype').innerHTML = html
    delservice();
    editservice()
  })
}
document
  .getElementById('saveservice')
  .addEventListener('click', function (event) {
    const servicetype = document.getElementById('servicetype').value

    if (servicetype == '') {
      alert('กรุณาระบุประเภทบริการ')
      return false
    } else {
      let coll = 0

      var postListRef = firebase.database().ref('service_type')
      postListRef.on('value', function (snapshot) {
        document.getElementById('tb-service').style.display = 'none';        if (snapshot.numChildren() != undefined) {
          coll = snapshot.numChildren()
        }
      })
      var newPostRef = postListRef.push()
      newPostRef.set(
        {
          SV_ID: coll == 0 ? 1 : coll + 1,
          SV_Name: servicetype,
          SV_Code: 'SV0' + (coll == 0 ? 1 : coll + 1),
          SV_Active: '1'
        },
        error => {
          if (error) {
            alert('เพิ่มข้อมูลไม่สำเร็จ')
            document
            .getElementById('v-pills-service-tab').click();
            return false
            // The write failed...
          } else {
            alert('เพิ่มข้อมูลสำเร็จ')

            document
            .getElementById('v-pills-service-tab').click();
            // Data saved successfully!
            return false
          }
        }
      )
    }
  })
function delservice () {
  document.querySelectorAll('.delservice').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('tb-service').style.display = 'none';
      firebase
        .database()
        .ref('service_type')
        .child(event.target.value)
        .update({ SV_Active: '0' })
        .then(() => {
          // document.getElementById('table-servicetype').style.display = 'none';
          // document.getElementById('table-servicetype').innerHTML = '';

           alert('อัพเดทสถานะสำเร็จ')
          document
          .getElementById('v-pills-service-tab').click();
         
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
          document
          .getElementById('v-pills-service-tab').click();
        })
      
        // document.getElementById('tb-service').style.display =
        // 'block'
    })
  })
}
function editservice () {
  document.querySelectorAll('.updateservice').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('updateservice').style.display = 'inline-block'
      document.getElementById('saveservice').style.display = 'none'
      document.getElementById('servicekey').value = event.target.value
      firebase
        .database()
        .ref('service_type')
        .child(event.target.value)
        .on('child_added', snapshot => {
          const newPost = snapshot.val()
          if (snapshot.key == 'SV_Name') {
            document.getElementById('servicetype').value = newPost
          } else if (snapshot.key == 'SV_ID') {
            document.getElementById('serviceid').value = newPost
          } else if (snapshot.key == 'SV_Code') {
            document.getElementById('servicecode').value = newPost
          } else if (snapshot.key == 'SV_Active') {
            document.getElementById('serviceactive').value = newPost
          }
        })
      document
        .getElementById('updateservice')
        .addEventListener('click', function (event) {
          document.getElementById('tb-service').style.display = 'none';
          updateservice()
        })
     
    })
  })
}
function updateservice () {
  const servicetype = document.getElementById('servicetype').value
  const serviceid = document.getElementById('serviceid').value
  const serviceactive = document.getElementById('serviceactive').value
  const servicecode = document.getElementById('servicecode').value
  const servicekey = document.getElementById('servicekey').value

  if (servicetype == '') {
    document.getElementById('tb-service').style.display = 'inline-table';

    alert('กรุณาระบุประเภทบริการ')
    return false
  } else {
    document.getElementById('tb-service').style.display = 'none';
    firebase
      .database()
      .ref('service_type')
      .child(servicekey)
      .update({
        SV_ID: serviceid,
        SV_Name: servicetype,
        SV_Code: servicecode,
        SV_Active: serviceactive
      })
      .then(() => {
        alert('อัพเดทข้อมูลสำเร็จ')

        document
          .getElementById('v-pills-service-tab').click();
      })
      .catch(error => {
        alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
        document
          .getElementById('v-pills-service-tab').click();
      })
  }

}
// ========= And Service Type ==============================



