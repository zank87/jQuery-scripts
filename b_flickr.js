/* 
| Author: John Zank
| Description: jQuery script that pulls images from flickr based on the tag 
|              located within the button of the page. Modify the class info
|              within displayPhotos to match CSS styles of current project.
================================================================================ */

$(document).ready(function () {
  $('button').click(function (){
    $('button').removeClass("selected"); //Removes the highlight on the button
    $('this').addClass("selected"); //Hightlights new button
    var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var buttonTag = $(this).text(); //Text within the button is what tag to find on flickr
    var flickrOptions = {
      tags: buttonTag,
      format: "json"
    }; //Format we're telling Flickr to send
    function displayPhotos(data){
      var photoHTML = '<ul>'; //Building gallery of images from tag used
      $.each( data.items, function (i, photo) {
        photoHTML += '<li class="grid-25 tablet-grid-50>';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></li>';
      });
      photoHTML += '</ul>';
      $('#photos').html(photoHTML);
    }
    $.getJSON(flickrAPI, flickrOptions, displayPhotos);
  });
}); //Ensures that the DOM is fully loaded first before JS can run