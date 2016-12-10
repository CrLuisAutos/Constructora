jQuery(document).ready(function($) {
    load();
});

//carga los proyectos existentes
function load() {
    $("#all-projects").html();
    projects = Persister.loadObj('projects', '[]');
    for (var i = 0; i < projects.length; i++) {
        name = projects[i].name;
        icon = projects[i].icon;
        id = projects[i].id;
        $("#all-projects").append('<div class="hovereffect"><img class="img-responsive" src="' + icon + '" alt=""><div id="' + id + '" class="overlay"><h2>' + name + '</h2><a class="info" href="#">Details</a></div></div></div>');
    }
}
$('#all-projects').on('click', '.overlay', function() {
    event.preventDefault();
    debugger;
    id=$(this).attr('id');
    window.open("projects/detail.html", "_parent");
});

