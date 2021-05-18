// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

function greedySearch(initialState){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  
  renderState(initialState)

  let history = []
  let nodeSpace = [initialState]
  let controller = initControllerGreedy()

  if(initialState.isSameAs(FINAL_STATE)){
    sendResponse(controller. executionTime, nodeSpace.length, nodeSpace, 
      controller.currentDepth, controller.maxDepth)
    return
  }
  
  choice = nodeSpace[0]
  do{
    nodeSpace = openDepthGreedy(choice, history)
    history = history.concat(nodeSpace)
    choice = chooseBestGreedy(nodeSpace)
    checkFinalGreedy(choice)
  }while(controller.done === false)
  
  sendResponse(controller.executionTime, history.length, history, 
    controller.currentDepth, controller.maxDepth)
}

function initControllerGreedy() {
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

      this.currentDepth++
      if(this.currentDepth > this.maxDepth) this.maxDepth = this.currentDepth
    },
    
  }
}

function checkFinalGreedy(greedyNode){
  controller.executionTime++
  renderState(greedyNode)
  if(greedyNode.isSameAs(FINAL_STATE)){
    controller.done = true
    return
  }
}

function openDepthGreedy(state, history){
  let newSpace = []
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  directions.forEach(dir => {
    if(controller.done === false) openNodeGreedy(state, dir, newSpace, history)
  })
  controller.update(newSpace.length)
  return newSpace
}

function openNodeGreedy(state, move, space, history){
  if(!state.isMoveAvailable(move)) return
  newState = makeMove(state, move)
  if(!checkStateNotInLoop(newState, history)) return
  space.push(newState)
}

function chooseBestGreedy(space){
  let fitArray = space.map(state => state.fitness() )
  let chosenIndex = fitArray.indexOf(Math.min.apply(Math, fitArray))
  return space[chosenIndex]
}
