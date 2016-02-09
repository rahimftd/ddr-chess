var pieceValue = {
  pawn: 1,
  bishop: 3,
  knight: 3,
  rook: 5, 
  queen: 9
}

function movePiece(f, t) {
  moveHistory.push({
    from: f,
    to: t,
    dests: getValidMoves()
  });
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

function evaluatePosition(position) {
    return Math.random();
}

function findBestMove(searchDepth, nodeType) {
}