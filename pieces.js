//NOTE: ES6 classes probably cleaner/easier to use. Will refactor if I have time

//PARENT CHESSPIECES CLASS
var ChessPieces = function(pieceType, color) {
  this.type = pieceType;
  this.color = color;
}

ChessPieces.prototype.movePieceDiagonally = function(start, diagonalSquare, direction, currPlayer) {
  var validMoves = [];

  var diagonalMoveChecker = function(diagonalSquare, direction) {
    if(diagonalSquare === null || diagonalSquare === start) { return; }

    //if piece exists on diagonal, only valid if the piece belongs to the opponent
    if(diagonalSquare.piece) {
      if(diagonalSquare.piece.color !== currPlayer) {
        validMoves.push(diagonalSquare.id)
        return;
      } else {
        return;
      }
    }
    //if no pieces exists on diagonal, add next diagonal sqaure to validMoves and recurse
    else {
      validMoves.push(diagonalSquare.id);
      diagonalMoveChecker(diagonalSquare[direction], direction)
    }
  }

  diagonalMoveChecker(diagonalSquare, direction);
  return validMoves;
}

ChessPieces.prototype.movePieceUpOrDown = function(startSquare, rows, cols, currPlayer) {
  var validMoves = [];

  //all sqaures above, below, to the right, and to the left of current square
  var up = cols[startSquare.col].slice(0, startSquare.row).reverse();
  var right = rows[startSqaure.row].slice(startSquare.col + 1);
  var down = cols[startSquare.col].slice(startSqaure.row+1);
  var left = rows[startSquare.row].slice(0, startSqaure.col).reverse();

  //helper function to calculate all valid moves
  var horizontalAndVerticalMoveChecker = function(sqauresToCheck) {

    for(var i = 0; i < sqauresToCheck.length; i++) {
      var currSqaure = squaresToCheck[i];

      //if current square being checked has opponent's piece on it, add to valid moves
      //otherwise break;
      if(currSquare.piece) {
        if(currSqaure.piece.color !== currPlayer){
          validMoves.push(currSquare.id);
          break;
        } else {
          break;
        }
      }
      //if current sqaure doesnt have any pieces on it, then keep adding to valid moves
      else {
        validMoves.push(currSquare.id)
      }
    }
  }

  //check all sqaures above, below, to the right, and to the left of current sqaure
  horizontalAndVerticalMoveChecker(up);
  horizontalAndVerticalMoveChecker(right);
  horizontalAndVerticalMoveChecker(down);
  horizontalAndVerticalMoveChecker(left);

  return validMoves;
}

//SUBCLASSES FOR INDIVIDUAL PIECES
//Pawn
var Pawn = function() {

  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    var validMoves = [];

    //if pawn is white...
    if(currPlayer === "white") {
      //...and in the start row it can move up to two spaces vertically
      if(startSquare.id >= 48 && startSquare.id <= 55){
        if(squares[startSquare.id - 8] && !squares[startSquare.id - 8].piece) {
          validMoves.push(startSquare.id - 8);
        }

        if(squares[startSquare.id - 16] && !squares[startSquare.id - 16].piece) {
          validMoves.push(startSquare.id - 16);
        }
      }

      //...if not it can only move one space vertically
      else {
        if(squares[startSquare.id - 8] && !squares[startSqaure.id - 8].piece) {
          validMoves.push(startSquare.id - 8);
        }
      }

      //in call cases, a pawn can attack diagonally
      if(startSqaure.diagonals.topLeft &&
        startSquare.diagonals.topLeft.piece &&
        startSquare.diagonals.topLeft.piece.color !== currPlayer) {

        validMoves.push(start.topLeft.id)
      }

      if(startSqaure.diagonals.topRight &&
        startSquare.diagonals.topRight.piece &&
        startSquare.diagonals.topRight.piece.color !== currPlayer) {

        validMoves.push(start.topRight.id)
      }
    }

    //else if pawn is black...
    else {
      //...and is in start row
      if(startSquare.id >= 8 && startSquare.id <= 15){
        if(squares[startSquare.id + 8] && !squares[startSquare.id + 8].piece) {
          validMoves.push(startSquare.id + 8);
        }

        if(squares[startSquare.id + 16] && !squares[startSquare.id + 16].piece) {
          validMoves.push(startSquare.id + 16);
        }
      }

      //...if not it can only move one space vertically
      else {
        if(squares[startSquare.id + 8] && !squares[startSqaure.id + 8].piece) {
          validMoves.push(startSquare.id + 8);
        }
      }

      //in call cases, a pawn can attack diagonally
      if(startSqaure.diagonals.bottomLeft &&
        startSquare.diagonals.bottomLeft.piece &&
        startSquare.diagonals.bottomLeft.piece.color !== currPlayer) {

        validMoves.push(start.bottomLeft.id)
      }

      if(startSqaure.diagonals.bottomRight &&
        startSquare.diagonals.bottomRight.piece &&
        startSquare.diagonals.bottomRight.piece.color !== currPlayer) {

        validMoves.push(start.bottoRight.id)
      }
    }

  return validMoves;
  }
}

Pawn.prototype = Object.create(ChessPieces.prototype);
Pawn.prototype.constructor = Pawn;

//Rook
var Rook = function() {
  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    var validMoves = this.movePieceUpOrDown(startSquare, rows, cols, currPlayer);
    return validMoves;
  }
}

Rook.prototype = Object.create(ChessPieces.prototype);
Rook.prototype.constructor = Rook;

