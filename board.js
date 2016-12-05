$(function() {

});

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
  this.validMoves = null,
  this.notices = {}
}

Board.prototype.initiateMove = function() {


}

Board.prototype.calculateValidMoves = function() {

}

Board.prototype.completeMove = function() {

}

Board.prototype.deletePiece = function(square, pieceID) {


}

Board.prototype.switchPlayer = function(currPlayer) {
  var newPlayer = currPlayer === "white" ? "black" : "white";
  this.currPlayer = newPlayer;
  return this.currPlayer;
}

var initBoard = function(){
  var board = new Board();
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
        piece: null
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

var initGame = function() {
  console.log("initing game")
  var board = initBoard();
  initPieces(board);
  return board;
}

console.log(initGame());

