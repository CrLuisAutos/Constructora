var stateList = [];
var stateProject = {};
var taskList = [];
var work = {};
var papelera = [];
var j = "";
var currentProject = window.location.search.substring(1);
jQuery(document).ready(function($) {
    loadState();
    load_task();
    addPeople();
     $("#show-chart").attr("href", "../chartAll/index-chart.html?"+currentProject+"");
    $("#saveState").click(function(event) {

        stateProject.color = $("#colorState").val();
        stateProject.name = $("#nameState").val();
        stateProject.projectId = currentProject;
        stateProject.id = $("#idState").val();
        if ((stateProject.name !== "") && (stateProject.id !== "")) {
            stateList.push(stateProject);
            Persister.saveObj('state', stateList);
            loadState();
        }

    });
    $("#saveTask").click(function(event) {
        work.description = $("#descriptionTask").val();
        work.name = $("#nameTask").val();
        work.projectId = currentProject;
        work.stateId = "list-task";
        work.worker = $(".selectPeople").val();
        work.id = $("#idTask").val();
        if ((work.name !== "") && (work.worker !== "") && (work.id !== "") && (work.description !== "")) {
            cleanModal();
            $("inputSuccess").click();
            taskList.push(work);
            Persister.saveObj('task', taskList);
            load_task();
        }

    });
    $("#saveEdit").click(function() {
        work.description = $("#descriptionEdit").val();
        work.name = $("#nameEdit").val();
        work.projectId = currentProject;
        work.worker = $("#editSelect").val();
        work.id = $("#idEdit").val();
        editTask();
    });
    $("#undo").click(function(event) {
        if (papelera !== "[]") {
            taskList.push(papelera);
            Persister.saveObj('task', taskList);
            load_task();
            papelera = [];
        }

    });
});

function editTask() {
    if ((work.name !== "") && (work.worker !== "") && (work.id !== "") && (work.description !== "")) {
        $("inputSuccess").click();
        taskList.push(work);
        taskList.splice(j, 1);
        Persister.saveObj('task', taskList);
        load_task();
    }
}
//añade tareas a personas
function addPeople() {
    people = Persister.loadObj('people', '[]');
    for (var i = 0; i < people.length; i++) {
        $(".selectPeople").append('<option>' + people[i].id + '</option>');
    }
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
            papelera = taskList[i];
            taskList.splice(i, 1);
            break;
        }
    }
    Persister.saveObj('task', taskList);
    load_task();
});
//edita la tarea
$('#list-task').on('click', '.btnEdit', function() {
    $('#myModa15').modal('show');
    var y = $(this).parent().parent().attr('id');
    taskList = Persister.loadObj('task', '[]');
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id === y) {
            $("#idEdit").val(taskList[i].id);
            $("#nameEdit").val(taskList[i].name);
            $("#descriptionEdit").val(taskList[i].description);
            j = i;
            break;
        }
    }
});
//carga las tareas del proyecto actual
function load_task() {
    $("#list-task").empty();
    taskList = Persister.loadObj('task', '[]');
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].projectId === currentProject) {
            if (taskList[i].stateId === "list-task") {
                $("#list-task").append('<div class="item" id="' + taskList[i].id + '" draggable="true" ondragstart="drag(event)"><h5> Task ID: ' + taskList[i].id + '</h5><h5> Task Name: ' + taskList[i].name + '</h5><h5>Worker ID: ' + taskList[i].worker + '</h5><h5>Description: ' + taskList[i].description + '</h5><div class="icon"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a><a class="btnEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></div></div>');
            } else {
                $("#" + taskList[i].stateId + "").append('<div class="item" id="' + taskList[i].id + '" draggable="true" ondragstart="drag(event)"><h5> Task ID: ' + taskList[i].id + '</h5><h5> Task Name: ' + taskList[i].name + '</h5><h5>Worker ID: ' + taskList[i].worker + '</h5><h5>Description: ' + taskList[i].description + '</h5><div class="icon"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></a><a class="btnEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></div></div>');
            }
        }
    }
}
//carga los estados en su correspondiente proyecto
function loadState() {
    $("#container-states").empty();
    stateList = Persister.loadObj('state', '[]');
    for (var i = 0; i < stateList.length; i++) {
        if (stateList[i].projectId === currentProject) {
            $("#container").append('<div id="' + stateList[i].id + '" class="cont-item" ondrop="drop(event)" ondragover="allowDrop(event)"><h4>' + stateList[i].name + '</h4></div>');
            document.getElementById(stateList[i].id).style.backgroundColor = stateList[i].color;
        }
    }

}

function changeState(data, idCont) {
    taskList = Persister.loadObj('task', '[]');
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].projectId === currentProject) {
            if (taskList[i].stateId !== data) {
                taskList[i].stateId = idCont;
                taskList.push(taskList[i]);
                taskList.splice(i, 1);
                Persister.saveObj('task', taskList);
                load_task();
                break;
            }

        }
    }

}
/*Autofocus en el modal*/
$('#myModal4').on('shown.bs.modal', function() {
    $("#idTask").focus();
});
/*Autofocus en el modal*/
$('#myModal5').on('shown.bs.modal', function() {
    $("#idEdit").focus();
});
/*Autofocus en el modal*/
$('#myModal3').on('shown.bs.modal', function() {
    $("#nameState").focus();
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
    var idCont = $(event.target).prop('id');
    changeState(data, idCont);
    ev.target.appendChild(document.getElementById(data));
}