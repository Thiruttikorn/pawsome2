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
    document.getElementById('table-animaltype').innerHTML = `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
    </td></tr>`;
    // document.getElementById('table-animaltype').innerHTML = ''
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

  document.getElementById('table-servicetype').innerHTML =  `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
  </td></tr>`;
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


// ========= FUR Type ==============================
document
  .getElementById('v-pills-fur-tab')
  .addEventListener('click', function (event) {
     document.getElementById('tb-fur').style.display =
     'inline-table';
    selectFur()
  })
function selectFur () {
  var postListRef = firebase.database().ref('fur_type')
  var html = ''
  document.getElementById('updatefur').style.display = 'none';
  document.getElementById('savefur').style.display = 'inline-block';

  document.getElementById('furtype').value = '';

  document.getElementById('furid').value = '';

  document.getElementById('furcode').value = '';

  document.getElementById('furactive').value = '';
  document.getElementById('furkey').value = '';

  document.getElementById('table-furtype').innerHTML =  `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
  </td></tr>`;
  postListRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const data = childSnapshot.val()

      html += `<tr>
    <th scope="row">${data.FUR_ID}</th>
    <td>${data.FUR_Name}</td>
    <td>${data.FUR_Code}</td>
    <td>
    ${
      data.FUR_Active == '1'
        ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
    ปกติ`
        : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
    ไม่ใช้งาน`
    }</td>
    <td> <button class="w-auto btn btn-secondary btn-sm p-1 delfur"
    type="button" value="${
      childSnapshot.key
    }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button>
<button class="w-auto btn btn-warning btn-sm p-1 updatefur"
type="button" value="${
  childSnapshot.key
}"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

</button>
</td> 
</tr>`
    })
    document.getElementById('table-furtype').style.display =
    'table-row-group'
    document.getElementById('table-furtype').innerHTML = html
    delfur();
    editfur()
  })
}
document
  .getElementById('savefur')
  .addEventListener('click', function (event) {
    const furtype = document.getElementById('furtype').value

    if (furtype == '') {
      alert('กรุณาระบุประเภทขน')
      return false
    } else {
      let coll = 0

      var postListRef = firebase.database().ref('fur_type')
      postListRef.on('value', function (snapshot) {
        document.getElementById('tb-fur').style.display = 'none';        if (snapshot.numChildren() != undefined) {
          coll = snapshot.numChildren()
        }
      })
      var newPostRef = postListRef.push()
      newPostRef.set(
        {
          FUR_ID: coll == 0 ? 1 : coll + 1,
          FUR_Name: furtype,
          FUR_Code: 'FUR0' + (coll == 0 ? 1 : coll + 1),
          FUR_Active: '1'
        },
        error => {
          if (error) {
            alert('เพิ่มข้อมูลไม่สำเร็จ')
            document
            .getElementById('v-pills-fur-tab').click();
            return false
            // The write failed...
          } else {
            alert('เพิ่มข้อมูลสำเร็จ')

            document
            .getElementById('v-pills-fur-tab').click();
            // Data saved successfully!
            return false
          }
        }
      )
    }
  })
