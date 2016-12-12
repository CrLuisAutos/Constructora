var project = window.location.search.substring(1);
var taskList = [];
var taskPeople = {};
var taskState = {};
var taskProject = {};
var numTask=0;

jQuery(document).ready(function($) {
    taskList = Persister.loadObj('task', '[]');
    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].projectId === project) {
        	numTask++;
            $('tbody').append('<tr class="trPeople" id=' + taskList[i].id + '><td class="table-striped"> <h1>' + taskList[i].id + '</h1></td><td class="table-striped"> <h1>' + numTask + '</h1></td></tr>');
        	$("#state").append('<tr class="trPeople" id=' + taskList[i].state + '><td class="table-striped"> <h1>' + taskList[i].length + '</h1></td><td class="table-striped"> <h1>' + numTask + '</h1></td></tr>');
        	$("#project").append('<tr class="trPeople" id=' + taskList[i].projectId + '><td class="table-striped"> <h1>' + taskList[i].length + '</h1></td><td class="table-striped"> <h1>' + numTask + '</h1></td></tr>');
        }
    }
});