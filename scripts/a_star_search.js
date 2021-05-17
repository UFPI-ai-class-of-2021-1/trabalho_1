// const common = require('./common.js')
// const FINAL_STATE = common.FINAL_STATE
// const MOVE = require('./move.js')
// let State = require('./state.js')

class AStarStruct{
  constructor(depth, state) { 
    this.state = state
    this.depth = depth
  }
}

function aStarSearch(initialState){
  if(!(initialState instanceof State)) initialState = new State(initialState)
  
  renderState(initialState)

  let history = []
  let nodeSpace = [new AStarStruct(1, initialState)]
  let controller = initControllerAStar()

  if(initialState.isSameAs(FINAL_STATE)){
    sendResponse(controller. executionTime, controller.maxMemoryUsage, nodeSpace.map(n => n.state), 
      controller.currentDepth, controller.maxDepth)
    return
  }
  
  do{
    history = history.concat(nodeSpace)
    newSpace = openDepthAStar(nodeSpace[0], history)
    nodeSpace.shift()
    nodeSpace = nodeSpace.concat(newSpace)
    nodeSpace.sort((struct1, struct2) => {
      return (struct1.state.fitness() + struct1.depth) - (struct2.state.fitness() + struct2.depth)
    })
    controller.updateMem(nodeSpace.length)
    controller.updateDepth(nodeSpace[0].depth)
    checkFinalAStar(nodeSpace[0].state)
  }while(controller.done === false)

  sendResponse(controller.executionTime, controller.maxMemoryUsage, history.map(n => n.state), 
    controller.currentDepth, controller.maxDepth)
}

function initControllerAStar() {
  return controller = {
    done: false,
    executionTime: 1,
    currentMemoryUsage: 1,
    maxMemoryUsage: 1,
    currentDepth: 1,
    maxDepth: 1,

    updateMem(spaceSize){
      this.currentMemoryUsage = spaceSize
      if(this.currentMemoryUsage > this.maxMemoryUsage) this.maxMemoryUsage = this.currentMemoryUsage
    },

    updateDepth(currentDepth){
      this.currentDepth = currentDepth
      if(this.currentDepth > this.maxDepth) this.maxDepth = this.currentDepth
    },
    
  }
}

function checkFinalAStar(aStarNode){
  controller.executionTime++
  renderState(aStarNode)
  if(aStarNode.isSameAs(FINAL_STATE)){
    controller.done = true
    return
  }
}

function openDepthAStar(struct, history){
  let newSpace = []
  let directions = [MOVE.UP, MOVE.RIGHT, MOVE.DOWN, MOVE.LEFT]
  directions.forEach(dir => {
    openNodeAStar(struct, dir, newSpace, history.map(s => s.state))
  })
  return newSpace
}

function openNodeAStar(struct, move, space, history){
  if(!struct.state.isMoveAvailable(move)) return
  newState = makeMove(struct.state, move)
  if(!checkStateNotInLoop(newState, history)) return
  space.push(new AStarStruct(struct.depth+1, newState))
}
