//Inspired by Ellensaurus on Github: https://github.com/ellensaurus/Quiz
//adapted by William Wolfe-Wylie for Canada.com
//william.wolfewylie@gmail.com
//@wolfewylie

$(document).ready(function() {

	// array containing questions, answers, points and the gif for each question
	var questions = [
		{question: "How often do you apologize in a day?", choices: ["It's basically how I say 'hello'", "About as often as I check my smartphone", "I apologize for my very existence"], answer: [1, 2, 3], pic: "notevensorry.gif"},
		{question: "Have you ever apologized to an inanimate object?", choices: ["No, that's silly", "I refuse to admit it...but yes", "Only when drinking", "Chairs have feelings, too!"], answer: [1, 2, 3, 4], pic: "rainsorry.gif"},
		{question: "What animal best represents Canada?", choices: ["Bear", "Beaver", "Moose", "Caribou", "The pulled pork in my poutine"], answer: [1, 2, 3, 4, 5], pic: "sorrynotsorry.gif"},
		{question: "How do you feel about Toronto?", choices: ["City slickers live there", "It smells like garbage!", "It's the centre of the universe", "It's pronounced Toranna!"], answer: [1, 2, 3, 4], pic: "sorrynotsorry.gif"},
		{question: "Getting on a crowded bus, you:", choices: ["Apologize a thousand times as you push toward the back", "Stand at the front and say hi to the driver", "I just wait for the next bus", "Take off my backpack and move as far back as I can silently"], answer: [1, 2, 3, 4], pic: "sorrynotsorry.gif"},
		{question: "Who is the REAL greatest Canadian?", choices: ["Rob Ford", "Tommy Douglas", "Chris Hadfield", "John A.", "Margaret Atwood"], answer: [1, 2, 3, 4, 5], pic: "notevensorry.gif"},
		{question: "At a restaurant, they're out of your choice order. You:", choices: ["Get up and leave.", "Grumble 'that's ok' but you really know it's not", "Apologize to the waiter, you didn't know", "Turn bright red and mumble your apology while quickly scanning the menu for any other acceptable option"], answer: [1, 2, 3, 4, 5], pic: "sorrynotsorry.gif"},
		{question: "How do you make your Kraft Dinner?", choices: ["Plain. As instructed on the package.", "With cut-up wieners", "With shredded cheese and some ground pepper", "Tuna makes it healthy, right?", "Drown it in Sriracha"], answer: [1, 2, 3, 4, 5], pic: "sorrynotsorry.gif"},
		{question: "As a kid, you always:", choices: ["Had to watch Bill Nye", "Were way more into Mr Rogers", "Organized your stuffed animals into categories based on genre and size", "Knew that 'i'm disapointed in you' was way worse than any punishment", "Always accompanied an apology with a hug"], answer: [1, 2, 3, 4, 5], pic: "notevensorry.gif"},
		{question: "Americans always ask you:", choices: ["Do you guys live in igloos?", "Is that near Vancouver, Montreal or Toronto?", "Say aboot!", "Seriously? Free healthcare?", "Who's your president?"], answer: [1, 2, 3, 4, 5], pic: "notevensorry.gif"},
		{question: "From which province do you hail?", choices: ["Newfoundland and Labrador", "Nova Scotia", "PEI", "New Brunswick", "Quebec", "Ontario", "Manitoba", "Saskatchewan", "Alberta", "British Columbia", "Yukon", "NWT", "Nunavut"], answer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], pic: "rainsorry.gif"},
		{question: "Gender?", choices: ["Male", "Female", "Your dichotomous gender roles don't apply here, buzz off"], answer: [0, 0, 0], pic: "sorrynotsorry.gif"},
		{question: "How old are you?", choices: ["0-12", "13-19", "20-29", "30-39", "40-49", "50+"], answer: [0, 0, 0, 0, 0, 0], pic: "sorrynotsorry.gif"},
];

// just setting up variables for later use
	var questionNumber = 0;
	var correctAnswers = 0;
	var totalQuestions = questions.length;
    var articlelink = "http://o.canada.com/entertainment/celebrity/quiz-which-member-of-the-royal-family-are-you";
    var finalresult = "Name";
    var description = "Placeholder";
    var picturelink = "link.jpg";
    var Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9;
    var googleresponses = [Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9];
	
	welcomeScreen();

	// welcomeScreen appears when page loads
	function welcomeScreen() {
		$("header").fadeIn(1000);
		$("#beginButton").fadeIn(1000);
		$("#submitButton").hide();
		$("#continueButton").hide();
		$("#retryButton").hide();
	};


	$("#beginButton").click(function(event){
		event.preventDefault();
		nextQuestion();
	});

	// nextQuestion happens when beginButton or continueButton clicked, loads question, answers and gif
	function nextQuestion() {
		var currentQuestion = questions[questionNumber];
		$("#beginButton").hide();
		$("header").hide();
		$("#question").text(currentQuestion.question);
		$("#questionpic").append("<img src='" + currentQuestion.pic + "'>");
		for (i = 0; i < currentQuestion.choices.length; i++){
			$("#choices").append('<input type="radio" name="choice" value=' + currentQuestion.answer[i] + ' class=\'choices\' id="' + currentQuestion.choices[i] + '""><label class="answer" for="' + currentQuestion.choices[i] + '" value="' + currentQuestion.choices[i] + '">' + currentQuestion.choices[i] + '</label><br>');		
		};
		$("#question").slideDown("slow");
		$("#choices").slideDown("slow");
		$("#submitButton").fadeIn("slow");
		$("#questionNumber").text("Question " + (questionNumber + 1) + "/" + totalQuestions);
		$("#questionNumber").fadeIn(1000);
	}

	$("#submitButton").click(function(event){
		event.preventDefault();
		checkAnswer();
	});

	// checkAnswer triggered by the 'submit' button, adds the score of the answer to the user's total score, updates response array for Google spreadsheets
	function checkAnswer() {
		var currentQuestion = questions[questionNumber];
		var userChoice = $('input[name="choice"]:checked').val();
		console.log(userChoice);
		googleresponses[questionNumber] = $("input[name='choice']:checked").attr('id');
		console.log(googleresponses);
		$("#questionNumber").hide();
		$("#question").hide();
		$("#questionpic").empty();
		$("#choices").hide();
		$("#submitButton").hide();
		$("#choices").empty();
		if (!(userChoice)){
			$("retryButton").fadeIn(1000);
		} 	
		else {
			correctAnswers = correctAnswers + parseInt(userChoice);
			questionNumber++;
		}
		if (questionNumber >= questions.length){
			finalScreen();
		} else {
			nextQuestion();
		}			

	}
	
	$("#continueButton").click(function(event){
		event.preventDefault();
		$("#questionNumber").hide();

		$("#continueButton").hide();
	});

	// finalScreen occurs when there are no more questions, points total results in which final result a user is shown
	function finalScreen() {
		$("header").hide();
		$("#questionNumber").empty();
		$("#questionpic").empty();

 		if (correctAnswers >= 10 && correctAnswers <= 18) {
                        finalresult = "As Canadian as an American backpacker in Europe";
                        description = "Sorry, which country are you from? You might like the idea of Canada, but a lot of the culture has yet to sink in.";
                        picturelink = "http://interactive.canada.com/Canada/canadadayquiz/backpacker.jpg";
		} else if (correctAnswers > 18 && correctAnswers <= 26) {
                        finalresult = "As Canadian as beaver tails!";
                        description = "There's something inherently Canadian about Beavertails, but a huge portion of the country has never tried them, or even know where to find one. It's tourist-Canadian.";
						picturelink = "http://interactive.canada.com/Canada/canadadayquiz/beavertail.jpg";
		} else if (correctAnswers > 26 && correctAnswers <= 32) {
                        finalresult = "As Canadian as polar bears!";
                        description = "Everyone loves polar bears, but few of us ever get to see them. You love this country, love everything it stands for and are a genuinely good person. You just need to get out and see more of this great land.";
						picturelink = "http://interactive.canada.com/Canada/canadadayquiz/polarbear.jpg";
		}
		else if (correctAnswers > 32 && correctAnswers <= 39) {
                        finalresult = "As Canadian as public health care!";
                        description = "Public health care! It's great. Everyone loves it. Americans aren't even sure what to make of our socialist ways, but we're never giving it up. Just like you, we value what really matters: Taking care of each other properly. Feels good to be Canadian, right?";
						picturelink = "http://interactive.canada.com/Canada/canadadayquiz/doctor.jpg";
		}
		else if (correctAnswers > 39 && correctAnswers <= 45) {
                        finalresult = "As Canadian as maple syrup!";
                        description = "You embody the stereotypes and the unknown cultural quirks that make this country so great. You're probably really nice and super interesting and routinely teach your friends interesting things about this great country.";
						picturelink = "http://interactive.canada.com/Canada/canadadayquiz/maplesyrup.jpg";
		}
		else {
                        finalresult = "Whoa ... that was weird.";
                        description = "Apparently you are beyond categorization. You should start over again.";
        		}

        		//remaining functions set up social share buttons and sharing variables
                var tweet_message = "Whoa! I'm " + finalresult + " How Canadian are you?" + " " + articlelink + " via @CanadaDotCom";
                finalresulturl = encodeURIComponent(finalresult);
                descriptionurl = encodeURIComponent(description);
                tweet_messageurl = encodeURIComponent(tweet_message);
                var articlelinkfb = encodeURIComponent(articlelink);
                var tweet_url = "https://twitter.com/intent/tweet?status=" + tweet_messageurl;
                var facebookurl = 'https://www.facebook.com/dialog/feed?display=popup&link=' + articlelinkfb + '&picture=' + picturelink + '&name=I%20am%20' + finalresulturl +'!%20How%20Canadian%20are%20you?&description=' + descriptionurl;
                var twitterimage = "https://blog.twitter.com/sites/all/themes/gazebo/img/twitter-bird-white-on-blue.png";
                var facebookimage = "http://0.tqn.com/d/homerenovations/1/0/B/b/-/-/FacebookLogo35x35.jpg";
                $("#finalMessage").append("You are " + finalresult + " <br><br> " + "<img src='" + picturelink + "' width='65%' align='middle'><br><br>" + description + "<br><br>");
                $("#finalMessage").append('Share your results with friends!<br><a href=' + tweet_url + ' target="new"><img src="' + twitterimage + '" alt="Twitter" width="45" align="middle"></a>      <img id="fbshare" src="' + facebookimage + '" alt="fbshare" width="45" align="middle">');		
                $('#fbshare').click(function(event){
                   	FB.ui(
  						{
    					method: 'feed',
    					name: "Whoa! I'm " + finalresult,
    					link: articlelink,
    					picture: picturelink,
    					caption: description,
    					description: "How Canadian Are You?"
  						},
  					function(response) {
    					if (response && response.post_id) {
      					console.log('Post was published.');
    					} else {
      					console.log('Post was not published.');
    					}
  					}
					);
   					elem = $(this);
   					postToFeed(elem.data('title'), elem.data('desc'),
    				elem.prop('href'), 
   					elem.data('image'));

   					return false;
    				});
                postToGoogle();
                $("#finalMessage").fadeIn(1000);
				$("#retryButton").fadeIn(1000);

	}

	$("#retryButton").click(function(event){
		event.preventDefault();
		questionNumber = 0;
		correctAnswers = 0;
		$("#finalMessage").empty();
		$('#questionpic').empty();
		$("#finalMessage").hide();
		$("#retryButton").hide();
		welcomeScreen();
	});
		//posts all of the responses to a google spreadsheet where they can be analyzed later
	    function postToGoogle(){
 			console.log(googleresponses);
             $.ajax({
                url: "https://docs.google.com/forms/d/1ncMQffCCLQXLG7uxYyKm8BmGoKp2lIzevmaTga3Erc8/formResponse",
                data: {"entry.938396450" : googleresponses[0], "entry.1849098404" : googleresponses[1], "entry.1895755317": googleresponses[2], "entry.158499810": googleresponses[3], "entry.1529985336": googleresponses[4], "entry.1866882903": googleresponses[5], "entry.2019095702": googleresponses[6], "entry.941744466": googleresponses[7], "entry.1070228555": googleresponses[8], "entry.616083238": googleresponses[9], "entry.1547363806": googleresponses[10], "entry.239819823": googleresponses[11], "entry.543301743": googleresponses[12]},
                type: "POST",
    			dataType: 'xml',
                crossDomain: true,
                success: function() {
                	console.log("success function");
                }
            });

    }


});