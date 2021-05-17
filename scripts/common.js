// let State = require('./state.js')

const FINAL_STATE = new State([[1,2,3],[4,5,6],[7,8,0]])
function finalCoords(value){
  switch (value) {
    case 1: return [0,0]
    case 2: return [1,0]
    case 3: return [2,0]
    case 4: return [0,1]
    case 5: return [1,1]
    case 6: return [2,1]
    case 7: return [0,2]
    case 8: return [1,2]
    case 0: return [2,2]
  }
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

function textArrayToIntMatrix(array){
  return array.reduce(function (rows, key, index) { 
    return (index % 3 == 0 ? rows.push([parseInt(key)]) : rows[rows.length-1].push(parseInt(key))) && rows;
  }, []);
}

function checkStateNotInLoop(state, stateHistory){
  return stateHistory.every(element => element.hash !== state.hash)
}

// module.exports = { sendResponse, makeMove, FINAL_STATE }