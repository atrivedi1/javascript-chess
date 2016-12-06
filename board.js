$(function() {

});

//BOARD CONSTRUCTOR WHICH CONTAINS THE "STATE" OF A CHESS BOARD
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
    15: { piece: 'Pawn', color: 'white', pieceId: 'BP8' },
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

  this.currentPlayer = "white";
  this.piecesRemaining = {};
  this.squares = [];
  this.rows = [];
  this.columns = [];
  this.moveInProgress = false;
  this.movingPiece = null;
  this.validMoves = [];
}

//BOARD METHODS TO HANDLE GENERAL PIECE SELECTION AND MOVEMENT
//refers to either moving or setting a piece
Board.prototype.handleMove = function(targetSquareId) {
  var targetSquare = this.squares[targetSquareId]
  //if a move is already in progress, then this will amount to setting a piece
  if(this.moveInProgress) {
    //check to see if the desired destination square is included in currentValidMoves
    //if not, cancel move
    if(targetSquareId in this.validMoves) {
      var cancelationNotice = "You cannot make this move. Either your piece is incapable of such a maneuver or there's another piece blocking it"
      return this.cancelMove(cancelationNotice);
    }
    //if so, complete the move
    else { return this.completeMove(targetSquare.id); }
  }
  //if a move is not in progress, this will amount to initiating a move
  else {
    //if no piece is present in the current square, do nothing
    if(!targetSquare.piece) { return; }

    //if piece in target cell does not belong to current player color, cancel move
    if(targetSqaure.piece.color !== this.currentPlayer) {
      var cancelationNotice = "You cannot move your opponent's piece!";
      return this.cancelMove(cancelationNotice);
    }

    var validMoves = this.calculateValidMoves(
      targetSquare,
      this.squares,
      this.rows,
      this.columns.
      this.currentPlayer
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
      this.movingPiece = targetSqaure.piece;
      this.validMoves = validMoves;
    }
  }
}

Board.prototype.calculateValidMoves = function(targetSqaure, sqaures, rows, columns, currPlayer) {
  //need to figure out how to wire this up to chess Pieces
}

//used to set piece on board once a valid move is completed
Board.prototype.completeMove = function(destinationSquareIndex) {
  //step1: remove piece from old location
  var oldSqaure = this.squares[this.movingPiece.locationOnBoard]
  oldSquare.piece = null;

  //step2: delete any pieces from new location if there are any
  var newSquare = this.squares[destinationSquareIndex];

  if(newSquare.piece) {
    delete this.pieces[newSquare.piece.id]
  }

  //step3: move piece to new location
  newSquare.piece = this.movingPiece;
  newSquare.piece.locationOnBoard = newSquare.id;

  //step4: udpate state of the board
  this.moveInProgress = false;
  this.movingPiece = null;
  this.validMoves = [];
  this.switchPlayer();
}

Board.prototype.cancelMove = function(notificationString) {
  this.moveInProgress = false;
  this.movingPiece = null;
  this.validMoves = [];

  return notification(notificationString);
}

Board.prototype.deletePiece = function(square, pieceId) {
  //come back to this!!!
}

//FUNCTIONALITY TO SWITCH PLAYERS AFTER A MOVE HAS BEEN COMPLETED
Board.prototype.switchPlayer = function(currPlayer) {
  var newPlayer = currPlayer === "white" ? "black" : "white";
  this.currPlayer = newPlayer;
  return this.currPlayer;
}

//BOARD SET UP FUNCTIONALITY
var initBoard = function(){
  var board = new Board();

  //in case I have time to implement an input form that will enable a player to input
  //what move they'd like to make based on a standard chess x & y axis
  var columnNames = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var squareId = 0;

  for(var i = 0; i < 8; i++) {
    board.rows[i] = [];
    board.columns[i] = [];
  }

  for(var j = 0; j < 8; j++) {
    for(var k = 0; k < 8; k++) {

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
      squareId++;
    }
  }

  return board;
}

var initPieces = function(board) {
  console.log("initing pieces")

  for(var squareId in board.initialSetup) {

    var piece = {
      locationOnBoard: squareId,
      type: board.initialSetup[squareId]['piece'],
      color: board.initialSetup[squareId]['color'],
      id: board.initialSetup[squareId]['pieceId']
    }

    board.squares[squareId]['piece'] = piece;
    board.piecesRemaining[squareId] = piece;
  }
}

var setDiagonals = function(board) {

  //find all diagonal squares for a given square that are in bounds
  board.squares.forEach(function(square) {
    square.diagonals.topLeftPieceId = (board.rows[square.row - 1] && board.columns[square.col - 1]) ?
      board.rows[square.row - 1][square.col - 1] :
      null;

    square.diagonals.topRightPieceId = (board.rows[square.row - 1] && board.columns[square.col + 1]) ?
      board.rows[square.row - 1][square.col +  1] :
      null;

    square.diagonals.bottomLeftPieceId = (board.rows[square.row + 1] && board.columns[square.col - 1]) ?
      board.rows[square.row + 1][square.col - 1] :
      null;

    square.diagonals.bottomRightPieceId = (board.rows[square.row + 1] && board.columns[square.col + 1]) ?
      board.rows[square.row + 1][square.col + 1] :
      null;
  })
}

var initGame = function() {
  console.log("initing game")

  var board = initBoard();
  initPieces(board);
  setDiagonals(board);
  return board;
}

console.log(initGame());

