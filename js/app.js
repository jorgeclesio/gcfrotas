var app = angular.module('app',['ngRoute','ui.mask'] );
app.config(function($routeProvider){  

    $routeProvider.
    when('/cadastroOs',{controller:'cadastroOsController', 
            templateUrl:'tlp/cadastro_os.html'}).
    otherwise({redirectTo:'/'});
});
