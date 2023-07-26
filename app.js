//form
function validateForm(){
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;
    
    if (name == "") {
        alert('El Nombre es requerido');
        return false;
    
    }

   if (email == "") {
        alert('El correo es requerido');
        return false;
    }   else if(!email.includes('@')){
        alert('El correo no es valido');
    }

    if (phone == "") {
        alert('El Telefono es requerido');
        return false;
    
    }
    
    return true;
}

//read
function readData() {

    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    var html = "";

    listPeople.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>"+ element.name + "</td>";
        html += "<td>"+ element.email + "</td>";
        html += "<td>"+ element.phone + "</td>";
        html += '<td><button onclick="deleData('+ index +')" class="btn btn-danger">Eliminar</button><button onclick="editData('+ index +')" class="btn btn-warning">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData tbody').innerHTML = html;
}

document.onload = readData();

function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById('inputName').value;
        let email = document.getElementById('inputEmail').value;
        let phone = document.getElementById('inputPhone').value;
        
        var listPeople;

        if (localStorage.getItem('listPeople') == null) {
            listPeople = [];
        }else{
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            name: name,
            email: email,
            phone: phone
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        readData();

        document.getElementById('inputName').value= "";
        document.getElementById('inputEmail').value= "";
        document.getElementById('inputPhone').value= "";
    }
}

function deleData(index){

    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    readData();
}

function editData(index) {
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listPeople;

    if (localStorage.getItem('listPeople') == null) {
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    document.querySelector('#btnUpdate').onclick = function () {
        if (validateForm() == true) {
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            readData();

            document.getElementById('inputName').value = "";
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputPhone').value = "";

            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        }
    }

}

const saveLocal = () => {
    localStorage.setItem('listPeople', JSON.stringify(listPeople));
}