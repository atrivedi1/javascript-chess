//TODO: ES6 classes probably cleaner/easier to use. Will refactor if I have time

/*****PARENT CHESSPIECES CLASS*****/

var ChessPiece = function(locationOnBoard, type, color, id) {
  this.locationOnBoard = locationOnBoard;
  this.type = type;
  this.color = color;
  this.id = id;
}

//Helper methods for ALL ChessPiece subclasses:
//check validity all valid diagonal moves
ChessPiece.prototype.movePieceDiagonally = function(startSquare, diagonalSquare, direction, currPlayer) {
  var validMoves = [];

  var diagonalMoveChecker = function(diagonalSquare, direction) {
    //if there are no valid diagonal square then return out of the function
    if(diagonalSquare === null || diagonalSquare === startSquare) { return; }

    //if a piece exists on the diagonal, it is only a valid move if the piece belongs to the opponent
    if(diagonalSquare && diagonalSquare.piece) {
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
      diagonalMoveChecker(diagonalSquare.diagonals[direction], direction)
    }
  }

  diagonalMoveChecker(diagonalSquare, direction);
  return validMoves;
}

//check validity of all horizontal and vertical moves
ChessPiece.prototype.movePieceUpOrDown = function(startSquare, rows, cols, currPlayer) {
  var validMoves = [];

  //all sqaures above, below, to the right, and to the left of current square
  var up = cols[startSquare.col].slice(0, startSquare.row).reverse();
  var right = rows[startSquare.row].slice(startSquare.col + 1);
  var down = cols[startSquare.col].slice(startSquare.row + 1);
  var left = rows[startSquare.row].slice(0, startSquare.col).reverse();

  //helper function to calculate all valid moves
  var horizontalAndVerticalMoveChecker = function(squaresToCheck) {

    for(var i = 0; i < squaresToCheck.length; i++) {
      var currSquare = squaresToCheck[i];

      //if current square being checked has opponent's piece on it, add to valid moves
      //otherwise break;
      if(currSquare.piece) {
        if(currSquare.piece.color !== currPlayer){
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

/******SUBCLASSES FOR INDIVIDUAL PIECES*****/

//Pawn - valid moves
//TODO: revisit if there is additional time. Code is not very dry
var Pawn = function(locationOnBoard, type, color, id) {
  ChessPiece.call(this, locationOnBoard, type, color, id)

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
        if(squares[startSquare.id - 8] && !squares[startSquare.id - 8].piece) {
          validMoves.push(startSquare.id - 8);
        }
      }

      //in all cases, a pawn can attack diagonally
      if(startSquare.diagonals.topLeft &&
        startSquare.diagonals.topLeft.piece &&
        startSquare.diagonals.topLeft.piece.color !== currPlayer) {

        validMoves.push(startSquare.diagonals.topLeft.id)
      }

      if(startSquare.diagonals.topRight &&
        startSquare.diagonals.topRight.piece &&
        startSquare.diagonals.topRight.piece.color !== currPlayer) {

        validMoves.push(startSquare.diagonals.topRight.id)
      }
    }

    //else if pawn is black...
    else {
      //...and is in start row, it can move up to two spaces vertically
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
        if(squares[startSquare.id + 8] && !squares[startSquare.id + 8].piece) {
          validMoves.push(startSquare.id + 8);
        }
      }

      //in call cases, a pawn can attack diagonally
      if(startSquare.diagonals.bottomLeft &&
        startSquare.diagonals.bottomLeft.piece &&
        startSquare.diagonals.bottomLeft.piece.color !== currPlayer) {

        validMoves.push(startSquare.diagonals.bottomLeft.id)
      }

      if(startSquare.diagonals.bottomRight &&
        startSquare.diagonals.bottomRight.piece &&
        startSquare.diagonals.bottomRight.piece.color !== currPlayer) {

        validMoves.push(startSquare.diagonals.bottomRight.id)
      }
    }

  return validMoves;
  }
}

Pawn.prototype = Object.create(ChessPiece.prototype);
Pawn.prototype.constructor = Pawn;

//Rook - valid moves
var Rook = function(locationOnBoard, type, color, id) {
  ChessPiece.call(this, locationOnBoard, type, color, id)

  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    var validMoves = this.movePieceUpOrDown(startSquare, rows, cols, currPlayer);
    return validMoves;
  }
}

Rook.prototype = Object.create(ChessPiece.prototype);
Rook.prototype.constructor = Rook;

