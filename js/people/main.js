jQuery(document).ready(function($) {

    $("#savePeople").click(function(ev) {
    	debugger;
        var lastName = $("#last").val();
        var name = $("#name").val();
        if ((name !=="")&&(lastName!=="")) {
        	cleanModal();
        	$("inputSuccess").click();
            return $(".table").append('<tr class="trPeople"><td>' + name + '</td><td>' + lastName + '</td><td></td></tr>');
        }
        else{
            $("#msj").val("kgugujv").show();
        }

    });

    function cleanModal() {
        $("#name").val("");
        $("#lastName").val("");
        
    }
});