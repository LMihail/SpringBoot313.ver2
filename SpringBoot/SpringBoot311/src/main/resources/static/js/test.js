// const option = $("<option></option>");
// const tr = $("<tr></tr>");
// const td = $("<td></td>");
// const select = $("<select disabled></select>").attr("name", "roleIds");
// const buttonGlobal = $("<button type='button' data-toggle='modal'></button>");
// let buttonEditUser;
// let buttonDeleteUser;
// let allUsers;
// let tbody = $("#users");
// // let addLogin = $("#addLogin");
// // let addPassword = $("#addPassword");
// // let addEmail = $("#addEmail");
// // let addRoles = $("#addRoles");
//
// let addName = $("#addName");
// let addLastName = $("#addLastName");
// let addPassword = $("#addPassword");
// let addAge = $("#addAge");
// let addEmail = $("#addEmail");
// let addRoles = $("#addRoles");
//
// $(document).ready(function () {
//
//     $.ajax("/rest", {
//         dataType: "json",
//         success: function (msg) {
//             allUsers = msg;
//             msg.forEach(function (el) {
//                 addUserInTableBody(el);
//             });
//             bindButtonEditDelete();
//         }
//     })
// })
//
//
// function editUser() {
//     $.ajax("/rest/admin/edit", {
//         method: "post",
//         data:
//             {
//                 user: JSON.stringify(
//                     {
//                         id: $("#editModalUser").attr("value"),
//                         login: $("#editLogin").val(),
//                         password: $("#editPassword").val(),
//                         email: $("#editEmail").val()
//                     }),
//                 roleIds: JSON.stringify($("#roles").val())
//             },
//         dataType: "json",
//         success: function (msg) {
//
//             $("#login" + msg.id).text(msg.login);
//             $("#password" + msg.id).text(msg.password);
//             $("#email" + msg.id).text(msg.email);
//             $("#select" + msg.id).children().remove().attr("size", msg.role.length);
//             // $("#select" + msg.id).attr("size", msg.role.length);
//             msg.role.forEach(function (role) {
//                 option.clone().text(role.role).appendTo($("#select" + msg.id));
//             });
//
//         }
//     })
//
//     editUserUnselectRoles();
//     $("#modalEdit").modal('hide');
// }
//
// function editUserUnselectRoles() {
//     $("[name=roleOption]").attr("selected", false);
//
// }
//
// function deleteUser() {
//     $.ajax("/rest/admin/delete", {
//         method: "post",
//         data: {id: $("#deleteModalUser").attr("value")},
//         dataType: "text",
//         success: function (msg) {
//             $("#tr" + msg).children().remove();
//         }
//     });
//     $("#modalDelete").modal('hide');
// }
//
// function addUser() {
//     $.ajax("/rest/admin/add", {
//         method: "post",
//         data:
//             {
//                 user: JSON.stringify(
//                     {
//                         login: addLogin.val(),
//                         password: addPassword.val(),
//                         email: addEmail.val()
//                     }),
//                 roleIds: JSON.stringify(addRoles.val())
//             },
//         dataType: "json",
//         success: function (msg) {
//             addUserInTableBody(msg);
//             allUsers.push(msg);
//             bindButtonEditDelete();
//             addLogin.val("");
//             addPassword.val("");
//             addEmail.val("");
//             addRoles.val("");
//         }
//     })
// }
//
// // function addUserInTableBody(el) {
// //     let trLocal = tr.clone();
// //     trLocal.attr("id", "tr" + el.id);
// //     getTd(el.login, "login" + el.id).appendTo(trLocal);
// //     getTd(el.password, "password" + el.id).appendTo(trLocal);
// //     getTd(el.email, "email" + el.id).appendTo(trLocal);
// //     getSelect(el).appendTo(trLocal);
// //     getButton("primary", "Edit", el.id).appendTo(trLocal);
// //     getButton("danger", "Delete", el.id).appendTo(trLocal);
// //     trLocal.appendTo(tbody);
// // }
// function addUserInTableBody(el) {
//     let trLocal = tr.clone();
//     trLocal.attr("id", "tr" + el.id);
//     getTd(el.name, "name" + el.id).appendTo(trLocal);
//     getTd(el.lastname, "lastname" + el.id).appendTo(trLocal);
//     getTd(el.email, "email" + el.id).appendTo(trLocal);
//     getTd(el.password, "password" + el.id).appendTo(trLocal);
//     getTd(el.age, "age" + el.id).appendTo(trLocal);
//     getSelect(el).appendTo(trLocal);
//     getButton("primary", "Edit", el.id).appendTo(trLocal);
//     getButton("danger", "Delete", el.id).appendTo(trLocal);
//     trLocal.appendTo(tbody);
// }
//
// let getSelect = function (el) {
//     let selectLocal = select.clone();
//     selectLocal.attr("size", el.role.length);
//     selectLocal.attr("id", "select" + el.id);
//     el.role.forEach(function (role) {
//         option.clone().text(role.role).appendTo(selectLocal);
//     });
//     let tdSelect = td.clone();
//     selectLocal.appendTo(tdSelect);
//     return tdSelect;
// };
//
// let getTd = function (val, valueOfName) {
//     let tdLocal = td.clone();
//     tdLocal.attr("id", valueOfName)
//     return tdLocal.text(val);
// }
//
// let getButton = function (class1, text1, userId) {
//     let button = buttonGlobal.clone();
//     button.attr("id", text1 + "User");
//     button.attr("class", "btn btn-" + class1);
//     button.attr("value", userId);
//     button.attr("name", "user" + text1 + "CallModal");
//     button.text(text1);
//     let tdButton = td.clone();
//     button.appendTo(tdButton);
//     return tdButton;
//
// }
//
// function fillModalFields(action, user) {
//     $("#" + action + "Login").attr("value", user.login)
//     $("#" + action + "Password").attr("value", user.password)
//     $("#" + action + "Email").attr("value", user.email)
//     $("#" + action + "ModalUser").attr("value", user.id)
//     $.each(user.role, function (key, value) {
//         $("#" + action + "Role" + value.id).attr("selected", true)
//     })
// }
//
// function bindButtonEditDelete() {
//     buttonEditUser = $("[name=userEditCallModal]");
//     buttonEditUser.click(
//         function () {
//             fillModalFields("edit", getUser(parseInt($(this).attr("value"))));
//             $("#modalEdit").modal('show');
//         }
//     )
//     buttonDeleteUser = $("[name=userDeleteCallModal]");
//     buttonDeleteUser.click(function () {
//         fillModalFields("delete", getUser(parseInt($(this).attr("value"))));
//         $("#modalDelete").modal('show');
//     })
// }
//
// let getUser = function (id) {
//     let user;
//     $.each(allUsers, function (index, object) {
//         $.each(object, function (key, value) {
//             if (key == "id" && value == id) {
//                 user = object;
//             }
//         })
//     })
//     return user;
// }
