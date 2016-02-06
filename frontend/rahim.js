var lastMove = {
  from: "",
  to: "",
  dests: ""
};

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
    
  })
  lastMove.from = f;
  lastMove.to = t;
  lastMove.dests = getValidMoves();
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

    for (var piece in piecesOnBoard) {
      if (piece.color === getTurnColor) {
        material += pieceValue[piece.role];
      }
    }
    return material;
  }

  function getMovability() {
    var availableMoves = 0;

    for (var piece in getValidMoves()) {
      availableMoves += piece.length;
    }
  }

  var movabilityScore = getMovability();
  var materialScore = sumMaterial();
  var pawnScore = 0;

  return 0.1 * movabilityScore + materialScore - 0.5 * pawnScore;
}