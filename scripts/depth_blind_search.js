// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

function depthBlindSearch(initialState, limitDepth){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  
  renderState(initialState)

  let depthNodes = [initialState]
  let controller = initController(limitDepth)

  if(initialState.isSameAs(FINAL_STATE)){
    sendResponse(controller. executionTime, controller.maxMemoryUsage, depthNodes, 
      controller.currentDepth, controller.maxDepth)
    return
  }
  
  enterDepth(depthNodes)

  if(depthNodes[depthNodes.length-1].isSameAs(FINAL_STATE)){
    sendResponse(controller.executionTime, controller.maxMemoryUsage, depthNodes, 
      controller.currentDepth, controller.maxDepth)
  } else {
    throw new Error('Solution not found')
  }
  
}

function initController(limitDepth) {
  return controller = {
    done: false,
    limitDepth: limitDepth,
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
}

function enterDepth(depthNodes){
  let state = depthNodes[depthNodes.length-1]

  //RANDOM DIRECTIONS
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  directions = directions.sort(() => (Math.random() > .5) ? 1 : -1)
  directions.forEach(dir => {
    if(controller.done === false) openNode(state, dir, depthNodes)
  })
}

function openNode(state, move, depthNodes){
  if(!state.isMoveAvailable(move)) return
  newState = makeMove(state, move)
  if(!checkStateNotInLoop(newState, depthNodes)) return

  renderState(newState)

  depthNodes.push(newState)
  controller.enterDepth()
  if(depthNodes[depthNodes.length-1].isSameAs(FINAL_STATE)){
    controller.done = true
    return
  }

  if(controller.currentDepth < controller.limitDepth) enterDepth(depthNodes)

  if(controller.done === true) return
  controller.leaveDepth()
  depthNodes.pop(newState)
}

function checkStateNotInLoop(state, stateHistory){
  return stateHistory.every(element => element.hash !== state.hash)
}

// execute
// DepthBlindSearch([[1,2,3],[4,0,6],[7,5,8]], 10)