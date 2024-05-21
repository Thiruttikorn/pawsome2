var arr
var obj
window.addEventListener('load', function () {
    document.getElementById('v-pills-booking-tab').click()
    selectBooking()
})

// ========= Animal Type ==============================
document
    .getElementById('v-pills-pets-tab')
    .addEventListener('click', function (event) {
        document.getElementById('tb-animal').style.display = 'inline-table'
        selectAnimal()
    })

function selectAnimal() {
    var postListRef = firebase.database().ref('animal_type')
    var html = ''
    document.getElementById('updateanimal').style.display = 'none'
    document.getElementById('saveanimal').style.display = 'inline-block'

    document.getElementById('animaltype').value = ''

    document.getElementById('animalid').value = ''

    document.getElementById('animalcode').value = ''

    document.getElementById('animalactive').value = ''
    document.getElementById('animalkey').value = ''
    document.getElementById(
        'table-animaltype'
    ).innerHTML = `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
  </td></tr>`
    // document.getElementById('table-animaltype').innerHTML = ''
    postListRef
        .orderByChild('ANM_Active')
        .equalTo('1')
        .on('value', function (snapshot) {
            if (snapshot.exists()) {
                let i = 0
                snapshot.forEach(function (childSnapshot) {
                    const data = childSnapshot.val()
                    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${data.ANM_Name}</td>
    <td>${data.ANM_Code}</td>
    <td>
    ${data.ANM_Active == '1'
                            ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
    ปกติ`
                            : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
    ไม่ใช้งาน`
                        }</td>
  <td> <button class="w-auto btn btn-danger btn-sm p-1 delanimal"
            type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน
      
        </button>
        <button class="w-auto btn btn-warning btn-sm p-1 updateanimal"
            type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข
      
        </button></td> 
        
</tr>`
                    i++
                })
                document.getElementById('table-animaltype').style.display =
                    'table-row-group'

                document.getElementById('table-animaltype').innerHTML = html
                delanimal()
                editanimal()
            } else {
                document.getElementById(
                    'table-animaltype'
                ).innerHTML = `<tr class="bg-light"><td colspan="5" class="text-center bg-white"> ไม่พบข้อมูล
  </td></tr>`
            }
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
                document.getElementById('tb-animal').style.display = 'none'
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
                        document.getElementById('v-pills-pets-tab').click()
                        return false
                        // The write failed...
                    } else {
                        alert('เพิ่มข้อมูลสำเร็จ')

                        document.getElementById('v-pills-pets-tab').click()
                        // Data saved successfully!
                        return false
                    }
                }
            )
        }
    })

function delanimal() {
    document.querySelectorAll('.delanimal').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('tb-animal').style.display = 'none'
            firebase
                .database()
                .ref('animal_type')
                .child(event.target.value)
                .update({
                    ANM_Active: '0'
                })
                .then(() => {
                    alert('อัพเดทสถานะสำเร็จ')
                    document.getElementById('v-pills-pets-tab').click()
                })
                .catch(error => {
                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                    document.getElementById('v-pills-pets-tab').click()
                })
        })
    })
}

function editanimal() {
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
                    document.getElementById('tb-animal').style.display = 'none'
                    updateanimal()
                })
        })
    })
}

function updateanimal() {
    const animaltype = document.getElementById('animaltype').value
    const animalid = document.getElementById('animalid').value
    const animalactive = document.getElementById('animalactive').value
    const animalcode = document.getElementById('animalcode').value
    const animalkey = document.getElementById('animalkey').value
    if (animaltype == '') {
        document.getElementById('tb-animal').style.display = 'inline-table'

        alert('กรุณาระบุประเภทสัตว์')
        return false
    } else {
        document.getElementById('tb-animal').style.display = 'none'
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

                document.getElementById('v-pills-pets-tab').click()
            })
            .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                document.getElementById('v-pills-pets-tab').click()
            })
    }
}
// ========= End Animal Type ==============================

// ========= Service Type ==============================
document
    .getElementById('v-pills-service-tab')
    .addEventListener('click', function (event) {
        document.getElementById('tb-service').style.display = 'inline-table'
        selectService()
    })

function selectService() {
    var postListRef = firebase.database().ref('service_type')
    var html = ''
    document.getElementById('updateservice').style.display = 'none'
    document.getElementById('saveservice').style.display = 'inline-block'

    document.getElementById('servicetype').value = ''

    document.getElementById('serviceid').value = ''

    document.getElementById('servicecode').value = ''

    document.getElementById('serviceactive').value = ''
    document.getElementById('servicekey').value = ''

    document.getElementById(
        'table-servicetype'
    ).innerHTML = `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
</td></tr>`
    postListRef
        .orderByChild('SV_Active')
        .equalTo('1')
        .on('value', function (snapshot) {
            if (snapshot.exists()) {
                let i = 0
                snapshot.forEach(function (childSnapshot) {
                    const data = childSnapshot.val()

                    html += `<tr>
  <th scope="row">${i + 1}</th>
  <td>${data.SV_Name}</td>
  <td>${data.SV_Code}</td>
  <td>
  ${data.SV_Active == '1'
                            ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
  ปกติ`
                            : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
  ไม่ใช้งาน`
                        }</td>
  <td> <button class="w-auto btn btn-secondary btn-sm p-1 delservice"
  type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button>
<button class="w-auto btn btn-warning btn-sm p-1 updateservice"
type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

</button>
</td> 
</tr>`
                    i++
                })
                document.getElementById('table-servicetype').style.display =
                    'table-row-group'
                document.getElementById('table-servicetype').innerHTML = html
                delservice()
                editservice()
            } else {
                document.getElementById(
                    'table-servicetype'
                ).innerHTML = `<tr class="bg-light"><td colspan="6" class="text-center bg-white"> ไม่พบข้อมูล
    </td></tr>`
            }
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
                document.getElementById('tb-service').style.display = 'none'
                if (snapshot.numChildren() != undefined) {
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
                        document.getElementById('v-pills-service-tab').click()
                        return false
                        // The write failed...
                    } else {
                        alert('เพิ่มข้อมูลสำเร็จ')

                        document.getElementById('v-pills-service-tab').click()
                        // Data saved successfully!
                        return false
                    }
                }
            )
        }
    })

function delservice() {
    document.querySelectorAll('.delservice').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('tb-service').style.display = 'none'
            firebase
                .database()
                .ref('service_type')
                .child(event.target.value)
                .update({
                    SV_Active: '0'
                })
                .then(() => {
                    // document.getElementById('table-servicetype').style.display = 'none';
                    // document.getElementById('table-servicetype').innerHTML = '';

                    alert('อัพเดทสถานะสำเร็จ')
                    document.getElementById('v-pills-service-tab').click()
                })
                .catch(error => {
                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                    document.getElementById('v-pills-service-tab').click()
                })

            // document.getElementById('tb-service').style.display =
            // 'block'
        })
    })
}

function editservice() {
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
                    document.getElementById('tb-service').style.display = 'none'
                    updateservice()
                })
        })
    })
}

function updateservice() {
    const servicetype = document.getElementById('servicetype').value
    const serviceid = document.getElementById('serviceid').value
    const serviceactive = document.getElementById('serviceactive').value
    const servicecode = document.getElementById('servicecode').value
    const servicekey = document.getElementById('servicekey').value

    if (servicetype == '') {
        document.getElementById('tb-service').style.display = 'inline-table'

        alert('กรุณาระบุประเภทบริการ')
        return false
    } else {
        document.getElementById('tb-service').style.display = 'none'
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

                document.getElementById('v-pills-service-tab').click()
            })
            .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                document.getElementById('v-pills-service-tab').click()
            })
    }
}
// ========= And Service Type ==============================

// ========= FUR Type ==============================
document
    .getElementById('v-pills-fur-tab')
    .addEventListener('click', function (event) {
        document.getElementById('tb-fur').style.display = 'inline-table'
        selectFur()
    })

function selectFur() {
    var postListRef = firebase.database().ref('fur_type')
    var html = ''
    document.getElementById('updatefur').style.display = 'none'
    document.getElementById('savefur').style.display = 'inline-block'

    document.getElementById('furtype').value = ''

    document.getElementById('furid').value = ''

    document.getElementById('furcode').value = ''

    document.getElementById('furactive').value = ''
    document.getElementById('furkey').value = ''

    document.getElementById(
        'table-furtype'
    ).innerHTML = `<tr class="bg-light"><td colspan="5" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
</td></tr>`
    postListRef
        .orderByChild('FUR_Active')
        .equalTo('1')
        .on('value', function (snapshot) {
            if (snapshot.exists()) {
                let i = 0
                snapshot.forEach(function (childSnapshot) {
                    const data = childSnapshot.val()

                    html += `<tr>
  <th scope="row">${i + 1}</th>
  <td>${data.FUR_Name}</td>
  <td>${data.FUR_Code}</td>
  <td>
  ${data.FUR_Active == '1'
                            ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
  ปกติ`
                            : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
  ไม่ใช้งาน`
                        }</td>
  <td> <button class="w-auto btn btn-secondary btn-sm p-1 delfur"
  type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button>
<button class="w-auto btn btn-warning btn-sm p-1 updatefur"
type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

</button>
</td> 
</tr>`
                    i++
                })
                document.getElementById('table-furtype').style.display =
                    'table-row-group'
                document.getElementById('table-furtype').innerHTML = html
                delfur()
                editfur()
            } else {
                document.getElementById(
                    'table-furtype'
                ).innerHTML = `<tr class="bg-light"><td colspan="5" class="text-center bg-white"> ไม่พบข้อมูล
  </td></tr>`
            }
        })
}
document.getElementById('savefur').addEventListener('click', function (event) {
    const furtype = document.getElementById('furtype').value

    if (furtype == '') {
        alert('กรุณาระบุประเภทขน')
        return false
    } else {
        let coll = 0

        var postListRef = firebase.database().ref('fur_type')
        postListRef.on('value', function (snapshot) {
            document.getElementById('tb-fur').style.display = 'none'
            if (snapshot.numChildren() != undefined) {
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
                    document.getElementById('v-pills-fur-tab').click()
                    return false
                    // The write failed...
                } else {
                    alert('เพิ่มข้อมูลสำเร็จ')

                    document.getElementById('v-pills-fur-tab').click()
                    // Data saved successfully!
                    return false
                }
            }
        )
    }
})

function delfur() {
    document.querySelectorAll('.delfur').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('tb-fur').style.display = 'none'
            firebase
                .database()
                .ref('fur_type')
                .child(event.target.value)
                .update({
                    FUR_Active: '0'
                })
                .then(() => {
                    alert('อัพเดทสถานะสำเร็จ')
                    document.getElementById('v-pills-fur-tab').click()
                })
                .catch(error => {
                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                    document.getElementById('v-pills-fur-tab').click()
                })
        })
    })
}

function editfur() {
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
                    document.getElementById('tb-fur').style.display = 'none'
                    updatefur()
                })
        })
    })
}

function updatefur() {
    const furtype = document.getElementById('furtype').value
    const furid = document.getElementById('furid').value
    const furactive = document.getElementById('furactive').value
    const furcode = document.getElementById('furcode').value
    const furkey = document.getElementById('furkey').value

    if (furtype == '') {
        document.getElementById('tb-fur').style.display = 'inline-table'

        alert('กรุณาระบุประเภทขน')
        return false
    } else {
        document.getElementById('tb-fur').style.display = 'none'
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

                document.getElementById('v-pills-fur-tab').click()
            })
            .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                document.getElementById('v-pills-fur-tab').click()
            })
    }
}
// ========= And fur Type ==============================

// ========= Pets Size  ==============================
document
    .getElementById('v-pills-size-tab')
    .addEventListener('click', function (event) {
        document.getElementById('tb-size').style.display = 'inline-table'
        selectSize()
    })

function selectSize() {
    var postListRef = firebase.database().ref('pets_size')
    var html = ''
    document.getElementById('updatesize').style.display = 'none'
    document.getElementById('savesize').style.display = 'inline-block'

    document.getElementById('size').value = ''
    document.getElementById('weight').value = ''

    document.getElementById('sizeid').value = ''

    document.getElementById('sizecode').value = ''

    document.getElementById('sizeactive').value = ''
    document.getElementById('sizekey').value = ''

    document.getElementById(
        'table-size'
    ).innerHTML = `<tr class="bg-light"><td colspan="6" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
</td></tr>`
    postListRef
        .orderByChild('PZ_Active')
        .equalTo('1')
        .on('value', function (snapshot) {
            if (snapshot.exists()) {
                let i = 0
                snapshot.forEach(function (childSnapshot) {
                    const data = childSnapshot.val()

                    html += `<tr>
      <th scope="row">${i + 1}</th>
      <td>${data.PZ_Name}</td>
      <td>${data.PZ_Detail}</td>
      <td>${data.PZ_Code}</td>
      <td>
      ${data.PZ_Active == '1'
                            ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
      ปกติ`
                            : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
      ไม่ใช้งาน`
                        }</td>
      <td> <button class="w-auto btn btn-secondary btn-sm p-1 delsize"
      type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

      </button>
      <button class="w-auto btn btn-warning btn-sm p-1 updatesize"
      type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

      </button>
      </td> 
      </tr>`
                    i++
                })
                document.getElementById('table-size').style.display = 'table-row-group'
                document.getElementById('table-size').innerHTML = html
                delsize()
                editsize()
            } else {
                document.getElementById(
                    'table-size'
                ).innerHTML = `<tr class="bg-light"><td colspan="6" class="text-center bg-white"> ไม่พบข้อมูล
    </td></tr>`
            }
        })
}
document.getElementById('savesize').addEventListener('click', function (event) {
    const size = document.getElementById('size').value
    const weight = document.getElementById('weight').value

    if (size == '') {
        alert('กรุณาระบุขนาดสัตว์เลี้ยง')
        return false
    } else if (weight == '') {
        alert('กรุณาระบุน้ำหนักสัตว์เลี้ยง')
        return false
    } else {
        let coll = 0

        var postListRef = firebase.database().ref('pets_size')
        postListRef.on('value', function (snapshot) {
            document.getElementById('tb-size').style.display = 'none'
            if (snapshot.numChildren() != undefined) {
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
                    document.getElementById('v-pills-size-tab').click()
                    return false
                    // The write failed...
                } else {
                    alert('เพิ่มข้อมูลสำเร็จ')

                    document.getElementById('v-pills-size-tab').click()
                    // Data saved successfully!
                    return false
                }
            }
        )
    }
})

function delsize() {
    document.querySelectorAll('.delsize').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('tb-size').style.display = 'none'
            firebase
                .database()
                .ref('pets_size')
                .child(event.target.value)
                .update({
                    PZ_Active: '0'
                })
                .then(() => {
                    alert('อัพเดทสถานะสำเร็จ')
                    document.getElementById('v-pills-size-tab').click()
                })
                .catch(error => {
                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                    document.getElementById('v-pills-size-tab').click()
                })
        })
    })
}

function editsize() {
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
                    } else if (snapshot.key == 'PZ_Detail') {
                        document.getElementById('weight').value = newPost
                    } else if (snapshot.key == 'PZ_ID') {
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
                    document.getElementById('tb-size').style.display = 'none'
                    updatesize()
                })
        })
    })
}

function updatesize() {
    const size = document.getElementById('size').value
    const weight = document.getElementById('weight').value

    const sizeid = document.getElementById('sizeid').value
    const sizeactive = document.getElementById('sizeactive').value
    const sizecode = document.getElementById('sizecode').value
    const sizekey = document.getElementById('sizekey').value

    if (size == '') {
        document.getElementById('tb-size').style.display = 'inline-table'

        alert('กรุณาระบุขนาดสัตว์เลี้ยง')
        return false
    } else if (weight == '') {
        document.getElementById('tb-size').style.display = 'inline-table'

        alert('กรุณาระบุน้ำหนักสัตว์เลี้ยง')
        return false
    } else {
        document.getElementById('tb-size').style.display = 'none'
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

                document.getElementById('v-pills-size-tab').click()
            })
            .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                document.getElementById('v-pills-size-tab').click()
            })
    }
}
// ========= And Size animal ==============================

// ========= Price Service ==============================
document
    .getElementById('v-pills-price-tab')
    .addEventListener('click', function (event) {
        selectOption('service', '')
        selectOption('animal', '')
        selectOption('fur', '')
        selectOption('size', '')
        document.getElementById('tb-price').style.display = 'inline-table'
        selectPrice()
    })

function selectPrice() {
    var postListRef = firebase.database().ref('service_price')
    var html = ''
    document.getElementById('updateprice').style.display = 'none'
    document.getElementById('saveprice').style.display = 'inline-block'

    document.getElementById('price').value = ''
    document.getElementById('priceid').value = ''

    document.getElementById('pricecode').value = ''

    document.getElementById('priceactive').value = ''

    document.getElementById('pricekey').value = ''

    document.getElementById(
        'table-price'
    ).innerHTML = `<tr class="bg-light"><td colspan="8" class="text-center bg-white">    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105"></iconify-icon>
  </td></tr>`
    postListRef
        .orderByChild('SP_ACTIVE')
        .equalTo('1')
        .on('value', function (snapshot) {
            if (snapshot.exists()) {
                let i = 0
                snapshot.forEach(function (childSnapshot) {
                    const data = childSnapshot.val()
                    console.log(data)
                    html += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${getTextInOption('p_service', data.SP_SV_ID)}</td>
    <td>${getTextInOption('p_animal', data.SP_ANM_ID)}</td>
    <td>${getTextInOption('p_fur', data.SP_FUR_ID)}</td>
    <td>${getTextInOption('p_size', data.SP_PZ_ID)}</td>
    <td>${data.SP_PRICE}</td>
    <td>
    ${data.SP_ACTIVE == '1'
                            ? `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: greenyellow;"></iconify-icon>
    ปกติ`
                            : `<iconify-icon icon="ic:baseline-fiber-manual-record" style="color: red;"></iconify-icon>
    ไม่ใช้งาน`
                        }</td>
    <td> <button class="w-auto btn btn-secondary btn-sm p-1 delprice"
    type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> ไม่ใช้งาน

</button>
<button class="w-auto btn btn-warning btn-sm p-1 updateprice"
type="button" value="${childSnapshot.key
                        }"><iconify-icon icon="mdi:edit-outline"></iconify-icon> แก้ไข

</button>
</td> 
</tr>`
                    i++
                })
                document.getElementById('table-price').style.display = 'table-row-group'
                document.getElementById('table-price').innerHTML = html
                delprice()
                editprice()
            } else {
                document.getElementById(
                    'table-price'
                ).innerHTML = `<tr class="bg-light"><td colspan="8" class="text-center bg-white"> ไม่พบข้อมูล
      </td></tr>`
            }
        })
}

