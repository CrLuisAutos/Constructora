var people = [];
var id = "";
var name = "";
var avatar = "";
/*limpia los label del modal*/
function cleanModal() {
    $("#name").val("");
    $("#avatar").val("");
    $("#id").val("");
}
/*carga los datos del modal*/
function load_People() {
    $("tbody tr").remove();
    people = Persister.loadObj('people', '[]');
    for (var i = 0; i < people.length; i++) {
        id = people[i].id;
        name = people[i].name;
        avatar = people[i].avatar;
        $('tbody').append('<tr class="trPeople" id=' + id + '><td class="table-striped"> <h1>' + id + '</h1></td><td class="table-striped"> <h1>' + name + '</h1></td><td class="td-icon"> <img src="'+avatar+'"  id="img-responsive"><td class="table-striped"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span></a></td></tr>');
    }
}
jQuery(document).ready(function($) {
    load_People();
    /*evento del boton agregar persona*/
    $("#savePeople").click(function() {
        var person = {};
        person.id = $("#id").val();
        person.name = $("#name").val();
        person.avatar = $("#avatar").val();
        if ((person.name !== "") && (person.avatar !== "") && (person.id !== "")) {
            cleanModal();
            $("inputSuccess").click();
            people.push(person);
            Persister.saveObj('people', people);
            load_People();
        }
    });
    /*Elimina row de la tabla*/
    $('tbody').on('click', '.btnDelete', function() {
        event.preventDefault();
        var x = $(this).parent().parent().attr('id');
        people = Persister.loadObj('people', '[]');
        for (var i = 0; i < people.length; i++) {
            if (people[i].id === x) {
                people.splice(i, 1);
                break;
            }
        }
        Persister.saveObj('people', people);
        load_People();
        $(this).parent().parent().remove();
    });
    /*Autofocus en el modal*/
    $('#myModal3').on('shown.bs.modal', function() {
        $("#id").focus();
    });
    
});