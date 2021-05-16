// const MOVE = require('./move.js')

class State{
  constructor(matrix) { 
    this.matrix = matrix
    this.hash = this.getHash()
    this.posZero = this.getZeroPosition()
    if(this.posZero.x === -1 || this.posZero.y === -1) throw new Error('Invalid Board State')
  }

  getHash(){
    return this.matrix.flat(1).join('')
  }

  getZeroPosition(){
    const y =  this.matrix.findIndex((array, y) => array.includes(0))
    return {
      x: this.matrix[y].findIndex((val,x) => val === 0),
      y: y
    }
  }

  isSameAs(otherState){
    return this.hash === otherState.hash
  }

  isMoveAvailable(move){
    let [x, y] = [0,0];
    switch (move) {
      case MOVE.UP:     y = this.posZero.y - 1; break;
      case MOVE.RIGHT:  x = this.posZero.x + 1; break;
      case MOVE.DOWN:   y = this.posZero.y + 1; break;
      case MOVE.LEFT:   x = this.posZero.x - 1; break;
    }
  
    return (x >= 0 && x <= 2 && y >= 0 && y <= 2)
  }
}