(function(){
    angular
        .module("InstaEventsApp")
        .controller("LandingController", LandingController);
		
		
 function LandingController($scope){
   var model = this;
  model.myInterval = 1500;
  model.slides = [
    {
      image: './images/Music.jpg',
      caption:'Welcome to InstaEvents! A One stop platform for events happening around you..'
    },
    {
      image: './images/Art.jpg',
      caption: 'Looking for events around you? Use our customized search and look for events of your interest!'
    },
     {
      image: './images/Coffee.jpg',
      caption: 'Looking to promote your event? Look no further!!'
    }
   ];
}
 })();

