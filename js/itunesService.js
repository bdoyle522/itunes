var app = angular.module('itunes');

app.service('itunesService', function($http, $q){

  this.getArtistData = function(artist, type){
  	var deferred = $q.defer();
  	if(type =='all' || type === undefined){
	  	$http({
	  		method: 'JSONP',
	  		url: 'https://itunes.apple.com/search?term='+artist+'&callback=JSON_CALLBACK&entity=song'
	  	}).then(function(response){
	  		var parsedResponse = response.data;
	  		deferred.resolve(parsedResponse);
	  	})
 		} else {

 			$http({
	  		method: 'JSONP',
	  		url: 'https://itunes.apple.com/search?term='+artist+'&callback=JSON_CALLBACK&entity='+type,
	  		}).then(function(response){
	  		console.log('else');
	  		var parsedResponse = response.data;
	  		deferred.resolve(parsedResponse);
	  	})

 		}
  	return deferred.promise;
  }
});
