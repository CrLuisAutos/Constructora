var projects = [];
var detail = {};
var id = "";
var name = "";
var date = "";
var associates = "";
var icon = "";

/*carga los datos del modal*/
function load_Projects() {
    $("tbody tr").remove();
    projects = Persister.loadObj('projects', '[]');
    for (var i = 0; i < projects.length; i++) {
        id = projects[i].id;
        name = projects[i].name;
        date = projects[i].date;
        associates = projects[i].associates;
        icon = projects[i].icon;
        $('tbody').append('<tr class="trprojects" id=' + id + '><td class="table-striped"> <h1>' + id + '</h1></td><td class="table-striped"> <h1>' + name + '</h1></td><td class="td-icon"> <img src="'+icon+'" id="img-responsive"></div></td><td class="table-striped"><h1>' + date + '</h1></td><td class="table-striped"> <h1 id="as'+id+'">' + associates + '</h1></td><td class="table-striped"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span></a><a class="btnDetail"><span class="glyphicon glyphicon-new-window" aria-hidden="true" ></span></a></td></tr>');
    }
}
jQuery(document).ready(function($) {
	load_Projects();
    //save botton
    $("#saveProject").click(function(event) {
        detail.id = $("#id").val();
        detail.name = $("#name").val();
        detail.date = today();
        detail.associates = associates;
        detail.icon = $("#icon").val();
        if ((detail.name !== "") && (detail.id !== "")) {
            cleanModal();
            $("inputSuccess").click();
            projects.push(detail);
            Persister.saveObj('projects', projects);
            load_Projects();
        }
    });
});
	//total de personas asociadas al projecto

	// toma la fecha del sistema
function today () {
	var f = new Date();
    return date=(f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
}
/*limpia los label del modal*/
function cleanModal() {
    $("#name").val("");
    $("#icon").val("");
    $("#id").val("");
}
/*Elimina row de la tabla*/
    $('tbody').on('click', '.btnDelete', function() {
        event.preventDefault();
        var x = $(this).parent().parent().attr('id');
        projects = Persister.loadObj('projects', '[]');
        for (var i = 0; i < projects.length; i++) {
            if (projects[i].id === x) {
                projects.splice(i, 1);
                break;
            }
        }
        Persister.saveObj('projects', projects);
        $(this).parent().parent().remove();
        load_projects();
    });
/*Autofocus en el modal*/
    $('#myModal3').on('shown.bs.modal', function() {
        $("#id").focus();
    });