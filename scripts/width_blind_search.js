// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

function widthBlindSearch(initialState, limit){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  
  renderState(initialState)

  let history = []
  let nodeSpace = [initialState]
  let controller = initControllerWBS()

  if(initialState.isSameAs(FINAL_STATE)){
    sendResponse(controller. executionTime, controller.maxMemoryUsage, depthNodes, 
      controller.currentDepth, controller.maxDepth)
    return
  }
  
  do{
    if(controller.currentDepth === limit) throw new Error('Solution not found')
    history = history.concat(nodeSpace)
    nodeSpace = openDepthWBS(nodeSpace, history)
    checkFinalWBS(nodeSpace)
  }while(controller.done === false)

  sendResponse(controller.executionTime, history.length, history, 
    controller.currentDepth, controller.currentDepth)
}

function initControllerWBS() {
  return controller = {
    done: false,
    executionTime: 1,
    currentDepth: 1
  }
}

function checkFinalWBS(space){
  for (const currentNode of space) {
    controller.executionTime++
    renderState(currentNode)
    if(currentNode.isSameAs(FINAL_STATE)){
      controller.done = true
      return
    }
  }
}

function openDepthWBS(space, history){
  let newSpace = []
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  space.forEach(state => {
    directions.forEach(dir => {
      if(controller.done === false) openNodeWBS(state, dir, newSpace, history)
    })
  })
  controller.currentDepth++
  return newSpace
}

function openNodeWBS(state, move, space, history){
  if(!state.isMoveAvailable(move)) return
  newState = makeMove(state, move)
  if(!checkStateNotInLoop(newState, history)) return
  space.push(newState)
}

