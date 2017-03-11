// Initialize the JS file
$(document).ready(function(){

//Initial Array of Topics
var topics = ['The Matrix', 'The Notebook', 'Brave', 'Frozen'];

//Display Topics renders the HTML to display all topics
function displayTopics() {
	
	var topic = $(this).attr('data-name');

	var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + topic + '&limit=10&rating=&api_key=dc6zaTOxFJmzC';
	
	$.ajax({
          url: queryURL,
          method: 'GET'
        }).done(function(response) {
        	console.log(response);
        	console.log(response.data.length);
        	//For loop to go through the gifs
        	for(gifIndex =0; gifIndex <= response.data.length - 1; gifIndex++) {

          // Creating a div to hold the topic
          var topicDiv = $('<div class="topic-gif">');

          // Storing the Still Image
          var stillImage = response.data[gifIndex].images.fixed_height_still.url;
          var gifImage = response.data[gifIndex].images.fixed_height.url;
          console.log([gifIndex]+stillImage);

          // Creating an element to hold the Still Image
          var pStillImage = $('<img src = "'+stillImage+'"class ="gif">');
          	  pStillImage.attr("data-still",stillImage);
          	  pStillImage.attr("data-animate",gifImage);
          	  pStillImage.attr("data-state","still");

          // Displaying the Still Image
          topicDiv.append(pStillImage);

          // Storing the gif
          var playingGIF = response.data[gifIndex].images.fixed_height_still.url;

          // Creating an element to hold the gif
          var pPlayingGIF = $('<img src = "'+playingGIF+'">');

          // Storing the rating data
          var rating = response.data[gifIndex].rating;

          // Creating an element to have the rating displayed
          var pRating = $('<p>').text('Rating: ' + rating);

          // Displaying the rating
          topicDiv.append(pRating);

          

          // Putting the topic gifs on the page
          $('#topic-gifs').prepend(topicDiv);
          //End the for loop
      		}
      	//End the response function	
        });
        //End the display topic function
      };

      // Function for displaying topics
      function renderButtons() {

        // Deleting the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $('#topic-buttons').empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          
          var a = $('<button>');
          // Adding a class of topic to our button
          a.addClass('topic');
          // Adding a data-attribute
          a.attr('data-name', topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the topic-buttons div
          $('#topic-buttons').append(a);
        }
      };

      // This function handles events where the add a new topic button is clicked
      $('#add-topic').on('click', function(event) {
        event.preventDefault();
        console.log("New topic button clicked");
        // This line grabs the input from the textbox
        var topic = $('#topic-input').val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // This function handles events where a still image is clicked
      function animatePlay() {
        console.log("The gif is clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      	var state = $(this).attr("data-state");
      	// If the clicked image's state is still, update its src attribute to what its data-animate value is.
      	// Then, set the image's data-state to animate
      	// Else set src to the data-still value
	      	if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
      	} 
	      	else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
      	}
      };

      // Adding a click event listener to all elements with a class of "topic"
      $(document).on('click', '.topic', displayTopics);
      $(document).on('click', '.gif', animatePlay);


      // Calling the renderButtons function to display the intial buttons
      renderButtons();
// End Document Ready Function
});