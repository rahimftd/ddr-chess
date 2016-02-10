var pieceValue = {
  P: 1,
  B: 3,
  N: 3,
  R: 5, 
  Q: 9,
  K: 0,
  p: -1,
  b: -3,
  n: -3,
  r: -5, 
  q: -9,
  k: 0
}

function movePiece(f, t) {
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


/*function switchTurnColor(curr) {
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
}*/

function evaluatePosition() {
    var material = 0;
    var movability = chess.moves().length;
    var fen = chess.fen();
    for (var i = 0; i < fen.length; i++) {
      if (fen[i] === ' ') {
        break;
      } else if (pieceValue[fen[i]] !== undefined) {
        material += pieceValue[fen[i]];
      }
    }
    return material;
}

function max(depthLeft, isRoot) {
  var maxMove = { from: "", to: "", value: -1000 };
  var dests = chessToDests(chess);
  if (depthLeft === 0) {
    return evaluatePosition();
  } else {
    for (var square in dests) {
      for (var move in dests[square]) {
        chess.move({from: square, to: dests[square][move]});
        score = {from: square, to: dests[square][move], value: min(depthLeft - 1, false)};
        if (score.value > maxMove.value) {
          maxMove = score;
        }
        chess.undo();
      }
    }
    if (isRoot) {
      return maxMove;
    } else {
      return maxMove.value;
    }
  }
}

function min(depthLeft, isRoot) {
  var minMove = { from: "", to: "", value: 1000 };
  var dests = chessToDests(chess);
  if (depthLeft === 0) {
    return evaluatePosition();
  } else {
    for (var square in dests) {
      for (var move in dests[square]) {
        chess.move({from: square, to: dests[square][move]});
        score = {from: square, to: dests[square][move], value: max(depthLeft - 1, false)};
        if (score.value < minMove.value) {
          minMove = score;
        }
        chess.undo();
      }
    }
    if (isRoot) {
      return minMove;
    } else {
      return minMove.value;
    }
  }
}

