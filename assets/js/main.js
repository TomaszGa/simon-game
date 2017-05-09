var interval;
$(document).ready(function () {
	//initialize first round on click and change start button into reset button
	$("#startButton").click(function(){
		simonGame.randomToPattern();
		simonGame.updateScore();
		simonGame.playPatterns();
		simonGame.activateResetButton();
	});
	//setup for strict mode button
	$(".btn-strict").click(function(){
		simonGame.changeStrict();
	});
});
	
var simonGame = {

	//variable initialization
	pattern: [],
	playerPattern: [],
	playerScore: 1,
	strictMode: false,

	//adds random element to pattern
	randomToPattern: function(){
		this.pattern.push(this.getRandomInt(1, 4))
	},

	//refreshes the score display element, checks for win condition
	updateScore: function(){
		if(this.playerScore>=20){
			$(".score-display").html("WIN!");				
			setTimeout(function(){
				simonGame.resetGame();				
			}, 1000);
		} else{
			$(".score-display").html(this.playerScore);			
		}

	},

	//plays whole currently stored pattern
	playPatterns: function(){
		//blinks current button
		function blinkButton(){	
		var buttonID = "#gameButton" + simonGame.pattern[i];
		new Audio("assets/audio/simonSound" + simonGame.pattern[i] + ".mp3").play();		
		$(buttonID).addClass("button-active").delay(600).queue(function(){
			$(this).removeClass("button-active").dequeue();
		});
		//stop if whole pattern played and activate player input
		if (i >= simonGame.pattern.length - 1	){
			clearInterval(interval);
			simonGame.clearPlayerPattern();
			simonGame.unlockInput();
			}
		}
		var i = 0;
		var interval = setInterval(function (){
			blinkButton();
			i++			
		}, 1000);

	},

	//make reset button active
	activateResetButton: function(){
		$("#startButton").off("click");
		$("#startButton").click(function(){
			simonGame.resetGame();
		});
	},

	//switch strict gamemode and light effect
	changeStrict: function(){
		if (this.strictMode === false){
		$(".strict-light").css("background-color", "red");
		}
		else{
		$(".strict-light").css("background-color", "black");			
		}
		this.strictMode = !this.strictMode;		
	},

	//clears player input for current round
	clearPlayerPattern: function(){
		this.playerPattern = [];
	},

	//enables player input
	unlockInput: function(){
			this.lockInput(); //safety to prevent double input
			$(".game-button").click(function(){
			var inputValue = $(this).attr("val");
			new Audio("assets/audio/simonSound" + inputValue + ".mp3").play();		
			simonGame.playerPatternInput(inputValue);
		});
		
	},

	//removes previous on click events from game buttons
	lockInput: function(){
		$(".game-button").off("click");
	},

	//adds player input to array 
	playerPatternInput: function(value){
		this.playerPattern.push(Number(value));
		this.compareInput();	
		//locks input if full length for this round reached			
		if(this.playerPattern.length === this.pattern.length){
			this.lockInput();
		}
	},

	//compares last entered element with matching element of correct pattern
	compareInput: function(){
	var currentLength = this.playerPattern.length-1;
	if (this.pattern[currentLength] !== this.playerPattern[currentLength]){
		this.wrongInput();
	} else if (this.playerPattern.length === this.pattern.length) {
		this.correctInput();
		}
	},

	//on wrong input display error message and replay pattern or start over depending on strict strictMode
	wrongInput: function(){
		$(".score-display").html("ERR");
		this.lockInput();		
		if(this.strictMode === false){
			setTimeout(function(){
				simonGame.updateScore();
			}, 1000);
			simonGame.clearPlayerPattern();
			simonGame.playPatterns();
		} else {
			simonGame.lockInput();
			simonGame.resetGame();
		}	

	},

	//on correct input add score and continue game
	correctInput: function(){
		//
		this.playerScore += 1;
		this.lockInput();			
		this.updateScore();
		//to prevent play after win conditions
		if(this.playerScore<=20){
		this.randomToPattern();
		this.playPatterns();
		}
	},

	//full reset of the game to round 1
	resetGame: function(){
		clearInterval(interval);		
		setTimeout(function(){
			$(".score-display").html("---");		
			simonGame.pattern = [];
			simonGame.playerScore = 1;
			simonGame.lockInput();
			simonGame.updateScore();			
			simonGame.clearPlayerPattern();
			simonGame.randomToPattern();
			simonGame.playPatterns();
		}, 2000);

	},

		//random number within given range
	getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}

}	