document
    .getElementById('saveprice')
    .addEventListener('click', function (event) {
        const p_service = document.getElementById('p_service').value
        const p_animal = document.getElementById('p_animal').value
        const p_fur = document.getElementById('p_fur').value
        const p_size = document.getElementById('p_size').value
        const price = document.getElementById('price').value
        if (p_service == '') {
            alert('กรุณาเลือกประเภทบริการ')
            return false
        } else if (p_animal == '') {
            alert('กรุณาเลือกประเภทสัตว์')
            return false
        } else if (p_fur == '') {
            alert('กรุณาเลือกประเภทขน')
            return false
        } else if (p_size == '') {
            alert('กรุณาเลือกขนาดสัตว์เลี้ยง')
            return false
        } else if (price == '') {
            alert('กรุณากรอกราคาค่าบริการ')
            return false
        } else {
            let coll = 0

            var postListRef = firebase.database().ref('service_price')
            postListRef.on('value', function (snapshot) {
                document.getElementById('tb-price').style.display = 'none'
                if (snapshot.numChildren() != undefined) {
                    coll = snapshot.numChildren()
                }
            })
            var newPostRef = postListRef.push()
            newPostRef.set(
                {
                    SP_ID: coll == 0 ? 1 : coll + 1,
                    SP_CODE: 'SP0' + (coll == 0 ? 1 : coll + 1),
                    SP_SV_ID: p_service,
                    SP_ANM_ID: p_animal,
                    SP_FUR_ID: p_fur,
                    SP_PZ_ID: p_size,
                    SP_PRICE: price,
                    SP_ACTIVE: '1'
                },
                error => {
                    if (error) {
                        alert('เพิ่มข้อมูลไม่สำเร็จ')
                        document.getElementById('v-pills-price-tab').click()
                        return false
                        // The write failed...
                    } else {
                        alert('เพิ่มข้อมูลสำเร็จ')

                        document.getElementById('v-pills-price-tab').click()
                        // Data saved successfully!
                        return false
                    }
                }
            )
        }
    })

