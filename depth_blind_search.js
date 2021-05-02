let common = require('./common.js')
let MOVE = require('./common.js').MOVE
let State = require('./state.js')

const FINAL_STATE = new State([[1,2,3],[4,5,6],[7,8,0]])

let controller = {
  done: false,
  executionTime: 1,
  currentMemoryUsage: 1,
  maxMemoryUsage: 1,
  currentDepth: 1,
  maxDepth: 1,

  enterDepth(){
    this.currentMemoryUsage++
    if(this.currentMemoryUsage > this.maxMemoryUsage) this.maxMemoryUsage = this.currentMemoryUsage

    this.currentDepth++
    if(this.currentDepth > this.maxDepth) this.maxDepth = this.currentDepth
    
    this.executionTime++
  },
  
  leaveDepth(){
    this.currentMemoryUsage--
    this.currentDepth--
  }

}

function DepthBlindSearch(initialState){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  let depthNodes = [initialState]

  if(initialState.isSameAs(FINAL_STATE)){
    common.sendResponse(
      controller. executionTime, 
      controller.maxMemoryUsage, 
      depthNodes, 
      depthNodes.length, 
      controller.maxDepth
    )
    return
  }
  
  enterDepth(depthNodes)

  if(depthNodes[depthNodes.length-1].isSameAs(FINAL_STATE)){
    common.sendResponse(
      controller. executionTime, 
      controller.maxMemoryUsage, 
      depthNodes, 
      depthNodes.length, 
      controller.maxDepth
    )
  } else {
    throw new Error('Solution not found')
  }
  
}

function enterDepth(depthNodes){
  let state = depthNodes[depthNodes.length-1]

  //RANDOM DIRECTIONS
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  directions = directions.sort(() => (Math.random() > .5) ? 1 : -1)
  directions.forEach(dir => {
    if(controller.done === false) openNode(state, dir, depthNodes)
  })

  // if(controller.done === false) openNode(state, MOVE.UP, depthNodes)
  // if(controller.done === false) openNode(state, MOVE.RIGHT, depthNodes)
  // if(controller.done === false) openNode(state, MOVE.DOWN, depthNodes)
  // if(controller.done === false) openNode(state, MOVE.LEFT, depthNodes)
}

let a = 1

function openNode(state, move, depthNodes){
  if(!state.isMoveAvailable(move)) return
  
  newState = common.makeMove(state, move)

  if(!checkStateNotInLoop(newState, depthNodes)) return

  depthNodes.push(newState)
  controller.enterDepth()
  if(depthNodes[depthNodes.length-1].isSameAs(FINAL_STATE)){
    controller.done = true
    return
  }

  enterDepth(depthNodes)

  if(controller.done === true) return
  controller.leaveDepth()
  depthNodes.pop(newState)
}

function checkStateNotInLoop(state, stateHistory){
  return stateHistory.every(element => element.hash !== state.hash)
}

DepthBlindSearch([[1,2,3],[4,0,6],[7,5,8]])