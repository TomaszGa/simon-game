var interval;
$(document).ready(function () {

	$("#startButton").click(function(){
		simonGame.randomToPattern();
		simonGame.updateScore();
		simonGame.playPatterns();
		simonGame.activateResetButton();
	});
	$(".btn-strict").click(function(){
		simonGame.changeStrict();
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
		new Audio("assets/audio/simonSound" + simonGame.pattern[i] + ".mp3").play();		

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
			this.lockInput();
			$(".game-button").click(function(){
			var inputValue = $(this).attr("val");
			new Audio("assets/audio/simonSound" + inputValue + ".mp3").play();		
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
		if(this.playerScore>=20){
			$(".score-display").html("WIN");				
			setTimeout(function(){
				simonGame.resetGame();				
			}, 1000);
		} else{
			$(".score-display").html(this.playerScore);			
		}

	},

	correctInput: function(){
		this.playerScore += 1;
		this.lockInput();			
		this.updateScore();
		if(this.playerScore<=20){
		this.randomToPattern();
		this.playPatterns();
		}
	},

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

	getRandomInt: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	activateResetButton: function(){
		$("#startButton").off("click");
		$("#startButton").click(function(){
			simonGame.resetGame();
		});
	},

	changeStrict: function(){
		if (this.strictMode === false){
		$(".strict-light").css("background-color", "red");
		}
		else{
		$(".strict-light").css("background-color", "black");			
		}
		this.strictMode = !this.strictMode;		
	},

	resetGame: function(){
		console.log("GAME RESET");
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

	}

}	