function delfur () {
  document.querySelectorAll('.delfur').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('tb-fur').style.display = 'none';
      firebase
        .database()
        .ref('fur_type')
        .child(event.target.value)
        .update({ FUR_Active: '0' })
        .then(() => {
           alert('อัพเดทสถานะสำเร็จ')
          document
          .getElementById('v-pills-fur-tab').click();
         
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
          document
          .getElementById('v-pills-fur-tab').click();
        })
      
    })
  })
}
function editfur () {
  document.querySelectorAll('.updatefur').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('updatefur').style.display = 'inline-block'
      document.getElementById('savefur').style.display = 'none'
      document.getElementById('furkey').value = event.target.value
      firebase
        .database()
        .ref('fur_type')
        .child(event.target.value)
        .on('child_added', snapshot => {
          const newPost = snapshot.val()
          if (snapshot.key == 'FUR_Name') {
            document.getElementById('furtype').value = newPost
          } else if (snapshot.key == 'FUR_ID') {
            document.getElementById('furid').value = newPost
          } else if (snapshot.key == 'FUR_Code') {
            document.getElementById('furcode').value = newPost
          } else if (snapshot.key == 'FUR_Active') {
            document.getElementById('furactive').value = newPost
          }
        })
      document
        .getElementById('updatefur')
        .addEventListener('click', function (event) {
          document.getElementById('tb-fur').style.display = 'none';
          updatefur()
        })
     
    })
  })
}
function updatefur () {
  const furtype = document.getElementById('furtype').value
  const furid = document.getElementById('furid').value
  const furactive = document.getElementById('furactive').value
  const furcode = document.getElementById('furcode').value
  const furkey = document.getElementById('furkey').value

  if (furtype == '') {
    document.getElementById('tb-fur').style.display = 'inline-table';

    alert('กรุณาระบุประเภทขน')
    return false
  } else {
    document.getElementById('tb-fur').style.display = 'none';
    firebase
      .database()
      .ref('fur_type')
      .child(furkey)
      .update({
        FUR_ID: furid,
        FUR_Name: furtype,
        FUR_Code: furcode,
        FUR_Active: furactive
      })
      .then(() => {
        alert('อัพเดทข้อมูลสำเร็จ')

        document
          .getElementById('v-pills-fur-tab').click();
      })
      .catch(error => {
        alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
        document
          .getElementById('v-pills-fur-tab').click();
      })
  }

}
// ========= And fur Type ==============================


// ========= Pets Size  ==============================
document
  .getElementById('v-pills-size-tab')
  .addEventListener('click', function (event) {
     document.getElementById('tb-size').style.display =
     'inline-table';
    selectSize()
  })
function selectSize () {
  var postListRef = firebase.database().ref('pets_size')
  var html = ''
  document.getElementById('updatesize').style.display = 'none';
  document.getElementById('savesize').style.display = 'inline-block';

  document.getElementById('size').value = '';
  document.getElementById('weight').value = '';

  document.getElementById('sizeid').value = '';

  document.getElementById('sizecode').value = '';

  document.getElementById('sizeactive').value = '';
  document.getElementById('sizekey').value = '';

  document.getElementById('table-size').innerHTML =  `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
  </td></tr>`;
  postListRef.on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const data = childSnapshot.val()

      html += `<tr>
    <th scope="row">${data.PZ_ID}</th>
    <td>${data.PZ_Name}</td>
    <td>${data.PZ_Detail}</td>
    <td>${data.PZ_Code}</td>
    <td>
    ${
      data.PZ_Active == '1'
        ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
    ปกติ`
        : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
    ไม่ใช้งาน`
    }</td>
    <td> <button class="w-auto btn btn-secondary btn-sm p-1 delsize"
    type="button" value="${
      childSnapshot.key
    }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button>
<button class="w-auto btn btn-warning btn-sm p-1 updatesize"
type="button" value="${
  childSnapshot.key
}"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

</button>
</td> 
</tr>`
    })
    document.getElementById('table-size').style.display =
    'table-row-group'
    document.getElementById('table-size').innerHTML = html
    delsize();
    editsize()
  })
}
document
  .getElementById('savesize')
  .addEventListener('click', function (event) {
    const size = document.getElementById('size').value
    const weight = document.getElementById('weight').value

    if (size == '') {
      alert('กรุณาระบุขนาดสัตว์เลี้ยง')
      return false
    }
    else if (weight == '') {
      alert('กรุณาระบุน้ำหนักสัตว์เลี้ยง')
      return false
    } 
     else {
      let coll = 0

      var postListRef = firebase.database().ref('pets_size')
      postListRef.on('value', function (snapshot) {
        document.getElementById('tb-size').style.display = 'none';        if (snapshot.numChildren() != undefined) {
          coll = snapshot.numChildren()
        }
      })
      var newPostRef = postListRef.push()
      newPostRef.set(
        {
          PZ_ID: coll == 0 ? 1 : coll + 1,
          PZ_Name: size,
          PZ_Detail: weight,
          PZ_Code: 'PZ0' + (coll == 0 ? 1 : coll + 1),
          PZ_Active: '1'
        },
        error => {
          if (error) {
            alert('เพิ่มข้อมูลไม่สำเร็จ')
            document
            .getElementById('v-pills-size-tab').click();
            return false
            // The write failed...
          } else {
            alert('เพิ่มข้อมูลสำเร็จ')

            document
            .getElementById('v-pills-size-tab').click();
            // Data saved successfully!
            return false
          }
        }
      )
    }
  })
