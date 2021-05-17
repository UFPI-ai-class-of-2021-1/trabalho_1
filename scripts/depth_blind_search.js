// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

function depthBlindSearch(initialState, limitDepth){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  
  renderState(initialState)

  let depthNodes = [initialState]
  let controller = initControllerDBS(limitDepth)

  if(initialState.isSameAs(FINAL_STATE)){
    sendResponse(controller. executionTime, controller.maxMemoryUsage, depthNodes, 
      controller.currentDepth, controller.maxDepth)
    return
  }
  
  enterDepthDBS(depthNodes)

  if(depthNodes[depthNodes.length-1].isSameAs(FINAL_STATE)){
    sendResponse(controller.executionTime, controller.maxMemoryUsage, depthNodes, 
      controller.currentDepth, controller.maxDepth)
  } else {
    throw new Error('Solution not found')
  }
  
}

function initControllerDBS(limitDepth) {
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

function enterDepthDBS(depthNodes){
  let state = depthNodes[depthNodes.length-1]

  //RANDOM DIRECTIONS
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  directions = directions.sort(() => (Math.random() > .5) ? 1 : -1)
  directions.forEach(dir => {
    if(controller.done === false) openNodeDBS(state, dir, depthNodes)
  })
}

function openNodeDBS(state, move, depthNodes){
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

  if(controller.currentDepth < controller.limitDepth) enterDepthDBS(depthNodes)

  if(controller.done === true) return
  controller.leaveDepth()
  depthNodes.pop(newState)
}
