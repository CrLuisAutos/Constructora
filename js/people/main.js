var avatar = "";
var id = "";
var name = "";
var idArray = [];
var nameArray = [];
var avatarArray = [];

var Persister = {
    save: function(key, value) {
        localStorage.setItem(key, value);
    },
    load: function(key, default_value) {
        return localStorage.getItem(key) || default_value;
    },
    saveObj: function(key, value) {
        var json_string = JSON.stringify(value);
        this.save(key, json_string);
    },
    loadObj: function(key, default_value) {
        var json_string = this.load(key, default_value);
        return JSON.parse(json_string);
    }
};
/*limpia los label del modal*/
function cleanModal() {
    $("#name").val("");
    $("#avatar").val("");
    $("#id").val("");

}
/*carga los datos del modal*/
function load_People() {
    $("#peopleTable").html("");
    idArray = Persister.loadObj('id', "[]");
    nameArray = Persister.loadObj('name', "[]");
    avatarArray = Persister.loadObj('avatar', "[]");
    for (var i = 0; i < idArray.length; i++) {
        id = idArray[i];
        name = nameArray[i];
        avatar = avatarArray[i];
        $('#.table').append('<tr class="trPeople"><td class="table-striped">' + id + '</td><td class="table-striped">' + name + '</td><td class="table-striped">' + avatar + '</td><td class="table-striped"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span></a><a class="btnEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></td></tr>');
    }
}
   /*Elimina row de la tabla*/
    $('.table').on('click', '.btnDelete', function() {
        event.preventDefault();
        $(this).parent().parent().remove();

    });
    /*Edita row de la tabla*/
    $('.table').on('click', '.btnEdit', function() {
        event.preventDefault();

        alert(ej);
        cleanModal();
    });

    /*Autofocus en el modal*/
    $('#myModal3').on('shown.bs.modal', function() {
        $("#id").focus();
    });

$(document).ready(function() {
    debugger;
    load_People();
    /*evento del boton agregar persona*/
    $("#savePeople").click(function() {
        avatar = $("#avatar").val();
        id = $("#id").val();
        name = $("#name").val();
        if ((name !== "") && (avatar !== "") && (id !== "")) {
            cleanModal();
            $("inputSuccess").click();
            idArray.push({
                "id": id
            });
            nameArray.push({
                "name": name
            });
            avatarArray.push({
                "avatar": avatar
            });
            Persister.saveObj('people', people);
            return $(".table").append('<tr class="trPeople"><td class="table-striped">' + id + '</td><td class="table-striped">' + name + '</td><td class="table-striped">' + avatar + '</td><td class="table-striped"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span></a><a class="btnEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></td></tr>');
        } else {
            $("#msj").val("kgugujv");
        }
    });
});