function editprice() {
    document.querySelectorAll('.updateprice').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('updateprice').style.display = 'inline-block'
            document.getElementById('saveprice').style.display = 'none'
            document.getElementById('pricekey').value = event.target.value
            firebase
                .database()
                .ref('service_price')
                .child(event.target.value)
                .on('child_added', snapshot => {
                    const newPost = snapshot.val()
                    if (snapshot.key == 'SP_ANM_ID') {
                        document.getElementById('p_animal').value = newPost
                    } else if (snapshot.key == 'SP_CODE') {
                        document.getElementById('pricecode').value = newPost
                    } else if (snapshot.key == 'SP_ACTIVE') {
                        document.getElementById('priceactive').value = newPost
                    } else if (snapshot.key == 'SP_FUR_ID') {
                        document.getElementById('p_fur').value = newPost
                    } else if (snapshot.key == 'SP_ID') {
                        document.getElementById('priceid').value = newPost
                    } else if (snapshot.key == 'SP_PZ_ID') {
                        document.getElementById('p_size').value = newPost
                    } else if (snapshot.key == 'SP_PRICE') {
                        document.getElementById('price').value = newPost
                    } else if (snapshot.key == 'SP_SV_ID') {
                        document.getElementById('p_service').value = newPost
                    }
                })
            document
                .getElementById('updateprice')
                .addEventListener('click', function (event) {
                    document.getElementById('tb-price').style.display = 'none'
                    updateprice()
                })
        })
    })
}