//Knight
var Knight = function() {
  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    var allPossibleMoves = [];
    var validMoves = [];

    //helper function to help determine if moving to a certain square is valid move
    //TODO: if i have time, will pull this code out as it is used by the knight piece as well
    var checkIfValidMove = function(squareToCheck) {
      //if there's a piece in square in question only add to valid moves if piece
      //belongs to opponent
      if(squareToCheck.piece) {
        if(squareToCheck.piece.color !== currPlayer) {
          validMoves.push(squareToCheck.id);
          return;
        }
        else { return; }
      }
      //if square is blank, add to validMoves
      else { validMoves.push(squareToCheck.id); }
    }

    //horizontal L up and to the left and right
    if (rows[startSquare.row - 1]) {
      allPossibleMoves.push(rows[startSquare.row - 1][startSquare.col + 2]);
      allPossibleMoves.push(rows[startSquare.row - 1][startSquare.col - 2]);
    }

    //horizontal L down and to the left and right
    if (rows[startSquare.row + 1]) {
      allPossibleMoves.push(rows[startSquare.row + 1][startSquare.col + 2]);
      allPossibleMoves.push(rows[startSquare.row + 1][startSquare.col - 2]);
    }

    //vertical L up and to the left or right
    if (rows[startSquare.row - 2]) {
      allPossibleMoves.push(rows[startSquare.row - 2][startSquare.col + 1]);
      allPossibleMoves.push(rows[startSquare.row - 2][startSquare.col - 1]);
    }

    //veritcal L down and to the left or right
    if (rows[startSquare.row + 2]) {
      allPossibleMoves.push(rows[startSquare.row + 2][startSquare.col + 1]);
      allPossibleMoves.push(rows[startSquare.row + 2][startSquare.col - 1]);
    }

    for (var i = 0; i < allPossibleMoves.length; i++) {
      var targetSquare = allPossibleMoves[i];
      //if target squre is in bounds, checkIfValid
      if(targetSquare) { checkIfValidMove(targetSquare); }
    }

    return validMoves;
  }
}

Knight.prototype = Object.create(ChessPieces.prototype);
Knight.prototype.constructor = Knight;

//Bishop
var Bishop = function() {
  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    //leverage chessPieces moveDiagonal functionality to determine all valid moves
    var topLeft = this.movePieceDiagonally(startSquare, startSquare.topLeft, 'topLeft', currPlayer);
    var topRight = this.movePieceDiagonally(startSquare, startSquare.topRight, 'topRight', currPlayer);
    var bottomLeft = this.movePieceDiagonally(startSquare, startSquare.bottomLeft, 'bottomLeft', currPlayer);
    var bottomRight = this.movePieceDiagonally(startSquare, startSquare.bottomRight, 'bottomRight', currPlayer);

    var validMoves = topLeft.concat(topRight, bottomLeft, bottomRight);
    return validMoves;
  }
}

Bishop.prototype = Object.create(ChessPieces.prototype);
Bishop.prototype.constructor = Bishop;

//Queen
var Queen = function() {
  this.calculateValidMoves = function(startSquare, squares, rows, cols, currentPlayer) {
    //leverage chessPieces moveDiagonal functionality to determine all valid diagonal moves
    var topLeft = this.movePieceDiagonally(startSquare, startSquare.topLeft, 'topLeft', currPlayer);
    var topRight = this.movePieceDiagonally(startSquare, startSquare.topRight, 'topRight', currPlayer);
    var bottomLeft = this.movePieceDiagonally(startSquare, startSquare.bottomLeft, 'bottomLeft', currPlayer);
    var bottomRight = this.movePieceDiagonally(startSquare, startSquare.bottomRight, 'bottomRight', currPlayer);
    //leverage chessPieces moveUpOrDown functionality to determinal all valid vert and horizontal moves
    var horizontalAndVerticalMoves = this.movePieceUpOrDown(start, rows, cols, currPlayer);

    //combine diagonals and horizontal/vertical valid moves and return
    var validMoves = horizontalAndVerticalMoves.concat(topLeft, topRight, bottomLeft, bottomRight);
    return validMoves;
  }
}

Queen.prototype = Object.create(ChessPieces.prototype);
Queen.prototype.constructor = Queen;

//King
var King = function() {
  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    var validMoves = [];

    //helper function to help determine if moving to a certain square is valid move
    //TODO: if i have time, will pull this code out as it is used by the knight piece as well
    var checkIfValidMove = function(squareToCheck) {
      //if there's a piece in square in question only add to valid moves if piece
      //belongs to opponent
      if(squareToCheck.piece) {
        if(squareToCheck.piece.color !== currPlayer) {
          validMoves.push(squareToCheck.id);
          return;
        }
        else { return; }
      }
      //if square is blank, add validMoves
      else { validMoves.push(squareToCheck.index); }
    }

    //because kings can only move one square at a time, have to check all surrounding squares
    //manually vs. using recursive checker
    if(startSquare.topLeft) { checkIfValidMove(start.topLeft); };
    if(startSquare.topRight) { checkIfValidMove(start.topRight); };
    if(startSquare.bottomLeft) { checkIfValidMove(start.bottomLeft); };
    if(startSquare.topRight) { checkIfValidMove(start.topRight); };
    if(squares[startSquare.id - 1]) { checkIfValidMove(squares[start - 1]); };
    if(squares[startSquare.id + 1]) { checkIfValidMove(squares[start + 1]); };
    if(squares[startSquare.id - 8]) { checkIfValidMove(squares[start - 8]); };
    if(squares[startSquare.id + 8]) { checkIfValidMove(squares[start + 8]); };

    return validMoves;
  }
}

King.prototype = Object.create(ChessPieces.prototype);
King.prototype.constructor = King;

//All pieces
var allChessPieceTypes = {
  Pawn, Rook, Knight, Bishop, Queen, King
}
