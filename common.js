let State = require('./state.js')

const MOVE = {
	UP: "UP",
	RIGHT: "RIGHT",
	DOWN: "DOWN",
	LEFT: "LEFT"
}

function makeMove(state, move){
  let x = state.posZero.x
  let y = state.posZero.y
  let newMatrix = JSON.parse(JSON.stringify(state.matrix))
  switch (move) {
    case MOVE.UP:     
      newMatrix[y-1][x] = 0
      newMatrix[y][x] = state.matrix[y-1][x]
      break

    case MOVE.RIGHT: 
      newMatrix[y][x+1] = 0
      newMatrix[y][x] = state.matrix[y][x+1]
      break

    case MOVE.DOWN:
      newMatrix[y+1][x] = 0
      newMatrix[y][x] = state.matrix[y+1][x]
      break

    case MOVE.LEFT:
      newMatrix[y][x-1] = 0
      newMatrix[y][x] = state.matrix[y][x-1]
      break
  }
  return new State(newMatrix)
}

function sendResponse(executionTime, memoryUsage, generatedNodes, solutionDepth, maxDepth){
  const response = {
    tempo_de_execucao: executionTime,
    utilizacao_de_memoria: memoryUsage,
    nós_gerados: generatedNodes,
    profundidade_da_solucao:  solutionDepth,
    profundidade_máxima:  maxDepth
  }
  // front(response)
  console.log(JSON.stringify(response))
}

module.exports = { sendResponse, MOVE, makeMove }

// console.log(checkMoveValidity([[8,2,3],[4,7,5],[0,1,6]], MOVE.RIGHT))
// console.log(new State([[8,2,3],[4,7,5],[0,1,6]]).hash )