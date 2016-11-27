jQuery(document).ready(function($) {
    /*evento del boton agregar persona*/
    $("#savePeople").click(function(ev) {
        var avatar = $("#avatar").val();
        var id = $("#id").val();
        var name = $("#name").val();
        if ((name !=="")&&(avatar!=="")&&(id!=="")) {
        	cleanModal();
        	$("inputSuccess").click();
            return $(".table").append('<tr class="trPeople"><td class="table-striped">' + id + '</td><td class="table-striped">' + name + '</td><td class="table-striped">' + avatar + '</td><td class="table-striped"><a class="btnDelete"><span class="glyphicon glyphicon-trash" aria-hidden="true" ></span></a><a class="btnEdit"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a></td></tr>');
        }
        else{
            $("#msj").val("kgugujv");
        }

    });
    /*Autofocus en el modal*/
    $('#myModal3').on('shown.bs.modal', function() {
    $("#id").focus();
});
    /*Elimina row de la tabla*/
    $('.table').on('click', '.btnDelete', function(event) {
        event.preventDefault();
        $(this).parent().parent().remove();
        
    });
     /*Edita row de la tabla*/
    $('.table').on('click', '.btnEdit', function(event) {
        var valores[];
        var i=0;
         $(this).parents("tr").find("td").each(function(){
                valores[i]=$(this).html();
                i++;
            });
         alert(valores);
    });

    /*limpia los label del modal*/
    function cleanModal() {
        $("#name").val("");
        $("#avatar").val("");
        $("#id").val("");
        
    }
});