function updateprice() {
    const p_service = document.getElementById('p_service').value
    const p_animal = document.getElementById('p_animal').value
    const p_fur = document.getElementById('p_fur').value
    const p_size = document.getElementById('p_size').value
    const price = document.getElementById('price').value
    const pricekey = document.getElementById('pricekey').value
    const priceid = document.getElementById('priceid').value
    const pricecode = document.getElementById('pricecode').value
    const priceactive = document.getElementById('priceactive').value
    if (p_service == '') {
        alert('กรุณาเลือกประเภทบริการ')
        return false
    } else if (p_animal == '') {
        alert('กรุณาเลือกประเภทสัตว์')
        return false
    } else if (p_fur == '') {
        alert('กรุณาเลือกประเภทขน')
        return false
    } else if (p_size == '') {
        alert('กรุณาเลือกขนาดสัตว์เลี้ยง')
        return false
    } else if (price == '') {
        alert('กรุณากรอกราคาค่าบริการ')
        return false
    } else {
        document.getElementById('tb-price').style.display = 'none'
        firebase
            .database()
            .ref('service_price')
            .child(pricekey)
            .update({
                SP_ID: priceid,
                SP_CODE: pricecode,
                SP_SV_ID: p_service,
                SP_ANM_ID: p_animal,
                SP_FUR_ID: p_fur,
                SP_PZ_ID: p_size,
                SP_PRICE: price,
                SP_ACTIVE: priceactive
            })
            .then(() => {
                alert('อัพเดทข้อมูลสำเร็จ')

                document.getElementById('v-pills-price-tab').click()
            })
            .catch(error => {
                alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                document.getElementById('v-pills-price-tab').click()
            })
    }
}

function delprice() {
    document.querySelectorAll('.delprice').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('tb-price').style.display = 'none'
            firebase
                .database()
                .ref('service_price')
                .child(event.target.value)
                .update({
                    SP_ACTIVE: '0'
                })
                .then(() => {
                    alert('อัพเดทสถานะสำเร็จ')
                    document.getElementById('v-pills-price-tab').click()
                })
                .catch(error => {
                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                    document.getElementById('v-pills-price-tab').click()
                })
        })
    })
}

// ========= Booking  ==============================
document
    .getElementById('v-pills-booking-tab')
    .addEventListener('click', function (event) {
        selectOption('service', '_booking')
        // selectOption('animal','_booking')
        // selectOption('fur','_booking')
        // selectOption('size','_booking')
        document.getElementById('tb-booking').style.display = 'inline-table'
        selectBooking()
        const e = new Event('change')
        const element = document.querySelector('#booking_update_active')
        element.dispatchEvent(e)
        document.getElementById('booking_update_active').selectedIndex = '1'
    })

function selectBooking() {
    var postListRef = firebase.database().ref('booking').orderByChild('BOOKGING_DATE')
    var html = ''
    // document.getElementById('updatebooking').style.display = 'none'
    document.getElementById('savebooking').style.display = 'inline-block'

    document.getElementById(
        'table-booking'
    ).innerHTML = `<tr class="bg-light"><td colspan="10" class="text-center bg-white">
  <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105">
  </iconify-icon>
  </td></tr>`
    postListRef.on('value', function (snapshot) {
        if (snapshot.exists()) {
            let i = 0
            arr = []
            obj = {}

            snapshot.forEach(function (childSnapshot) {
                i++
                const data = childSnapshot.val()
                let objectDate = new Date(data.BOOKGING_DATE)
                let day = objectDate.getDate()
                let month = objectDate.getMonth() + 1
                let year = objectDate.getFullYear()
                if (day < 10) {
                    day = '0' + day
                }

                if (month < 10) {
                    month = `0${month}`
                }

                arr[i] = {
                    booking_key: childSnapshot.key,
                    booking_id: data.BOOKGING_ID,
                    booking_code: data.BOOKGING_CODE,
                    booking_anmid: data.BOOKGING_ANM_ID,
                    booking_cusname: data.BOOKGING_CUSOMER_NAME,
                    booking_custel: data.BOOKGING_CUSOMER_TEL,
                    booking_svid: data.BOOKGING_SV_ID,
                    booking_date: `${year}-${month}-${day}`,
                    booking_time: data.BOOKGING_TIME,
                    booking_pet: data.BOOKGING_PETS_NAME,
                    booking_fur: data.BOOKGING_FUR_ID,
                    booking_size: data.BOOKGING_PZ_ID,
                    booking_price: data.BOOKGING_PRICE,
                    booking_active: data.BOOKGING_Active,
                    booking_payment: data.Payment_Active
                }

                html += `<tr>
                    <td scope="row">${i}</td>
                    <td>${data.BOOKGING_CUSOMER_NAME}</td>
                    <td>${data.BOOKGING_CUSOMER_TEL}</td>
                    <td>${getTextInOption('p_service_booking', data.BOOKGING_SV_ID)}</td>
                    <td>${day}/${month}/${year}</td>
                    <td>${data.BOOKGING_TIME}</td>
                    <td>${data.BOOKGING_PETS_NAME}</td>
                    <td>${numberWithCommas(data.BOOKGING_PRICE)}</td>
                    
                    <td class="text-center"><button class="w-auto btn btn-secondary btn-sm p-1 setbookingdetail" value="${childSnapshot.key
                                    }" 
                    type="button" ><iconify-icon icon="mdi:clipboard-list-outline" style="color:yellow"></iconify-icon>

                </button></td>
                ${data.BOOKGING_Active != '0' && data.BOOKGING_Active != '2'
                                        ? `<td>  <button class="w-auto btn btn-secondary btn-sm p-1 cancelbooking"
                type="button" value="${childSnapshot.key}"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> 

                </button>
                </td> `
                                        : ''
                                    } 
                </tr>`
                if (data.BOOKGING_Active == '0' || data.BOOKGING_Active == '2') {
                    document.getElementById('cellcancel').style.display = 'none'
                } else {
                    document.getElementById('cellcancel').style.display = 'block'
                }
            })
            document.getElementById('table-booking').style.display = 'table-row-group'
            document.getElementById('table-booking').innerHTML = html
            cancelbooking()
            eventdetail()

            // editbooking()
        } else {
            document.getElementById(
                'table-booking'
            ).innerHTML = `<tr class="bg-light"><td colspan="10" class="text-center bg-white"> ไม่พบข้อมูล
    </td></tr>`
        }
    })
}

