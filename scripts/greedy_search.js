// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

function greedySearch(initialState){
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
    history = history.concat(nodeSpace)
    nodeSpace = openDepth(nodeSpace, history)
    choice = chooseBest(nodeSpace)
    checkFinal(choice)
  }while(controller.done === false)

  sendResponse(controller.executionTime, controller.maxMemoryUsage, history, 
    controller.currentDepth, controller.maxDepth)
}

function initController() {
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

function checkFinal(node){
  controller.executionTime++
  renderState(node)
  if(node.isSameAs(FINAL_STATE)){
    controller.done = true
    return
  }
}

function openDepth(space, history){
  let newSpace = []
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  space.forEach(state => {
    directions.forEach(dir => {
      if(controller.done === false) openNode(state, dir, newSpace, history)
    })
  })
  controller.update(newSpace.length)
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

function chooseBest(space){
  let fitArray = space.map(state => state.fitness() )
  let chosenIndex = fitArray.indexOf(Math.min.apply(Math, fitArray))
  return space[chosenIndex]
}
