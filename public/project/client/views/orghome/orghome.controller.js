(function(){
    angular
        .module("InstaEventsApp")
        .controller("OrganizerHomeController", OrganizerHomeController);


    function OrganizerHomeController($rootScope){
   var model = this;
        model.organizer = $rootScope.user;
}

})();/**
 * Created by Sharayu on 12/6/2015.
 */
