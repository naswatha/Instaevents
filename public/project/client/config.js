(function(){
    "use strict";
    angular
        .module("InstaEventsApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                  templateUrl: "views/landing/landing.view.html",
                    controller: "LandingController",
                    controllerAs: "model"
                })
       .when("/landing", {
                    templateUrl: "views/landing/landing.view.html",
                    controller: "LandingController",
                    controllerAs: "model"
                })
                 .when("/header", {
                    templateUrl: "views/header/header.view.html",
                    controller: "HeaderController",
                    controllerAs: "model"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/register/register.view.html",
                   controller: "RegisterController",
                    controllerAs: "model"
                })
                 .when("/orgreg", {
                    templateUrl: "views/register/orgregister.view.html",
                   controller: "RegisterController",
                    controllerAs: "model"
                })
                    .when("/userprofile", {
                    templateUrl: "views/profile/userprofile.view.html",
                   controller: "UserProfileController",
                    controllerAs: "model"
                })
                    .when("/orgprofile", {
                    templateUrl: "views/profile/orgprofile.view.html",
                   controller: "OrgProfileController",
                    controllerAs: "model"
                })
                       .when("/orgevents", {
                    templateUrl: "views/orgevents/orgevents.view.html",
                   controller: "OrganizerEventController",
                    controllerAs: "model"
                })
                     .when("/userhome", {
                    templateUrl: "views/userhome/userhome.view.html",
                    controller: "UserHomeController",
                   controllerAs: "model"
                })
                    .when("/orghome", {
                    templateUrl: "views/orghome/orghome.view.html",
                        controller: "OrganizerHomeController",
                        controllerAs: "model"
                 })
                .when("/orgevents", {
                    templateUrl: "views/orgevents/orgevents.view.html",
                    controller: "OrganizerEventController",
                    controllerAs: "model"
                })
                    .when("/eventcreation", {
                    templateUrl: "views/eventcreation/eventcreation.view.html",
                    controller: "EventCreationController",
                    controllerAs: "model"
                  })
                      .when("/organizer/:organizerid/event/:eventid", {
                    templateUrl: "views/event/event.view.html",
                    controller: "EventController",
                    controllerAs: "model"
                  })
                .when("/eventupdate/:eventId", {
                    templateUrl: "views/eventupdate/eventupdate.view.html",
                    controller: "EventUpdateController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           