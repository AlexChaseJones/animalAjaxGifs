//SETUP VARIABLES
//=======================================
var userArray = [''];

//FUNCTIONS
//=======================================
function generate(response){
	for (var i = 0; i < limit; i++) {
		var newDiv = $('<div class="imageContainer">');
		(newDiv).attr('id', i);
		$('#images').append(newDiv);

		var imageContainer = $('<img>');
		imageContainer.addClass('currentImages');
		imageContainer.attr('id', i);
		(imageContainer).attr('src', response.data[i].images.downsized_still.url);
		$("#" + i).append(imageContainer)
		console.log(response.data[1].images.downsized_still.url);
	}

	$('html, body').animate({
        scrollTop: $("#images").offset().top
    }, 1000);

	var next = $('<div id="next">');
	(next).html('<h2>Next Page</h2>');
	$('#' + (limit - 1)).after(next);

}

function addButton(newGif){
	var button = $('<button>');
	(button).addClass('recentGif btn btn-success');
	(button).attr('data-name', newGif);
	(button).html(newGif);
	$('#recent').append(button);
}

function ajaxBuild(){
	$.ajax({
    	url: queryURL,
    	method: 'GET'})
    	.done(function(response) {
     	generate(response);
    });
}

//MAIN PROCESSES
//=======================================
$('#search').on('click', function(){
	page = 0;
	$('#images').empty();
	gif = $('#searchBar').val().toLowerCase().trim();
	if (userArray.indexOf(gif) == -1) {
		userArray.push(gif);
		addButton(gif);
	}	

	limit = $("input[name='perPage']:checked").val();
	page = 0;
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&offset=" + page + "&limit=" + limit;
    ajaxBuild();
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
	page = 0;
	$('#images').empty();
	limit = $("input[name='perPage']:checked").val();
	queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).data('name') + "&api_key=dc6zaTOxFJmzC&limit=" + limit;

    ajaxBuild();
})

$(document).on('click', '#next', function(){
	$('#images').empty();
	page = +page + +$("input[name='perPage']:checked").val();
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&offset=" + page + "&limit=" + limit;
    ajaxBuild();
})





