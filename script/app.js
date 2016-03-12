//SETUP VARIABLES
//=======================================
var userArray = [];

//FUNCTIONS
//=======================================
function generate(response){
	for (var i = 0; i < 10; i++) {
		var newDiv = $('<div>');
		(newDiv).attr('id', i);
		$('#images').append(newDiv);

		var imageContainer = $('<img>');
		imageContainer.addClass('currentImages');
		imageContainer.attr('id', i);
		(imageContainer).attr('src', response.data[i].images.downsized_still.url);
		$("#" + i).append(imageContainer)
		console.log(response.data[1].images.downsized_still.url);
	}

}

function addButton(newGif){
	var button = $('<button>');
	(button).addClass('recentGif');
	(button).attr('data-name', newGif);
	(button).html(newGif);
	$('#recent').append(button);
}

//MAIN PROCESSES
//=======================================
$('#search').on('click', function(){
	$('#images').empty();
	gif = $('#searchBar').val().toLowerCase().trim();
	if (userArray.indexOf(gif) == -1) {
		userArray.push(gif);
		addButton(gif);
	}	

    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: 'GET'})
    	.done(function(response) {
     	generate(response);
    });
});

$(document).on('click', '.currentImages', function(){
	current = $(this);
	(current).addClass('play');
	imageId = (current).attr('id');

	$.ajax({
    	url: queryURL,
    	method: 'GET'})
    	.done(function(response) {
     	(current).attr('src', response.data[imageId].images.downsized.url);
     	console.log(response.data[imageId].images.downsized.url);
    });
})

$(document).on('click', '.play', function(){
	current = $(this);
	(current).removeClass('play');
	imageId = (current).attr('id');

	$.ajax({
    	url: queryURL,
    	method: 'GET'})
    	.done(function(response) {
     	(current).attr('src', response.data[imageId].images.downsized_still.url);
     	console.log(response.data[imageId].images.downsized_still.url);
    });
})

$(document).on('click', '.recentGif', function(){
	$('#images').empty();

	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).data('name') + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: 'GET'})
    	.done(function(response) {
     	generate(response);
    });
})

