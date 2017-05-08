var interval;

$(document).ready(function () {

	$("#startButton").click(function(){
		simonGame.randomToPattern();
		simonGame.playPatterns();
	});

});

	var simonGame = {
		pattern: [],
		playerPattern: [],
		playerScore: 1,
		strictMode: false,

		playPatterns: function(){

		function blinkButton(){	
		var buttonID = "#gameButton" + simonGame.pattern[i];
		$(buttonID).addClass("button-active").delay(600).queue(function(){
			$(this).removeClass("button-active").dequeue();
		});
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

	clearPlayerPattern: function(){
		this.playerPattern = [];
	},


	playerPatternInput: function(value){
		this.playerPattern.push(Number(value));
		this.compareInput();				
		if(this.playerPattern.length === this.pattern.length){
			this.lockInput();
		}
	},

	unlockInput: function(){
			$(".game-button").click(function(){
			var inputValue = $(this).attr("val");
			simonGame.playerPatternInput(inputValue);
		});
		
	},

	lockInput: function(){
		$(".game-button").off("click");
	},

	compareInput: function(){
	var currentLength = this.playerPattern.length-1;
	if (this.pattern[currentLength] !== this.playerPattern[currentLength]){
		this.wrongInput();
	} else if (this.playerPattern.length === this.pattern.length) {
			this.correctInput();
		}
	},

	randomToPattern: function(){
		this.pattern.push(this.getRandomInt(1, 4))
	},

	updateScore: function(){
		this.playerScore += 1;
		$(".score-display").html(this.playerScore);
	},

	correctInput: function(){
		this.updateScore();
		this.randomToPattern();
		this.lockInput();
		this.playPatterns();
	},

	wrongInput: function(){
		this.lockInput();
		this.clearPlayerPattern();
		this.playPatterns();
	},

	getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}	

}	