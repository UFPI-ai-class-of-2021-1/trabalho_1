// let State = require('./state.js')

const FINAL_STATE = new State([[1,2,3],[4,5,6],[7,8,0]])

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

function textArrayToIntMatrix(array){
  return array.reduce(function (rows, key, index) { 
    return (index % 3 == 0 ? rows.push([parseInt(key)]) : rows[rows.length-1].push(parseInt(key))) && rows;
  }, []);
}

// module.exports = { sendResponse, makeMove, FINAL_STATE }