document
    .getElementById('p_service_booking')
    .addEventListener('change', function (event) {
        document.getElementById('savebooking').disabled = true
        document.getElementById('booking_price').value = ''
        document.getElementById('div-showprice').style.display = 'none'
        document.getElementById('txt-price').innerHTML = ''
        document.getElementById('booking_date').value = ''
        document.getElementById('booking_time').value = ''

        if (event.target.value != '') {
            document.getElementById('booking_date').disabled = false
            document.getElementById('booking_time').disabled = true

            firebase
                .database()
                .ref('service_price')
                .orderByChild('SP_SV_ID')
                .equalTo(event.target.value)
                .on('value', function (snapshot) {
                    let values = []
                    snapshot.forEach(function (childSnapshot) {
                        const data = childSnapshot.val()
                        // if(data.SP_ACTIVE == '1' && data.SP_ANM_ID == 'ANM02' && data.SP_FUR_ID == 'FUR04' && data.SP_PZ_ID == 'PZ05'){
                        //   console.log(data.SP_PRICE)
                        // }
                        if (data.SP_ACTIVE == '1') {
                            if (values.indexOf(data.SP_ANM_ID) === -1) {
                                values.push(data.SP_ANM_ID)
                            }
                        }
                    })
                    var html = ''
                    html += `<option value="">กรุณาเลือก</option>`
                    values.forEach(value => {
                        firebase
                            .database()
                            .ref('animal_type')
                            .orderByChild('ANM_Code')
                            .equalTo(value)
                            .on('value', function (snapshotd) {
                                snapshotd.forEach(function (childSnapshot3) {
                                    const data2 = childSnapshot3.val()
                                    html += `<option value="${data2.ANM_Code}">${data2.ANM_Name}</option>`
                                })
                                document.getElementById(`p_animal_booking`).innerHTML = html
                                if (
                                    document
                                        .getElementById(`p_animal_booking`)
                                        .classList.contains('bg-readonly')
                                ) {
                                    document
                                        .getElementById(`p_animal_booking`)
                                        .classList.remove('bg-readonly')
                                }
                            })
                    })
                })
        } else {
            document.getElementById('booking_date').disabled = true
            document.getElementById('booking_time').disabled = true

            document.getElementById(
                `p_animal_booking`
            ).innerHTML = `<option value="">กรุณาเลือก</option>`
            if (
                !document
                    .getElementById(`p_animal_booking`)
                    .classList.contains('bg-readonly')
            ) {
                document.getElementById(`p_animal_booking`).classList.add('bg-readonly')
            }

            document.getElementById('div-showprice').style.display = 'none'
            document.getElementById('txt-price').innerHTML = ''
        }
        document.getElementById(
            `p_fur_booking`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        if (
            !document
                .getElementById(`p_fur_booking`)
                .classList.contains('bg-readonly')
        ) {
            document.getElementById(`p_fur_booking`).classList.add('bg-readonly')
        }
        document.getElementById(
            `p_size_booking`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        if (
            !document
                .getElementById(`p_size_booking`)
                .classList.contains('bg-readonly')
        ) {
            document.getElementById(`p_size_booking`).classList.add('bg-readonly')
        }
    })

document
    .getElementById('booking_date')
    .addEventListener('change', function (event) {
        document.getElementById('booking_time').value = ''

        if (event.target.value != '') {
            document.getElementById('booking_time').disabled = false
        } else {
            document.getElementById('booking_time').disabled = true
        }
    })
document
    .getElementById('booking_time')
    .addEventListener('change', function (event) {
        var postListRef = firebase.database().ref('booking')
        let servicebooking = document.getElementById('p_service_booking').value
        let datebooking = document.getElementById('booking_date').value
        document.getElementById('savebooking').disabled = true
        document.getElementById('booking_price').value = ''
        document.getElementById('div-showprice').style.display = 'none'
        document.getElementById('txt-price').innerHTML = ''
        document.getElementById('text-errortime').style.display = 'none'
        if (event.target.value != '') {
            postListRef
                .orderByChild('BOOKGING_SV_ID')
                .equalTo(servicebooking)
                .on('value', function (snapshot) {
                    console.log(snapshot)
                    if (snapshot.exists()) {
                        snapshot.forEach(function (childSnapshot) {
                            const data = childSnapshot.val()
                            let objectDate = new Date(datebooking)
                            let day = objectDate.getDate()
                            let month = objectDate.getMonth() + 1
                            let year = objectDate.getFullYear()
                            if (day < 10) {
                                day = '0' + day
                            }

                            if (month < 10) {
                                month = `0${month}`
                            }

                            if (
                                data.BOOKGING_TIME == event.target.value &&
                                data.BOOKGING_DATE == `${year}-${month}-${day}` &&
                                data.BOOKGING_Active == 1
                            ) {
                                document.getElementById('booking_time').value = ''
                                document.getElementById('div-showprice').style.display = 'none'
                                document.getElementById('text-errortime').style.display =
                                    'block'
                                return
                            }
                        })
                    } else {
                    }
                })
        }
    })

function eventdetail() {
    selectOption('fur', '')
    selectOption('size', '')
    document.querySelectorAll('.setbookingdetail').forEach(item => {
        item.addEventListener('click', function (event) {
            if (event.target.value != '') {
                arr.forEach(item2 => {
                    if (item2.booking_key === event.target.value) {
                        let objectDate = new Date(item2.booking_date)
                        let day = objectDate.getDate()
                        let month = objectDate.getMonth() + 1
                        let year = objectDate.getFullYear()
                        if (day < 10) {
                            day = '0' + day
                        }

                        if (month < 10) {
                            month = `0${month}`
                        }
                        console.log(item2)
                        let html = ''
                        html += `<ul class="list-group fontth">`
                        html += `<input type="hidden" id="input_bookingid" value="${item2.booking_id}">`
                        html += `<input type="hidden" id="input_bookingcode" value="${item2.booking_code}">`
                        html += `<input type="hidden" id="input_bookinganmid" value="${item2.booking_anmid}">`
                        html += `<input type="hidden" id="input_bookingcusname" value="${item2.booking_cusname}"><li class="list-group-item d-flex justify-content-between align-items-center">
          ชื่อลูกค้า<span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${item2.booking_cusname}</span></li>`

                        html += `<input type="hidden" id="input_bookingcustel" value="${item2.booking_custel}"><li class="list-group-item d-flex justify-content-between align-items-center">
            เบอร์โทรติดต่อ<span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${item2.booking_custel}</span></li>`

                        html += `<input type="hidden" id="input_bookingsvid" value="${item2.booking_svid
                            }"><li class="list-group-item d-flex justify-content-between align-items-center">
            บริการที่จอง<span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${getTextInOption(
                                'p_service_booking',
                                item2.booking_svid
                            )}</span></li>`

                        html += `<input type="hidden" id="input_bookingdate" value="${item2.booking_date}"><li class="list-group-item d-flex justify-content-between align-items-center">
            วันที่จอง <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${day}/${month}/${year}</span></li>`

                        html += `<input type="hidden" id="input_bookingtime" value="${item2.booking_time}"><li class="list-group-item d-flex justify-content-between align-items-center">
            เวลาที่จอง <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${item2.booking_time}</span></li>`

                        html += `<input type="hidden" id="input_bookingpetname" value="${item2.booking_pet}"><li class="list-group-item d-flex justify-content-between align-items-center">
            ชื่อสัตว์เลี้ยง <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${item2.booking_pet}</span></li>`

                        html += `<input type="hidden" id="input_bookingfurid" value="${item2.booking_fur
                            }"><li class="list-group-item d-flex justify-content-between align-items-center">
            ประเภทขน <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${getTextInOption(
                                'p_fur',
                                item2.booking_fur
                            )}</span></li>`

                        html += `<input type="hidden" id="input_bookingpzid" value="${item2.booking_size
                            }"><li class="list-group-item d-flex justify-content-between align-items-center">
            น้ำหนักสัตว์เลี้ยง <span class="badge text-primary   rounded-pill p-2" style="font-size:14px">${getTextInOption(
                                'p_size',
                                item2.booking_size
                            )}</span></li>`

                        html += `<input type="hidden" id="input_bookingprice" value="${item2.booking_price
                            }"><li class="list-group-item d-flex justify-content-between align-items-center">
            ราคาค่าบริการ <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">${numberWithCommas(
                                item2.booking_price
                            )}</span></li>`

                        html += `<li class="list-group-item d-flex justify-content-between align-items-center">
            สถานะการจอง <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">
            <select class="form-select mt-0" id="p_booking_active" name="p_booking_active">
                              <option value="0"${item2.booking_active == '0' ? 'selected' : ''
                            }>ยกเลิก</option>
                              <option value="1"${item2.booking_active == '1' ? 'selected' : ''
                            }>รอให้บริการ</option>
                              <option value="2"${item2.booking_active == '2' ? 'selected' : ''
                            }>ให้บริการเสร็จสิ้น</option>
                              </select>
           </span></li>`

                        html += `<li class="list-group-item d-flex justify-content-between align-items-center">
            สถานะการชำระเงิน <span class="badge text-primary  rounded-pill p-2" style="font-size:14px">
            <select class="form-select mt-0" id="p_payment_active" name="p_payment_active">
                              <option value="0"${item2.booking_payment == '0' ? 'selected' : ''
                            }>ยังไม่ชำระ</option>
                              <option value="1"${item2.booking_payment == '1' ? 'selected' : ''
                            }>ชำระเงินแล้ว</option>
                          </select>
                          </span></li>`
                        html += `  </ul>`
                        document.getElementById('detailbook').innerHTML =
                            html +
                            `<p class="text-end mt-2 mb-0" style="float: right;">
                    <button type="button"
                    class="btn btn-warning fontth d-block p-1 ps-4 pe-4 updatebook" value="${event.target.value}">อัพเดทข้อมูล
                    </button></p>`
                    }
                })

                $('#detailbooking').modal('show')
                if (document.querySelectorAll('.updatebook').length > 0) {
                    document
                        .querySelector('.updatebook')
                        .addEventListener('click', function (event) {
                            let payment = document.getElementById('p_payment_active').value
                            let active = document.getElementById('p_booking_active').value
                            let bookid = document.getElementById('input_bookingid').value
                            let bookcode = document.getElementById('input_bookingcode').value
                            let booksvid = document.getElementById('input_bookingsvid').value
                            let bookanmid =
                                document.getElementById('input_bookinganmid').value
                            let bookfurid =
                                document.getElementById('input_bookingfurid').value
                            let bookpzid = document.getElementById('input_bookingpzid').value
                            let bookcusname = document.getElementById(
                                'input_bookingcusname'
                            ).value
                            let bookcustel = document.getElementById(
                                'input_bookingcustel'
                            ).value
                            let bookdate = document.getElementById('input_bookingdate').value
                            let booktime = document.getElementById('input_bookingtime').value
                            let bookpets = document.getElementById(
                                'input_bookingpetname'
                            ).value
                            let bookprice =
                                document.getElementById('input_bookingprice').value

                            firebase
                                .database()
                                .ref('booking')
                                .child(event.target.value)
                                .update({
                                    BOOKGING_ID: bookid,
                                    BOOKGING_CODE: bookcode,
                                    BOOKGING_SV_ID: booksvid,
                                    BOOKGING_ANM_ID: bookanmid,
                                    BOOKGING_FUR_ID: bookfurid,
                                    BOOKGING_PZ_ID: bookpzid,
                                    BOOKGING_CUSOMER_NAME: bookcusname,
                                    BOOKGING_CUSOMER_TEL: bookcustel,
                                    BOOKGING_DATE: bookdate,
                                    BOOKGING_TIME: booktime,
                                    BOOKGING_PETS_NAME: bookpets,
                                    BOOKGING_PRICE: bookprice,
                                    BOOKGING_Active: active,
                                    Payment_Active: payment
                                })
                                .then(() => {
                                    alert('อัพเดทข้อมูลสำเร็จ')
                                    $('#detailbooking').modal('hide')
                                    document.getElementById('v-pills-booking-tab').click()
                                    const e = new Event('change')
                                    const element = document.querySelector(
                                        '#booking_update_active'
                                    )
                                    element.dispatchEvent(e)
                                    document.getElementById(
                                        'booking_update_active'
                                    ).selectedIndex = '1'
                                })
                                .catch(error => {
                                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                                    $('#detailbooking').modal('hide')
                                    document.getElementById('v-pills-booking-tab').click()
                                    const e = new Event('change')
                                    const element = document.querySelector(
                                        '#booking_update_active'
                                    )
                                    element.dispatchEvent(e)
                                    document.getElementById(
                                        'booking_update_active'
                                    ).selectedIndex = '1'
                                })
                        })
                }
            }
        })
    })
}

document
    .getElementById('p_animal_booking')
    .addEventListener('change', function (event) {
        document.getElementById('savebooking').disabled = true
        document.getElementById('booking_price').value = ''
        document.getElementById('div-showprice').style.display = 'none'
        document.getElementById('txt-price').innerHTML = ''
        if (event.target.value != '') {
            firebase
                .database()
                .ref('service_price')
                .orderByChild('SP_ANM_ID')
                .equalTo(event.target.value)
                .on('value', function (snapshot) {
                    let values = []
                    snapshot.forEach(function (childSnapshot) {
                        const data = childSnapshot.val()
                        // if(data.SP_ACTIVE == '1' && data.SP_ANM_ID == 'ANM02' && data.SP_FUR_ID == 'FUR04' && data.SP_PZ_ID == 'PZ05'){
                        //   console.log(data.SP_PRICE)
                        // }
                        if (data.SP_ACTIVE == '1') {
                            if (values.indexOf(data.SP_FUR_ID) === -1) {
                                values.push(data.SP_FUR_ID)
                            }
                        }
                    })
                    var html = ''
                    html += `<option value="">กรุณาเลือก</option>`
                    values.forEach(value => {
                        firebase
                            .database()
                            .ref('fur_type')
                            .orderByChild('FUR_Code')
                            .equalTo(value)
                            .on('value', function (snapshotd) {
                                snapshotd.forEach(function (childSnapshot3) {
                                    const data2 = childSnapshot3.val()
                                    html += `<option value="${data2.FUR_Code}">${data2.FUR_Name}</option>`
                                })
                                document.getElementById(`p_fur_booking`).innerHTML = html
                                if (
                                    document
                                        .getElementById(`p_fur_booking`)
                                        .classList.contains('bg-readonly')
                                ) {
                                    document
                                        .getElementById(`p_fur_booking`)
                                        .classList.remove('bg-readonly')
                                }
                            })
                    })
                })
        } else {
            document.getElementById(
                `p_fur_booking`
            ).innerHTML = `<option value="">กรุณาเลือก</option>`
            if (
                !document
                    .getElementById(`p_fur_booking`)
                    .classList.contains('bg-readonly')
            ) {
                document.getElementById(`p_fur_booking`).classList.add('bg-readonly')
            }

            document.getElementById('div-showprice').style.display = 'none'
            document.getElementById('txt-price').innerHTML = ''
        }
        document.getElementById(
            `p_size_booking`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        if (
            !document
                .getElementById(`p_size_booking`)
                .classList.contains('bg-readonly')
        ) {
            document.getElementById(`p_size_booking`).classList.add('bg-readonly')
        }
    })

document
    .getElementById('p_fur_booking')
    .addEventListener('change', function (event) {
        document.getElementById('savebooking').disabled = true
        document.getElementById('booking_price').value = ''
        document.getElementById('div-showprice').style.display = 'none'
        document.getElementById('txt-price').innerHTML = ''
        if (event.target.value != '') {
            firebase
                .database()
                .ref('service_price')
                .orderByChild('SP_FUR_ID')
                .equalTo(event.target.value)
                .on('value', function (snapshot) {
                    let values = []
                    snapshot.forEach(function (childSnapshot) {
                        const data = childSnapshot.val()
                        // if(data.SP_ACTIVE == '1' && data.SP_ANM_ID == 'ANM02' && data.SP_FUR_ID == 'FUR04' && data.SP_PZ_ID == 'PZ05'){
                        //   console.log(data.SP_PRICE)
                        // }
                        if (data.SP_ACTIVE == '1') {
                            if (values.indexOf(data.SP_PZ_ID) === -1) {
                                values.push(data.SP_PZ_ID)
                            }
                        }
                    })
                    var html = ''
                    html += `<option value="">กรุณาเลือก</option>`
                    values.forEach(value => {
                        firebase
                            .database()
                            .ref('pets_size')
                            .orderByChild('PZ_Code')
                            .equalTo(value)
                            .on('value', function (snapshotd) {
                                snapshotd.forEach(function (childSnapshot3) {
                                    const data2 = childSnapshot3.val()
                                    html += `<option value="${data2.PZ_Code}">${data2.PZ_Detail}</option>`
                                })
                                document.getElementById(`p_size_booking`).innerHTML = html
                                if (
                                    document
                                        .getElementById(`p_size_booking`)
                                        .classList.contains('bg-readonly')
                                ) {
                                    document
                                        .getElementById(`p_size_booking`)
                                        .classList.remove('bg-readonly')
                                }
                            })
                    })
                })
        } else {
            document.getElementById(
                `p_size_booking`
            ).innerHTML = `<option value="">กรุณาเลือก</option>`
            if (
                !document
                    .getElementById(`p_size_booking`)
                    .classList.contains('bg-readonly')
            ) {
                document.getElementById(`p_size_booking`).classList.add('bg-readonly')
            }
            document.getElementById('div-showprice').style.display = 'none'
            document.getElementById('txt-price').innerHTML = ''
        }
    })
document
    .getElementById('calbooking')
    .addEventListener('click', function (event) {
        const p_service = document.getElementById('p_service_booking').value
        const p_animal = document.getElementById('p_animal_booking').value
        const p_fur = document.getElementById('p_fur_booking').value
        const p_size = document.getElementById('p_size_booking').value
        document.getElementById('div-showprice').style.display = 'none'
        document.getElementById('txt-price').innerHTML = ''
        document.getElementById('booking_price').value = ''

        if (p_service == '') {
            alert('กรุณาเลือกบริการที่ต้องการจอง')
            return false
        } else if (p_animal == '') {
            alert('กรุณาเลือกประเภทสัตว์')
            return false
        } else if (p_fur == '') {
            alert('กรุณาเลือกประเภทขน')
            return false
        } else if (p_size == '') {
            alert('กรุณาเลือกขนาดสัตว์เลี้ยง')
            return false
        } else {
            document.getElementById('savebooking').disabled = false
            firebase
                .database()
                .ref('service_price')
                .on('value', function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        const data = childSnapshot.val()
                        if (
                            data.SP_ACTIVE == '1' &&
                            data.SP_ANM_ID == p_animal &&
                            data.SP_FUR_ID == p_fur &&
                            data.SP_PZ_ID == p_size &&
                            data.SP_SV_ID == p_service
                        ) {
                            console.log(data.SP_PRICE)
                            document.getElementById('div-showprice').style.display = 'block'
                            document.getElementById('txt-price').innerHTML = data.SP_PRICE
                            document.getElementById('booking_price').value = data.SP_PRICE
                        }
                    })
                })
        }
    })

