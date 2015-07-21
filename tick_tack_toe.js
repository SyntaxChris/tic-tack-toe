$(document).ready(function(){
	var board = [0,0,0,
				 0,0,0,
				 0,0,0];

	function getRandomInt(min, max) {
		// randomize difference between min and max range and make lowest possible int set to min int
    	return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// winning index combinations
	// horizontal
	// 0,1,2
	// 3,4,5
	// 6,7,8

    // vertical
	// 0,3,6
	// 1,4,7
	// 2,5,8
	
    // diagnal
	// 0,4,8
	// 2,4,6

	// start - first index of row, skip - number of indexes skipped, player - "X" or "O"
	function checkForWinner(start, skip, player){
		var rowFillCount = 0;
		var firstIndex = start;
		this.winner = false;

		for (var i = 0; i < 3; i++) {
			if(board[firstIndex] === player){
				rowFillCount += 1;
				if(rowFillCount === 3){
					this.winner = true;
				};
			};
			firstIndex += skip;
		};
	};

	$('.tile').on('click', function(){
		var tile = $(this),
		position = tile.data('index');

		if (tile.text() === "") {
			// insert player letter
			tile.text("X");
            // check if X wins
            var xWins = [
				// horizontal rows
				new checkForWinner(0,1,"X"),
				new checkForWinner(3,1,"X"),
				new checkForWinner(6,1,"X"),
				// vertical rows
				new checkForWinner(0,3,"X"),
				new checkForWinner(1,3,"X"),
				new checkForWinner(2,3,"X"),
				// diagnal rows
				new checkForWinner(0,4,"X"),
				new checkForWinner(2,2,"X")
			];

			// check xWins array for a winning row
			for(var i = 0; i < 8; i++){
				if(xWins[i].winner === true){
					alert("X WINS!")
				};
			};

			// insert random computer player letter
			for (var i = 0; i < board.length; i++) {
				var randomIndex = getRandomInt(0,8),
				    randomPosition = board[randomIndex],
				    randomTile = $('.tile[data-index='+randomIndex+']');

			    if (randomPosition === 0) {
			    	board[randomIndex] = "O";
			    	$('.tile[data-index='+randomIndex+']').text("O");
			    	break;
			    };
			};

			// check if O wins
			var oWins = [
				// horizontal rows
				new checkForWinner(0,1,"O"),
				new checkForWinner(3,1,"O"),
				new checkForWinner(6,1,"O"),
				// vertical rows
				new checkForWinner(0,3,"O"),
				new checkForWinner(1,3,"O"),
				new checkForWinner(2,3,"O"),
				// diagnal rows
				new checkForWinner(0,4,"O"),
				new checkForWinner(2,2,"O")
			];

			for(var i = 0; i < 8; i++){
				if(oWins[i].winner === true){
					alert("O WINS!")
				};
			};
		} else {
			alert("choose another spot");
		};		
	});
});