//Knight - valid moves
var Knight = function(locationOnBoard, type, color, id) {
  ChessPiece.call(this, locationOnBoard, type, color, id)

  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    var allPossibleMoves = [];
    var validMoves = [];

    //helper function to help determine if moving to a certain square is valid move
    //TODO: if i have time, will pull this code out as it is used by the knight piece as well as the king
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

    //STEP 1: start by determining ALL moves that the knight COULD make
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

    //STEP 2: once you have a list of ALL possible moves, loop through all of them
    //to determine which ones are VALID
    for (var i = 0; i < allPossibleMoves.length; i++) {
      var targetSquare = allPossibleMoves[i];
      //if target squre is in bounds, checkIfValid
      if(targetSquare) { checkIfValidMove(targetSquare); }
    }

    return validMoves;
  }
}

Knight.prototype = Object.create(ChessPiece.prototype);
Knight.prototype.constructor = Knight;

//Bishop - valid moves
var Bishop = function(locationOnBoard, type, color, id) {
  ChessPiece.call(this, locationOnBoard, type, color, id)

  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    //leverage chessPieces moveDiagonal functionality to determine all valid moves
    var topLeft = this.movePieceDiagonally(startSquare, startSquare.diagonals.topLeft, 'topLeft', currPlayer);
    var topRight = this.movePieceDiagonally(startSquare, startSquare.diagonals.topRight, 'topRight', currPlayer);
    var bottomLeft = this.movePieceDiagonally(startSquare, startSquare.diagonals.bottomLeft, 'bottomLeft', currPlayer);
    var bottomRight = this.movePieceDiagonally(startSquare, startSquare.diagonals.bottomRight, 'bottomRight', currPlayer);

    var validMoves = topLeft.concat(topRight, bottomLeft, bottomRight);
    return validMoves;
  }
}

Bishop.prototype = Object.create(ChessPiece.prototype);
Bishop.prototype.constructor = Bishop;

//Queen - valid moves
var Queen = function(locationOnBoard, type, color, id) {
  ChessPiece.call(this, locationOnBoard, type, color, id)

  this.calculateValidMoves = function(startSquare, squares, rows, cols, currPlayer) {
    //leverage chessPieces moveDiagonal functionality to determine all valid diagonal moves
    var topLeft = this.movePieceDiagonally(startSquare, startSquare.diagonals.topLeft, 'topLeft', currPlayer);
    var topRight = this.movePieceDiagonally(startSquare, startSquare.diagonals.topRight, 'topRight', currPlayer);
    var bottomLeft = this.movePieceDiagonally(startSquare, startSquare.diagonals.bottomLeft, 'bottomLeft', currPlayer);
    var bottomRight = this.movePieceDiagonally(startSquare, startSquare.diagonals.bottomRight, 'bottomRight', currPlayer);

    //leverage chessPieces moveUpOrDown functionality to determinal all valid vert and horizontal moves
    var horizontalAndVerticalMoves = this.movePieceUpOrDown(startSquare, rows, cols, currPlayer);

    //combine diagonals and horizontal/vertical valid moves and return
    var validMoves = horizontalAndVerticalMoves.concat(topLeft, topRight, bottomLeft, bottomRight);
    return validMoves;
  }
}

Queen.prototype = Object.create(ChessPiece.prototype);
Queen.prototype.constructor = Queen;

//King
var King = function(locationOnBoard, type, color, id) {
  ChessPiece.call(this, locationOnBoard, type, color, id)

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
      else { validMoves.push(squareToCheck.id); }
    }

    //because kings can only move one square at a time, have to check all surrounding squares
    //manually vs. using recursive checker
    if(startSquare.diagonals.topLeft) { checkIfValidMove(startSquare.diagonals.topLeft); };
    if(startSquare.diagonals.topRight) { checkIfValidMove(startSquare.diagonals.topRight); };
    if(startSquare.diagonals.bottomLeft) { checkIfValidMove(startSquare.diagonals.bottomLeft); };
    if(startSquare.diagonals.bottomRight) { checkIfValidMove(startSquare.diagonals.bottomRight); };
    if(squares[startSquare.id - 1]) { checkIfValidMove(squares[startSquare.id - 1]); };
    if(squares[startSquare.id + 1]) { checkIfValidMove(squares[startSquare.id + 1]); };
    if(squares[startSquare.id - 8]) { checkIfValidMove(squares[startSquare.id - 8]); };
    if(squares[startSquare.id + 8]) { checkIfValidMove(squares[startSquare.id + 8]); };

    return validMoves;
  }
}

King.prototype = Object.create(ChessPiece.prototype);
King.prototype.constructor = King;
