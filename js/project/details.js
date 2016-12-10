var stateProject = [];
jQuery(document).ready(function($) {
	$("#saveState").click(function(event) {
		stateProject.color= $("#colorState").val();
		alert(stateProject.color);
	});
});