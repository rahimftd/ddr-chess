/*var lastMove = {
  from: "",
  to: "",
  dests: ""
};*/

var moveHistory = [];

var pieceValue = {
  pawn: 1,
  bishop: 3,
  knight: 3,
  rook: 5, 
  queen: 9,
}

function movePiece(f, t) {
  moveHistory.push({
    from: f,
    to: t,
    dests: getValidMoves()
  });
  /*lastMove.from = f;
  lastMove.to = t;
  lastMove.dests = getValidMoves();*/
  ground.move(f, t);
  chess.move({from: f, to: t});
  ground.set({
    turnColor: chessToColor(chess),
    movable: {
      color: chessToColor(chess),
      dests: chessToDests(chess)
    }
  });
}

function reverseMove() {
  var newTurnColor = switchTurnColor(getTurnColor());
  var lastMove = moveHistory.pop();
  ground.move(lastMove.to, lastMove.from);
  chess.move({from:lastMove.to, to:lastMove.from});
  ground.set({
    turnColor: newTurnColor,
    movable: {
      color: newTurnColor,
      dests: lastMove.dests
    }
  })
}

function switchTurnColor(curr) {
  if (curr === "black") {
    return "white";
  } else {
    return "black";
  }
}

function getValidMoves() {
  return ground.getController().movable.dests;
}

function getTurnColor() {
  return ground.getController().turnColor;
}

function evaluatePosition() {
  function sumMaterial() {
    var piecesOnBoard = ground.getPieces();
    var material = 0;
    var opponentMaterial = 0;

    for (var piece in piecesOnBoard) {
      if (piece.color === getTurnColor) {
        material += pieceValue[piece.role];
      } else {
        opponentMaterial += pieceValue[piece.role];
      }
    }
    return material - opponentMaterial;
  }

  /*function getMovability() {
    var availableMoves = 0;

    for (var piece in getValidMoves()) {
      availableMoves += piece.length;
    }
  }

  var movabilityScore = getMovability();
  var materialScore = sumMaterial();
  var pawnScore = 0;*/

  return sumMaterial();
}

function findBestMove(searchDepth, nodeType, atRoot) {
  var bestMove = {
    from: "",
    to: "",
    value: 0
  };

  var nodeValue;

  var validMoves = destsToArray();

  if (searchDepth === 0) {
    return evaluatePosition();
  } else if (nodeType === "max") {
    
  }
}

function getMinNodeValue() {
  var validMoves = destsToArray();
  var minNodeValue = 0;
  var bestMove = {};

  for (var i = 0; i < validMoves.length; i++) {
    movePiece(validMoves[i].from, validMoves[i].to);
    if (evaluatePosition() < minNodeValue || minNodeValue === 0) {
      minNodeValue = evaluatePosition();
      bestMove = validMoves[i];
    }
    reverseMove();
  }

  return minNodeValue;
}

function getMaxNodeValue() {
  var validMoves = destsToArray();
  var maxNodeValue = 0;
  var bestMove = {};

  for (var i = 0; i < validMoves.length; i++) {
    movePiece(validMoves[i].from, validMoves[i].to);
    if (evaluatePosition() > maxNodeValue || maxNodeValue === 0) {
      maxNodeValue = evaluatePosition();
      bestMove = validMoves[i];
    }
    reverseMove();
  }

  return maxNodeValue;
}

function destsToArray() {
  var dests = getValidMoves();
  var movesArray = [];

  for (var move in dests) {
    for (var i = 0; i < dests[move].length; i++) {
      movesArray.push({from: move, to: dests[move][i]});
    }
  }
  return movesArray;
}