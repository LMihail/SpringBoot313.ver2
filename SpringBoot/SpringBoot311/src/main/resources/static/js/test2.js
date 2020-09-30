const requestUrl = 'http://localhost:8080/rest/admin/';

function reloadTable() {
    fetch(requestUrl).then(
        response => {
            response.json().then(
                data => {
                    let tabl = "";
                    data.forEach((user) => {
                        tabl += "<tr >";
                        tabl += "<td >" + user.id + "</td>";
                        tabl += "<td >" + user.name + "</td>";
                        tabl += "<td >" + user.lastName + "</td>";
                        tabl += "<td >" + user.age + "</td>";
                        tabl += "<td >" + user.email + "</td>";
                        let role = "";
                        $.each((user.roles), function (index, value) {
                            role += value.name + " "
                        })
                        tabl += "<td >" + role + "</td>"
                        tabl += "<td >" +
                            "    <a class='btn btn-info' role='button' onmouseover='fillEditModal(" + user.id + ")' data-toggle='modal' data-target='#editUser'>Edit</a>" +
                            "    <a class='btn btn-danger' role='button' onmouseover='fillDeleteModal(" + user.id + ")' data-toggle='modal' data-target='#deleteUser'>Delete</a>" +
                            "    </td>"
                        tabl += "</tr>";
                    })
                    $("#usersTableHere").empty();
                    $("#usersTableHere").append(tabl);
                }
            )

        }
    )
}

function fillEditModal(userId) {
    $.get(requestUrl + userId, function (userJSON) {
        $('#idToEditUser').val(userJSON.id);
        $('#nameToEditUser').val(userJSON.name);
        $('#lastNameToEditUser').val(userJSON.lastName);
        $('#ageToEditUser').val(userJSON.age);
        $('#emailToEditUser').val(userJSON.email);
        $('#passwordToEditUser').val(userJSON.password);
        if (userJSON.roles.length == 2) {
            $("#ROLE_USER").prop('checked', true);
            $("#ROLE_ADMIN").prop('checked', true);
        } else if (userJSON.roles.length == 1) {
            $("#ROLE_USER").prop('checked', true);
            $("#ROLE_ADMIN").prop('checked', false);
        } else {
            $("#ROLE_USER").prop('checked', false);
            $("#ROLE_ADMIN").prop('checked', false);
        }
    });
}

function fillDeleteModal(userId) {
    $.get(requestUrl + userId, function (userJSON) {
        $('#idToDeleteUser').val(userJSON.id);
        $('#nameToDeleteUser').val(userJSON.name);
        $('#lastNameToDeleteUser').val(userJSON.lastName);
        $('#ageToDeleteUser').val(userJSON.age);
        $('#emailToDeleteUser').val(userJSON.email);
        if (userJSON.roles.length == 2) {
            $("#Delete_ROLE_USER").prop('checked', true);
            $("#Delete_ROLE_ADMIN").prop('checked', true);
        } else if (userJSON.roles.length == 1) {
            $("#Delete_ROLE_USER").prop('checked', true);
            $("#Delete_ROLE_ADMIN").prop('checked', false);
        } else {
            $("#Delete_ROLE_USER").prop('checked', false);
            $("#Delete_ROLE_ADMIN").prop('checked', false);
        }
    });
}

$('#addSubmit').on("click", function () {
    let checked = [];
    $('input:checkbox:checked').each(function () {
        checked.push($(this).val());
    });

    let user = {
        name: $('#newName').val(),
        lastName: $("#newLastName").val(),
        age: $("#newAge").val(),
        email: $("#newEmail").val(),
        password: $("#newPassword").val(),
        role: $("#addRoles").val()
    };
    console.log(user);

    fetch(requestUrl, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user),
    });
    reloadTable();
    reloadTable()
});
$('#modalDeleteBtn').on("click", function () {
    fetch(requestUrl + $('#idToDeleteUser').val(), {
        method: "DELETE",
        credentials: 'same-origin',
    });
    reloadTable();
    reloadTable();
});
$('#modalEditBtn').on("click", function () {
    let checked = [];
    $('input:checkbox:checked').each(function () {
        checked.push($(this).val());
    });

    let user = {
        id: $('#idToEditUser').val(),
        name: $("#nameToEditUser").val(),
        lastName: $("#lastNameToEditUser").val(),
        age: $("#ageToEditUser").val(),
        email: $("#emailToEditUser").val(),
        password: $("#passwordToEditUser").val(),
        role: checked
    };
    fetch(requestUrl, {
        method: "PUT",
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    reloadTable();
    reloadTable();
});
reloadTable();