(function() {
"use strict";

// Variables
var Question = [];
var Counter, PlayerScore, guessed, pressed;
var choicebuttons = ['choice0', 'choice1', 'choice2', 'choice3'];
var Create = {
	TheGreatBox: function() {
		var newEl = document.createElement('div');
		newEl.id = "Box";
		// newEl.className	= "container-fluid";

		var position = $('body')[0];
		position.appendChild(newEl);
	},

	Title: function() {
		var newEl = document.createElement('div');
		newEl.className = "quiz";
		var newDiv = document.createElement('h1');
		newDiv.className = "text-center";
		newEl.appendChild(newDiv);
		var Text = document.createTextNode("Quizerino");
		newDiv.appendChild(Text);
		$('body').before(newEl);
	},
	Info: function() {
		var newEl = document.createElement('div');
		newEl.className = "row";
		var heighter = document.createElement('div');
		heighter.id	 = "heighter";
		heighter.className = "heighter";
		var questiondiv = document.createElement('div');
		questiondiv.className = "col-xs-12 quiz";
		var question = document.createElement('h1');
		question.id = "question";
		question.className = "text-center";
		questiondiv.appendChild(question);
		newEl.appendChild(heighter);
		newEl.appendChild(questiondiv);
		var position = $('#Box')[0];

		position.appendChild(newEl);
	},

	QuestionCounter: function() {

		var newEl = document.createElement('div');
		newEl.className = "col-xs-6 quiz";
		var Progress = document.createElement('div');
		Progress.id = "progressbar";
		newEl.appendChild(Progress);
		// Find the position where the new element should be added.
		var position = $('#heighter')[0];

		// Insert the new element into its position.
		position.appendChild(newEl);
	},
	ScoreBoard: function() {
		var newEl = document.createElement('div');
		newEl.className = "col-xs-6 quiz";
		var newDiv = document.createElement('div');
		newDiv.id = "Score";
		newDiv.className = "text-center";
		newEl.appendChild(newDiv);
		// Find the position where the new element should be added.
		var position = $('#heighter')[0];


		// Insert the new element into its position.
		position.appendChild(newEl);
	},

	MultiChoice: function() {
		var newEl = document.createElement('div');
		newEl.className = "row";
		var newDiv = document.createElement('div');
		newDiv.className = "container col-xs-12 quiz";
		var choices = document.createElement('div');
		choices.id = "choices";
		choices.className = "row col-xs-12";
		newDiv.appendChild(choices);
		newEl.appendChild(newDiv);

		var position = $('#Box')[0];

		position.appendChild(newEl);
	}
}


function Quizer(question, choices, correctAnswer){
	this.question = question;
	this.choices = choices;
	this.correctAnswer = correctAnswer;

}
function NewQuestion(question, choices, correctAnswer){
	Question.push(new Quizer(question, choices, correctAnswer));
}
// Dummy Questions
NewQuestion("Which Apollo mission landed the first humans on the Moon?", [ "Apollo 7", "Apollo 9", "Apollo 11","Apollo 13"], 2);
NewQuestion("Who is the founder of Apple?", ["Stevo", "Steve Jobs", "Thomas Edison", "Magnus Carlsen"], 1);
NewQuestion("Toy Story 1 was released before 2000", ["True", "False"], 0);
NewQuestion("Hvaða landshluta á Íslandi er talið að Bergrisi verndi", ["Norðurland", "Vesturland", "Suðurland", "Austurlands"], 2);
NewQuestion("What would the Kool-Aid Man yell when bursting through a wall?", ["Oh No!", "Oh Yeah!", "Where am i?", "Who are you?"], 1);
NewQuestion("What is the second most popular beverage in the world?", ["Coffee", "Beer", "Milk", "Tea"], 3);
NewQuestion("What letter gets the fewest words in most dictionaries?", ["X", "Y", "Z", "Q"], 0);
NewQuestion("How much time does Link have to defeat Skull Kid in Majora's Mask?", ["6 days", "1 week", "24 hours", "3 days"], 3);

function shuffle(array) {
	var j, x, i;
    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
}

function DisplayQuestion(number) {
	var Quizmaster = $('#question')[0];
	Quizmaster.textContent = Question[number].question;
	// Create a new element and store it in a variable.
	if (Counter != 0) {
		for (var i = 0; i < Question[number - 1].choices.length; i++) {
		var thischoice = document.getElementById("choice" + i);
		var thischoiceparent = thischoice.parentNode;
		thischoiceparent.removeChild(thischoice);
		}
	}
	for (var i = 0; i < Question[number].choices.length; i++) {
		var newEl = document.createElement('div');
		newEl.className = "choice col-xs-5 col-xs-offset-1 text-center";
		newEl.id = "choice" + i;
		// Create a text node and store it in a variable.
		var newText = document.createTextNode(Question[number].choices[i]);
		// Attach the new text node to the new element.
		newEl.appendChild(newText);
		// Find the position where the new element should be added.
		var position = $('#choices')[0];

		// Insert the new element into its position.
		position.appendChild(newEl);
	}
}

function Progressbar(number) {
	$( "#progressbar" ).progressbar({
      value: ((100 / Question.length) * number)
    });
}

function LoadScoreBoard() {
	var PrintScore = $('#Score')[0];
	PrintScore.textContent = "Stig:" + PlayerScore;
}

function CheckAnswer(e) {
	var target, correct;
	target = e.target;
	if (target.id != "choices" && target.id != "NewGame") {
		if (target.textContent === Question[Counter].choices[Question[Counter].correctAnswer] && pressed == false) {
		target.className += " correct";
		pressed = true
		if(guessed == false) {
			PlayerScore += 1;
			Progressbar(Counter);
			setTimeout(NextQuestion, 500);
		}
		else {
			setTimeout(NextQuestion, 500);
		}
		}
		else
		{
			if (pressed == false) {
				target.className += " incorrect";
				if (guessed == false) {
					guessed = true;
				}
			}
		}
	}
	
}

function NextQuestion(e) {
	if((Counter + 1) != Question.length) {
		Counter += 1;
		Progressbar(Counter);
		DisplayQuestion(Counter);
		LoadScoreBoard();
		pressed = false;
		guessed = false;
	}
	else {
		End();
	}
}
function End(e) {
		Progressbar(Counter + 1)
		LoadScoreBoard()
		jQuery.each( choicebuttons, function(i, takki) {
			$("#" + takki).animate({opacity: 0,left: "+=200",height: "toggle"}, 5000).promise().done(function(){
			for (var i = 0; i < Question[Counter].choices.length; i++) {
			var thischoice = document.getElementById("choice" + i);
			var thischoiceparent = thischoice.parentNode;
			thischoiceparent.removeChild(thischoice);
			}
			var Headline = $('#question')[0];
			if(PlayerScore == (Counter + 1)){
				Headline.textContent = "Vel gert! svaraðir öllu réttu!";
			}
			else if(PlayerScore	== 0)
			{
				Headline.textContent = "Held þú getur betur enn þetta..";
			}
			else
			{
				Headline.textContent = "Kemur betur næst.";
			}
			var NewBeginning = document.createElement('div');
			NewBeginning.className = "choice col-xs-12";
			NewBeginning.id = "NewGame";
			var NewGame = document.createTextNode("Do you want to Start Over?");
			NewBeginning.appendChild(NewGame);
			var position = $('#choices')[0];
			position.appendChild(NewBeginning);
			$('#NewGame').on('click', StartOver);
		});
		});
}

function StartOver() {
	var startover = document.getElementById("NewGame");
	var thischoiceparent = startover.parentNode;
	thischoiceparent.removeChild(startover);
	shuffle(Question);
	init()
}

function init() {
	Counter = 0;
	PlayerScore = 0;
	guessed = false;
	pressed = false;
	shuffle(Question);
	Progressbar(Counter);
	DisplayQuestion(Counter);
	LoadScoreBoard();
	$('#choices').on("click", CheckAnswer);
}

function Creator() {
	Create.TheGreatBox();
	Create.Title();
	Create.Info();
	Create.ScoreBoard();
	Create.QuestionCounter();
	Create.MultiChoice();
}
function Start() {
	Creator();
	init();
}

$(document).ready(Start);
})();