document
    .getElementById('savebooking')
    .addEventListener('click', function (event) {
        const name_customer = document.getElementById('name_customer').value
        const tel_customer = document.getElementById('tel_customer').value
        const booking_date = document.getElementById('booking_date').value
        const booking_time = document.getElementById('booking_time').value
        const pets_name = document.getElementById('pets_name').value
        const p_service = document.getElementById('p_service_booking').value
        const p_animal = document.getElementById('p_animal_booking').value
        const p_fur = document.getElementById('p_fur_booking').value
        const p_size = document.getElementById('p_size_booking').value
        const booking_price = document.getElementById('booking_price').value
        if (name_customer == '') {
            alert('กรุณากรอกชื่อลูกค้า')
            return false
        } else if (tel_customer == '') {
            alert('กรุณากรอกเบอร์โทรลูกค้า')
            return false
        } else if (booking_date == '') {
            alert('กรุณาเลือกวันที่ต้องการจอง')
            return false
        } else if (booking_time == '') {
            alert('กรุณาเลือกเวลาที่ต้องการจอง')
            return false
        } else if (pets_name == '') {
            alert('กรุณากรอกชื่อสัตว์เลี้ยง')
            return false
        } else if (p_service == '') {
            alert('กรุณาเลือกบริการที่ต้องการจอง')
            return false
        } else if (p_animal == '') {
            alert('กรุณาเลือกประเภทสัตว์')
            return false
        } else if (p_fur == '') {
            alert('กรุณาเลือกประเภทขน')
            return false
        } else if (p_size == '') {
            alert('กรุณาเลือกขนาดสัตว์เลี้ยง')
            return false
        } else {
            document.getElementById('calbooking').click()
            let coll = 0

            var postListRef = firebase.database().ref('booking')
            postListRef.on('value', function (snapshot) {
                document.getElementById('tb-booking').style.display = 'none'
                if (snapshot.numChildren() != undefined) {
                    coll = snapshot.numChildren()
                }
            })
            var newPostRef = postListRef.push()
            newPostRef.set(
                {
                    BOOKGING_ID: coll == 0 ? 1 : coll + 1,
                    BOOKGING_CODE: 'BOOK0' + (coll == 0 ? 1 : coll + 1),
                    BOOKGING_SV_ID: p_service,
                    BOOKGING_ANM_ID: p_animal,
                    BOOKGING_FUR_ID: p_fur,
                    BOOKGING_PZ_ID: p_size,
                    BOOKGING_CUSOMER_NAME: name_customer,
                    BOOKGING_CUSOMER_TEL: tel_customer,
                    BOOKGING_DATE: booking_date,
                    BOOKGING_TIME: booking_time,
                    BOOKGING_PETS_NAME: pets_name,
                    BOOKGING_PRICE: booking_price,
                    BOOKGING_Active: '1',
                    Payment_Active: '0'
                },
                error => {
                    if (error) {
                        alert('จองบริการไม่สำเร็จ')
                        location.reload()
                        return false
                        // The write failed...
                    } else {
                        alert('จองบริการสำเร็จ')
                        document.getElementById('div-showprice').style.display = 'none'
                        location.reload() // Data saved successfully!
                        return false
                    }
                }
            )
        }
    })

