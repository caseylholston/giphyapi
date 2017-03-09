// Initialize the JS file
$(document).ready(function(){

//Initial Array of Topics
var topics = ['The Matrix', 'The Notebook', 'Brave', 'Frozen']

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
        	for(i=0; i < response.data.length - 1; i++) {

          // Creating a div to hold the topic
          var topicDiv = $('<div class="topic">');

          // Storing the Still Image
          var stillImage = response.data[i].images.fixed_height_still.url;

          // Creating an element to hold the Still Image
          var pStillImage = $('<img src = "'+stillImage+'">');

          // Displaying the Still Image
          topicDiv.append(pStillImage);

          // Storing the rating data
          var rating = response.data[i].rating;

          // Creating an element to have the rating displayed
          var pRating = $('<p>').text('Rating: ' + rating);

          // Displaying the rating
          topicDiv.append(pRating);

          // Storing the plot
          var plot = response.Plot;

          // Creating an element to hold the plot
          var pThree = $('<p>').text('Plot: ' + plot);

          // Appending the plot
          topicDiv.append(pThree);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $('<img>').attr('src', imgURL);

          // Appending the image
          topicDiv.append(image);

          // Putting the entire movie above the previous movies
          $('#topic-gifs').prepend(topicDiv);
          //End the for loop
      		}
      	//End the response function	
        });
        //End the display topic function
      }

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
      }

      // This function handles events where a topic button is clicked
      $('#add-topic').on('click', function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $('#topic-input').val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "topic"
      $(document).on('click', '.topic', displayTopics);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
// End Document Ready Function
});