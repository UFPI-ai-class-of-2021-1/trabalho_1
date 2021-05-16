let node = 0

$(document).ready(function(){

})

function textToState(text){
  let array = text.split(',')
  return new State(textArrayToIntMatrix(array))
}

function renderState(state){
  const rootElement = $("#body")

  rootElement.append("<div id='container'><ul id='root"+node+"'></ul></div>")

  renderPuzzle(state.matrix.flat(1), node)
  node++
}

function renderPuzzle(array, rootId){
  const rootElement = $("#root"+rootId)

  array.forEach((element)=> {
    let childElement = ``
    if (element == 0){
      childElement = `<li class="empty"></li>`
    } else { 
      childElement = `<li>${element}</li>`
    }

    rootElement.append(childElement)
  })
}

function iniatilizePuzzle(array) {
  var i = array.length,
    j = 0,
    temp;

  while (i--) {
    j = Math.floor(Math.random() * (i+1));

    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;

  }
  return array;
}
