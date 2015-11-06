var app = angular.module('itunes');

app.controller('mainCtrl', function($scope, itunesService){

  $scope.gridOptions = { 
      data: 'songData',
      height: '110px',
      sortInfo: {fields: ['Song', 'Artist', 'Collection', 'Genre', 'Explicit',], directions: ['asc']},
      columnDefs: [
        {field: 'Play', displayName: 'Play', width: '40px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><a href="{{row.getProperty(col.field)}}"><img src="http://www.icty.org/x/image/Miscellaneous/play_icon30x30.png"></a></div>'},
        {field: 'Artist', displayName: 'Artist'},
        {field: 'Collection', displayName: 'Collection'},
        {field: 'AlbumArt', displayName: 'Album Art', width: '110px', cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><img src="{{row.getProperty(col.field)}}"></div>'},
        {field: 'Genre', displayName: 'Genre'},
        {field: 'Explicit', displayName: 'Explicit'},
        {field: 'CollectionPrice', displayName: 'Collection Price'},
        {field: 'Type', displayName: 'Type'}
      ]
  };

  

  $scope.getSongData = function(){
    console.log($scope.searchTy);
    itunesService.getArtistData($scope.artist, $scope.searchTy).then(function(res){
    $scope.songData = interpret(res);
    });
  }

  // $scope.changeType = function(){
  //   $scope.type = 
  // }

  function interpret(array){
    console.log(array);
    var myFinalArray = [];
    var i = 0;
    for(var i = 0; i < array.resultCount; i++){
      myFinalArray[i] = {
        Genre: array.results[i].primaryGenreName,
        Explicit: array.results[i].collectionExplicitness,
        AlbumArt: array.results[i].artworkUrl30,
        Artist: array.results[i].artistName,
        Collection: array.results[i].collectionName,
        CollectionPrice: array.results[i].collectionPrice,
        Play: array.results[i].trackViewUrl,
        Type: array.results[i].kind
      }
    }
    console.log(myFinalArray);
    return myFinalArray;
  }
})