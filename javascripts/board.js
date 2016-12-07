$(document).ready(function () {

  /******BOARD DOM VARIABLES******/

  var chessBoard = document.getElementById("chess_board");
  var chessSqaures = chessBoard.children;
  var resetButton = document.getElementById("reset_button");

  /******BOARD CONSTRUCTOR WHICH CONTAINS THE "STATE" OF A CHESS BOARD******/

  var Board = function() {
    this.initialSetup = {
      0: { piece: 'Rook', color: 'black', pieceId: 'BR1' },
      1: { piece: 'Knight', color: 'black', pieceId: 'BH1' },
      2: { piece: 'Bishop', color: 'black', pieceId: 'BB1' },
      3: { piece: 'Queen', color: 'black', pieceId: 'BQ1' },
      4: { piece: 'King', color: 'black', pieceId: 'BK1' },
      5: { piece: 'Bishop', color: 'black', pieceId: 'BB2' },
      6: { piece: 'Knight', color: 'black', pieceId: 'BH2' },
      7: { piece: 'Rook', color: 'black', pieceId: 'BR2' },
      8: { piece: 'Pawn', color: 'black', pieceId: 'BP1' },
      9: { piece: 'Pawn', color: 'black', pieceId: 'BP2' },
      10: { piece: 'Pawn', color: 'black', pieceId: 'BP3' },
      11: { piece: 'Pawn', color: 'black', pieceId: 'BP4' },
      12: { piece: 'Pawn', color: 'black', pieceId: 'BP5' },
      13: { piece: 'Pawn', color: 'black', pieceId: 'BP6' },
      14: { piece: 'Pawn', color: 'black', pieceId: 'BP7' },
      15: { piece: 'Pawn', color: 'black', pieceId: 'BP8' },
      48: { piece: 'Pawn', color: 'white', pieceId: 'WP1' },
      49: { piece: 'Pawn', color: 'white', pieceId: 'WP2' },
      50: { piece: 'Pawn', color: 'white', pieceId: 'WP3' },
      51: { piece: 'Pawn', color: 'white', pieceId: 'WP4' },
      52: { piece: 'Pawn', color: 'white', pieceId: 'WP5' },
      53: { piece: 'Pawn', color: 'white', pieceId: 'WP6' },
      54: { piece: 'Pawn', color: 'white', pieceId: 'WP7' },
      55: { piece: 'Pawn', color: 'white', pieceId: 'WP8' },
      56: { piece: 'Rook', color: 'white', pieceId: 'WR1' },
      57: { piece: 'Knight', color: 'white', pieceId: 'WH1' },
      58: { piece: 'Bishop', color: 'white', pieceId: 'WB1' },
      59: { piece: 'Queen', color: 'white', pieceId: 'WQ1' },
      60: { piece: 'King', color: 'white', pieceId: 'WK1' },
      61: { piece: 'Bishop', color: 'white', pieceId: 'WB2' },
      62: { piece: 'Knight', color: 'white', pieceId: 'WH2' },
      63: { piece: 'Rook', color: 'white', pieceId: 'WR2' },
    }

    this.currPlayer = "white";

    this.piecesRemaining = {
      "white": { "Pawn": {}, "Rook": {}, "Knight": {}, "Bishop": {}, "Queen": {}, "King": {} },
      "black": { "Pawn": {}, "Rook": {}, "Knight": {}, "Bishop": {}, "Queen": {}, "King": {} }
    };

    this.squares = [];
    this.rows = [];
    this.columns = [];
    this.moveInProgress = false;
    this.movingPiece = null;
    this.validMoves = [];
    this.gameOver = false;
  }

  /******BOARD METHODS TO HANDLE GENERAL PIECE SELECTION AND MOVEMENT******/

  //handle the selection and placement of a piece on the board
  Board.prototype.handleMove = function(targetSquareId) {
    //if game is over prevent any additional moves from taking place
    if(this.gameOver) { return; }

    //reset notifications on any move attempt
    closeNotification();

    //if game is still going, set target sqare based on where user clicked
    var targetSquare = this.squares[targetSquareId]

    //if a move is already in progress, then this will amount to setting a piece
    if(this.moveInProgress) {
      //check to see if the desired destination square is included in current ValidMoves
      //if not, cancel move
      if(this.validMoves.indexOf(targetSquareId) === -1) {
        var cancelationNotice = "You cannot make this move. Either your piece is incapable of such a maneuver or there's another piece blocking it."
        return this.cancelMove(cancelationNotice);
      }
      //if so, complete the move
      else { return this.completeMove(targetSquareId); }
    }
    //if a move is NOT in progress, this will amount to initiating a move
    else {
      //if no piece is present in the current square, do nothing
      if(!targetSquare.piece) { return; }

      //if piece in target sqaure does NOT belong to current player color, cancel move
      if(targetSquare.piece.color !== this.currPlayer) {
        var cancelationNotice = "You cannot move your opponent's piece!";
        return this.cancelMove(cancelationNotice);
      }

      //If piece in target square DOES belong to current player, determine
      //all valid moves
      var validMoves = targetSquare.piece.calculateValidMoves(
        targetSquare,
        this.squares,
        this.rows,
        this.columns,
        this.currPlayer
      );

      //if there are no valid moves for the selected piece cancel move
      if(!validMoves.length) {
        var cancelationNotice = "Unfortunately this piece has nowhere to go!";
        return this.cancelMove(cancelationNotice);
      }

      //if there ARE valid moves, change the state of the board to reflect the piece
      //to be moved
      else {
        this.moveInProgress = true;
        this.movingPiece = targetSquare.piece;
        this.validMoves = validMoves;
      }
    }
  }

  //set piece on board if a valid move is completed
  Board.prototype.completeMove = function(destinationSquareId) {
    //step1: remove piece from old location
    var oldSquareLocation = this.movingPiece.locationOnBoard;
    var oldSquare = this.squares[oldSquareLocation]
    var oldSquareInBrowser = document.getElementById(oldSquareLocation);
    var pieceInOldSquare = document.getElementById(oldSquare.piece.id);

    oldSquare.piece = null;
    oldSquareInBrowser.childNodes[0].remove();

    //step2: delete existing piece in new location if there is one (note: i.e. opponent's piecE)
    var newSquare = this.squares[destinationSquareId];
    var newSquareInBrowser = document.getElementById(destinationSquareId);

    if(newSquare.piece) {
      //opponent's piece information
      var opponent = this.currPlayer === "white" ? "black" : "white";
      var type = newSquare.piece.type;
      var id = newSquare.piece.id;

      //delete opponent's piece and remove the corresponding image from the DOM
      delete this.piecesRemaining[opponent][type][id];
      //TODO: if i had more time, would create a delete piece function vs. accessing childNodes
      newSquareInBrowser.childNodes[0].remove();

      //if piece that is taken is the king, the game is over
      if(type === "King") {
        this.gameOver = true;
        notification("Game over. The King is dead!!");
      }
    }

    //step3: move current player's piece to new location
    newSquare.piece = this.movingPiece;
    newSquare.piece.locationOnBoard = destinationSquareId;
    newSquareInBrowser.append(pieceInOldSquare);

    //step4: udpate state of the board
    this.moveInProgress = false;
    this.movingPiece = null;
    this.validMoves = [];
    this.switchPlayer(this.currPlayer);
    turnTracker(this.currPlayer);
  }

  //cancel an invalid move
  Board.prototype.cancelMove = function(notificationString) {
    //reset state of board given that an invalid move has been attempted
    this.moveInProgress = false;
    this.movingPiece = null;
    this.validMoves = [];

    //notify user that an invalid move has been attempted
    return notification(notificationString);
  }

  /*****FUNCTIONALITY TO SWITCH PLAYERS AFTER A MOVE HAS BEEN COMPLETED*****/

  Board.prototype.switchPlayer = function(currPlayer) {
    var newPlayer = currPlayer === "white" ? "black" : "white";
    this.currPlayer = newPlayer;
    return this.currPlayer;
  }

  /*****BOARD SET UP FUNCTIONALITY*****/

  //build chess board
  var initBoard = function(){
    var board = new Board();

    //TODO: in case I have time to implement an input form that will enable a player to input
    //what move they'd like to make based on a standard chess x & y axis
    var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    var squareId = 0;
    var squareColor = "white";

    //create 8 empty rows and columns for the chess board
    for(var i = 0; i < 8; i++) {
      board.rows[i] = [];
      board.columns[i] = [];
    }

    //add 64 squares to the board
    for(var j = 0; j < 8; j++) {
      //TODO: if I had more time, would abstract out this element creation logic to a separate function
      var newRow = document.createElement("tr");

      for(var k = 0; k < 8; k++) {
        //switch color of square only if it's not the first square in a row; otherwise
        //keep it the same as the last square in the previous row
        if(k !== 0) {
          squareColor = squareColor === "white" ? "black" : "white";
        }

        //build out object to represent square
        var square = {
          id: squareId,
          chessId: String(columnNames[k] + (8-j)),
          row: j,
          col: k,
          piece: null,
          diagonals: {}
        }

        board.squares[squareId] = square;
        board.rows[j][k] = square;
        board.columns[k][j] = square;

        //display square on page
        var newSquare = document.createElement("td");
        newSquare.setAttribute("class", squareColor)
        newSquare.setAttribute("id", squareId);

        //add onclick functionality to each square
        newSquare.onclick = function(event) {
          var idOfClickedSquare = Number($(this).attr("id"));
          board.handleMove(idOfClickedSquare);
        }

        newRow.append(newSquare);

        //increment squareId
        squareId++;
      }
      //append newly filled out row to the chessBoard in the DOM
      chessBoard.append(newRow);
    }
    return board;
  }

  //place pieces on the board based on initial setup requirements
  var initPieces = function(board) {

    for(var squareId in board.initialSetup) {
      //parameters for each piece on board
      var locationOnBoard = squareId;
      var type = board.initialSetup[squareId]['piece'];
      var color =  board.initialSetup[squareId]['color'];
      var id = board.initialSetup[squareId]['pieceId'];
      var piece;

      //switch statement to build each piece instance
      switch(type) {
        case "Pawn":
          piece = new Pawn(locationOnBoard, type, color, id);
          break;

        case "Rook":
          piece = new Rook(locationOnBoard, type, color, id);
          break;

        case "Knight":
          piece = new Knight(locationOnBoard, type, color, id);
          break;

        case "Bishop":
          piece = new Bishop(locationOnBoard, type, color, id);
          break;

        case "Queen":
          piece = new Queen(locationOnBoard, type, color, id);
          break;

        case "King":
          piece = new King(locationOnBoard, type, color, id);
          break;
      }

      board.piecesRemaining[color][type][id] = piece;
      board.squares[squareId]['piece'] = piece;

      //display pieces on board
      var newPieceImageContainer = document.createElement("img");
      var pieceToRender = piece.id.slice(0,2);
      newPieceImageContainer.setAttribute("src", './pieces/' + pieceToRender + ".png")
      newPieceImageContainer.setAttribute("class", "chess_piece");
      newPieceImageContainer.setAttribute("id", piece.id);

      var squareOnWhichPieceIsToBePlaced = document.getElementById(squareId);
      squareOnWhichPieceIsToBePlaced.append(newPieceImageContainer);
    }
  }

  //for each piece determine diagonal sqaures (will be used for determine valid diagonal movements)
  var setDiagonals = function(board) {
    //find all diagonal squares for a given square that are in bounds
    board.squares.forEach(function(square) {
      square.diagonals.topLeft = (board.rows[square.row - 1] && board.columns[square.col - 1]) ?
        board.rows[square.row - 1][square.col - 1] :
        null;

      square.diagonals.topRight = (board.rows[square.row - 1] && board.columns[square.col + 1]) ?
        board.rows[square.row - 1][square.col +  1] :
        null;

      square.diagonals.bottomLeft = (board.rows[square.row + 1] && board.columns[square.col - 1]) ?
        board.rows[square.row + 1][square.col - 1] :
        null;

      square.diagonals.bottomRight = (board.rows[square.row + 1] && board.columns[square.col + 1]) ?
        board.rows[square.row + 1][square.col + 1] :
        null;
    })
  }

  //initialize the game
  var initGame = function() {
    var board = initBoard();
    initPieces(board);
    setDiagonals(board);
    turnTracker(board.currPlayer);

    return board;
  }

  //reset board by refreshing page
  //TODO with additional time would fix this so page didn't need to refresh
  resetButton.onclick = function(event) {
    window.location.reload();
  }

  initGame();
});