function delsize () {
  document.querySelectorAll('.delsize').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('tb-size').style.display = 'none';
      firebase
        .database()
        .ref('pets_size')
        .child(event.target.value)
        .update({ PZ_Active: '0' })
        .then(() => {
           alert('อัพเดทสถานะสำเร็จ')
          document
          .getElementById('v-pills-size-tab').click();
         
        })
        .catch(error => {
          alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
          document
          .getElementById('v-pills-size-tab').click();
        })
      
    })
  })
}
function editsize () {
  document.querySelectorAll('.updatesize').forEach(item => {
    item.addEventListener('click', function (event) {
      document.getElementById('updatesize').style.display = 'inline-block'
      document.getElementById('savesize').style.display = 'none'
      document.getElementById('sizekey').value = event.target.value
      firebase
        .database()
        .ref('pets_size')
        .child(event.target.value)
        .on('child_added', snapshot => {
          const newPost = snapshot.val()
          if (snapshot.key == 'PZ_Name') {
            document.getElementById('size').value = newPost
          }
          else if (snapshot.key == 'PZ_Detail') {
            document.getElementById('weight').value = newPost
          }
           else if (snapshot.key == 'PZ_ID') {
            document.getElementById('sizeid').value = newPost
          } else if (snapshot.key == 'PZ_Code') {
            document.getElementById('sizecode').value = newPost
          } else if (snapshot.key == 'PZ_Active') {
            document.getElementById('sizeactive').value = newPost
          }
        })
      document
        .getElementById('updatesize')
        .addEventListener('click', function (event) {
          document.getElementById('tb-size').style.display = 'none';
          updatesize()
        })
     
    })
  })
}
function updatesize () {
  const size = document.getElementById('size').value
  const weight = document.getElementById('weight').value

  const sizeid = document.getElementById('sizeid').value
  const sizeactive = document.getElementById('sizeactive').value
  const sizecode = document.getElementById('sizecode').value
  const sizekey = document.getElementById('sizekey').value

  if (size == '') {
    document.getElementById('tb-size').style.display = 'inline-table';

    alert('กรุณาระบุขนาดสัตว์เลี้ยง')
    return false
  } 
  else if (weight == '') {
    document.getElementById('tb-size').style.display = 'inline-table';

    alert('กรุณาระบุน้ำหนักสัตว์เลี้ยง')
    return false
  }
  else {
    document.getElementById('tb-size').style.display = 'none';
    firebase
      .database()
      .ref('pets_size')
      .child(sizekey)
      .update({
        PZ_ID: sizeid,
        PZ_Name: size,
        PZ_Detail: weight,
        PZ_Code: sizecode,
        PZ_Active: sizeactive
      })
      .then(() => {
        alert('อัพเดทข้อมูลสำเร็จ')

        document
          .getElementById('v-pills-size-tab').click();
      })
      .catch(error => {
        alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่');
        document
          .getElementById('v-pills-size-tab').click();
      })
  }

}
// ========= And Size animal ==============================
