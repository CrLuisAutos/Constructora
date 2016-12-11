var Persister = {
    save: function(key, value) {
        localStorage.setItem(key, value);
    },
    load: function(key, default_value) {
        return localStorage.getItem(key) || default_value;
    },
    saveObj: function(key, value) {
        var json_string = JSON.stringify(value);
        this.save(key, json_string);
    },
    loadObj: function(key, default_value) {
        var json_string = this.load(key, default_value);
        return JSON.parse(json_string);
    },
    deleteItem: function(key) {
        localStorage.removeItem(key);
    }
};

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
    id = $(this).attr('id');
    window.open("projects/detail.html", "_parent");
});

