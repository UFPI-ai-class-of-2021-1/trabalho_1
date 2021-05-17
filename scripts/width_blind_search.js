// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

function widthBlindSearch(initialState, limit){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  
  renderState(initialState)

  let history = []
  let nodeSpace = [initialState]
  let controller = initController()

  if(initialState.isSameAs(FINAL_STATE)){
    sendResponse(controller. executionTime, controller.maxMemoryUsage, depthNodes, 
      controller.currentDepth, controller.maxDepth)
    return
  }
  
  do{
    if(controller.currentDepth === limit) throw new Error('Solution not found')
    history = history.concat(nodeSpace)
    nodeSpace = openDepth(nodeSpace, history)
    checkFinal(nodeSpace)
  }while(controller.done === false)

  sendResponse(controller.executionTime, history.length, history, 
    controller.currentDepth, controller.currentDepth)
}

function initController() {
  return controller = {
    done: false,
    executionTime: 1,
    currentDepth: 1
  }
}

function checkFinal(space){
  for (const node of space) {
    controller.executionTime++
    renderState(node)
    if(node.isSameAs(FINAL_STATE)){
      controller.done = true
      return
    }
  }
}

function openDepth(space, history){
  console.log(controller.currentDepth, space.length)
  let newSpace = []
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  space.forEach(state => {
    directions.forEach(dir => {
      if(controller.done === false) openNode(state, dir, newSpace, history)
    })
  })
  controller.currentDepth++
  return newSpace
}

function openNode(state, move, space, history){
  if(!state.isMoveAvailable(move)) return
  newState = makeMove(state, move)
  if(!checkStateNotInLoop(newState, history)) return
  space.push(newState)
}

function checkStateNotInLoop(state, stateHistory){
  return stateHistory.every(element => element.hash !== state.hash)
}
