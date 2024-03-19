window.addEventListener('load', function () {
  selectAnimal()
})
// ========= Animal Type ==============================
document
  .getElementById('v-pills-pets-tab')
  .addEventListener('click', function (event) {
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
  function delanimal () {
    document.querySelectorAll('.delanimal').forEach(item => {
      item.addEventListener('click', function (event) {
        document.getElementById('table-animaltype').innerHTML = ''
        firebase
          .database()
          .ref('animal_type')
          .child(event.target.value)
          .update({ ANM_Active: '0' })
          .then(() => {
            document.getElementById('table-animaltype').innerHTML = ''
            alert('อัพเดทสถานะสำเร็จ')
            selectAnimal()
          })
          .catch(error => {
            alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
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
            document.getElementById('table-animaltype').innerHTML = ''
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
    document.getElementById('table-animaltype').style.display = 'none'
    if (animaltype == '') {
      alert('กรุณาระบุประเภทสัตว์')
      return false
    } else {
      document.getElementById('table-animaltype').style.display = 'none'
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
          document.getElementById('table-animaltype').style.display = 'none'
          alert('อัพเดทข้อมูลสำเร็จ')
  
          selectAnimal()
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
        })
    }
  
  }
// ========= End Animal Type ==============================

// ========= Service Type ==============================
document
  .getElementById('v-pills-service-tab')
  .addEventListener('click', function (event) {
    selectService()
  })
function selectService () {
  var postListRef = firebase.database().ref('service_type')
  var html = ''

  document.getElementById('table-servicetype').innerHTML = ''
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

</button></td> 
</tr>`
    })
    document.getElementById('table-servicetype').innerHTML = html
    delservice()
  })
}
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
function delservice () {
  document.querySelectorAll('.delservice').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('table-servicetype').innerHTML = ''
      firebase
        .database()
        .ref('service_type')
        .child(event.target.value)
        .update({ SV_Active: '0' })
        .then(() => {
          document.getElementById('table-servicetype').innerHTML = ''
          alert('อัพเดทสถานะสำเร็จ')
          selectService()
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
        })
    })
  })
}
// ========= And Service Type ==============================



