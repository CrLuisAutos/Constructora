var stateProject = [];
var taskList = [];
var currentProject = window.location.search.substring(1);
jQuery(document).ready(function($) {
    load_task();
    addPeople();
    $("#saveState").click(function(event) {
        stateProject.color = $("#colorState").val();
        stateProject.name = $("#nameState").val();
        createState();
    });
    $("#saveTask").click(function(event) {
        var work = {};
        work.description = $("#descriptionTask").val();
        work.name = $("#nameTask").val();
        work.projectId = currentProject;
        work.worker = $("#selectPeople").val();
        work.id = $("#idTask").val();
        if ((work.name !== "") && (work.worker !== "") && (work.id !== "") && (work.description !== "")) {
            cleanModal();
            $("inputSuccess").click();
            taskList.push(work);
            Persister.saveObj('task', taskList);
            load_task();
        }
    });

});
//añade tareas a personas
function addPeople() {
    people = Persister.loadObj('people', '[]');
    for (var i = 0; i < people.length; i++) {
        $("#selectPeople").append('<option>' + people[i].id + '</option>');
    }
}
//crea el estado del proyecto
function createState() {
    $("#container").append('<div id="' + stateProject.name + '" class="cont-item" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
    document.getElementById(stateProject.name).style.backgroundColor = stateProject.color;
}
/*limpia los label del modal*/
function cleanModal() {
    $("#descriptionTask").val("");
    $("#nameTask").val("");
    $("#selectPeople").val("");
    $("#idTask").val("");
}
/*Elimina una tarea d el proyecto*/
$('#list-task').on('click', '.btnDelete', function() {
    event.preventDefault();
    var x = $(this).parent().parent().attr('id');
    taskList = Persister.loadObj('task', '[]');
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id === x) {
            taskList.splice(i, 1);
            break;
        }
    }
    Persister.saveObj('task', taskList);
    load_task();
});
$('#list-task').on('click', '.btnDelete', function() {

});
//carga 
function load_task() {
    $("#list-task").html("");
    taskList = Persister.loadObj('task', '[]');
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].projectId === currentProject) {
            $("#list-task").append('<div class="item" id="' + taskList[i].id + '" draggable="true" ondragstart="drag(event)"><h5> Task: ' + taskList[i].name + '</h5><h5> ID Worker: ' + taskList[i].worker + '</h5><h5>Description: ' + taskList[i].description + '</h5><div class="icon"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a><a class="btnEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></div></div>');

        }
    }
}

/*Autofocus en el modal*/
$('#myModal4').on('shown.bs.modal', function() {
    $("#idTask").focus();
});



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}