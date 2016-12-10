var stateProject = [];
var task= [];
jQuery(document).ready(function($) {
	$("#saveState").click(function(event) {
		stateProject.color= $("#colorState").val();
		stateProject.name= $("#nameState").val();
		createState();
	});
	$("saveTask").click(function(event) {
		task.name= $("nameTask").val();
		createTask();
	});

});
//crea el estado del proyecto
function createState () {
	 $("#container").append('<div id="'+stateProject.name+'" class="cont-item" ondrop="drop(event)" ondragover="allowDrop(event)"></div>');
	 document.getElementById(stateProject.name).style.backgroundColor = stateProject.color;
}

//crear tarea
function createTask () {
	$(".item").append('<div class="item" id="'+task.name+'" draggable="true" ondragstart="drag(event)">'+task.name+'</div>'); 
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