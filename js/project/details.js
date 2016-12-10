var stateProject = [];
var task = [];
jQuery(document).ready(function($) {

    $("#saveState").click(function(event) {
        stateProject.color = $("#colorState").val();
        stateProject.name = $("#nameState").val();
        createState();
    });
    $("#saveTask").click(function(event) {
        task.name = $("#nameTask").val();
        task.worker= $("#selectPeople").val();
        createTask();
    });

    $("#addTasks").click(function(event) {
        debugger;
        addPeople();
    });

});
//añade tareas a personas
function addPeople() {
    people = Persister.loadObj('people', '[]');
    for (var i = 0; i < people.length; i++) {
        $("#selectPeople").append('<option>'+people[i].id+'</option>');
    }
}
//crea el estado del proyecto
function createState() {
    $("#container").append('<div id="' + stateProject.name + '" class="cont-item" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');  
    document.getElementById(stateProject.name).style.backgroundColor = stateProject.color;
}

//crear tarea
function createTask() {
    $("#list-task").append('<div class="item" id="' + task.name + '" draggable="true" ondragstart="drag(event)"><h5> Work´s name: ' + task.name + '</h5><h5> ID Worker: ' + task.worker + '</h5><a class="btnDelete"><span class="glyphicon glyphicon-repeat" aria-hidden="true" ></span></a><a class="btnUndo"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span></a></div>');
}

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