document
    .getElementById('booking_update_active')
    .addEventListener('change', function (event) {
        if (event.target.value != '') {
            if (event.target.value == '0') {
                document.getElementById('cellcancel').style.display = 'none'
            } else {
                document.getElementById('cellcancel').style.display = 'block'
            }
            var postListRef = firebase.database().ref('booking')
            var html = ''
            // document.getElementById('updatebooking').style.display = 'none'
            document.getElementById('savebooking').style.display = 'inline-block'


            document.getElementById(
                'table-booking'
            ).innerHTML = `<tr class="bg-light"><td colspan="10" class="text-center bg-white">
    <iconify-icon icon="svg-spinners:blocks-shuffle-3" width="48" height="48"  style="color: #574105">
    </iconify-icon>
    </td></tr>`

            postListRef
                .orderByChild('BOOKGING_Active')
                .equalTo(event.target.value)
                .on('value', function (snapshot) {
                    console.log(snapshot)
                    if (snapshot.exists()) {
                        let i = 0
                        snapshot.forEach(function (childSnapshot) {
                            i++
                            const data = childSnapshot.val()
                            let objectDate = new Date(data.BOOKGING_DATE)
                            let day = objectDate.getDate()
                            let month = objectDate.getMonth() + 1
                            let year = objectDate.getFullYear()
                            if (day < 10) {
                                day = '0' + day
                            }

                            if (month < 10) {
                                month = `0${month}`
                            }
                            html += `<tr>
          <td scope="row">${i}</td>
          <td>${data.BOOKGING_CUSOMER_NAME}</td>
          <td>${data.BOOKGING_CUSOMER_TEL}</td>
          <td>${getTextInOption('p_service_booking', data.BOOKGING_SV_ID)}</td>
          <td>${day}/${month}/${year}</td>
          <td>${data.BOOKGING_TIME}</td>
          <td>${data.BOOKGING_PETS_NAME}</td>
          <td>${numberWithCommas(data.BOOKGING_PRICE)}</td>
          
          <td class="text-center"><button class="w-auto btn btn-secondary btn-sm p-1 setbookingdetail" value="${childSnapshot.key
                                }"
          type="button"><iconify-icon icon="mdi:clipboard-list-outline"   style="color: yellow"></iconify-icon>
      
      </button></td>
      ${data.BOOKGING_Active != '0' && data.BOOKGING_Active != '2'
                                    ? `<td>  <button class="w-auto btn btn-secondary btn-sm p-1 cancelbooking"
      type="button" value="${childSnapshot.key}"><iconify-icon icon="mdi:trash-can-outline"></iconify-icon> 
  
        </button>
        </td> `
                                    : ''
                                }
            </tr>`
                            if (data.BOOKGING_Active == '0' || data.BOOKGING_Active == '2') {
                                document.getElementById('cellcancel').style.display = 'none'
                            } else {
                                document.getElementById('cellcancel').style.display = 'block'
                            }
                        })
                        document.getElementById('table-booking').style.display =
                            'table-row-group'
                        document.getElementById('table-booking').innerHTML = html

                        cancelbooking()
                        eventdetail()
                    } else {
                        document.getElementById(
                            'table-booking'
                        ).innerHTML = `<tr class="bg-light"><td colspan="10" class="text-center bg-white"> ไม่พบข้อมูล
          </td></tr>`
                    }
                })
        }
    })

