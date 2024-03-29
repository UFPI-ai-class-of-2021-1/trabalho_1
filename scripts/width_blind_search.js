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
    sendResponse(controller.executionTime, nodeSpace.length, nodeSpace, 
      controller.currentDepth, controller.currentDepth)
    return
  }
  
  do{
    if(controller.currentDepth === limit) throw new Error('Solution not found')
    history = history.concat(nodeSpace)
    nodeSpace = openDepthWBS(nodeSpace, history)
    checkFinalWBS(nodeSpace)
  }while(controller.done === false)
  
  history = history.concat(nodeSpace)
  sendResponse(controller.executionTime, controller.maxMemoryUsage, history.length, 
    controller.currentDepth, controller.currentDepth)
}

function initControllerWBS() {
  return controller = {
    done: false,
    executionTime: 1,
    currentMemoryUsage: 1,
    maxMemoryUsage: 1,
    currentDepth: 1,
    maxDepth: 1,

    update(spaceSize){
      this.currentMemoryUsage = spaceSize
      if(this.currentMemoryUsage > this.maxMemoryUsage) this.maxMemoryUsage = this.currentMemoryUsage
    },
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
  controller.update(newSpace.length)
  return newSpace
}

function openNodeWBS(state, move, space, history){
  if(!state.isMoveAvailable(move)) return
  newState = makeMove(state, move)
  if(!checkStateNotInLoop(newState, history)) return
  space.push(newState)
}

