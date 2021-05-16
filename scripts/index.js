$(document).ready(function(){
  
 renderPuzzle(iniatilizePuzzle([1,2,3,4,5,6,7,8,0]))

})

function renderPuzzle(array){
  const rootElement = $("#root")

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