function cancelbooking() {
    document.querySelectorAll('.cancelbooking').forEach(item => {
        item.addEventListener('click', function (event) {
            document.getElementById('tb-booking').style.display = 'none'
            firebase
                .database()
                .ref('booking')
                .child(event.target.value)
                .update({
                    BOOKGING_Active: '0'
                })
                .then(() => {
                    alert('ยกเลิกการจองสำเร็จ')
                    document.getElementById('v-pills-booking-tab').click()
                })
                .catch(error => {
                    alert('เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่')
                    document.getElementById('v-pills-booking-tab').click()
                })
        })
    })
}

function selectOption(type, id) {
    if (type == 'service') {
        var postListRef = firebase.database().ref('service_type')
        var html = ''
        document.getElementById(
            `p_service${id}`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        postListRef.on('value', function (snapshot) {
            html += `<option value="">กรุณาเลือก</option>`

            snapshot.forEach(function (childSnapshot) {
                const data = childSnapshot.val()
                if (data.SV_Active == '1') {
                    html += `<option value="${data.SV_Code}">${data.SV_Name}</option>`
                }
            })

            document.getElementById(`p_service${id}`).innerHTML = html
        })
    } else if (type == 'animal') {
        var postListRef = firebase.database().ref('animal_type')
        var html = ''
        document.getElementById(
            `p_animal${id}`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        postListRef.on('value', function (snapshot) {
            html += `<option value="">กรุณาเลือก</option>`

            snapshot.forEach(function (childSnapshot) {
                const data = childSnapshot.val()
                if (data.ANM_Active == '1') {
                    html += `<option value="${data.ANM_Code}">${data.ANM_Name}</option>`
                }
            })

            document.getElementById(`p_animal${id}`).innerHTML = html
        })
    } else if (type == 'fur') {
        var postListRef = firebase.database().ref('fur_type')
        var html = ''
        document.getElementById(
            `p_fur${id}`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        postListRef.on('value', function (snapshot) {
            html += `<option value="">กรุณาเลือก</option>`

            snapshot.forEach(function (childSnapshot) {
                const data = childSnapshot.val()
                if (data.FUR_Active == '1') {
                    html += `<option value="${data.FUR_Code}">${data.FUR_Name}</option>`
                }
            })

            document.getElementById(`p_fur${id}`).innerHTML = html
        })
    } else if (type == 'size') {
        var postListRef = firebase.database().ref('pets_size')
        var html = ''
        document.getElementById(
            `p_size${id}`
        ).innerHTML = `<option value="">กรุณาเลือก</option>`
        postListRef.on('value', function (snapshot) {
            html += `<option value="">กรุณาเลือก</option>`

            snapshot.forEach(function (childSnapshot) {
                const data = childSnapshot.val()
                if (data.PZ_Active == '1') {
                    html += `<option value="${data.PZ_Code}">${data.PZ_Name} (${data.PZ_Detail})</option>`
                }
            })

            document.getElementById(`p_size${id}`).innerHTML = html
        })
    }
}

function getTextInOption(id, value) {
    return document.querySelector(`#${id} option[value=${value}]`).innerText
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
