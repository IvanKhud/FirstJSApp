var results = [];

function firstBall(safe, unsafe, steps) {
  this.safe = safe;
  this.steps = steps;
  this.unsafe = unsafe;
}

function firstThrow(firstStep, floor) {
  var isFirstBallSafe = true, currentStep = firstStep, currentFloor =0, firstResult = new firstBall();
  firstResult.steps = 0;
  firstResult.safe = 0;
  while (isFirstBallSafe && (currentFloor < 99)) {
    currentFloor += currentStep; 
    firstResult.steps++;
    if (currentFloor >= floor) {
      isFirstBallSafe = false;
      firstResult.unsafe = currentFloor; 
    }
    else {
      currentStep--;
      firstResult.safe = currentFloor;
    }  
  }
  return firstResult;
}

  
function secondThrow(safe, unsafe, floor) {
  var currentFloor = safe + 1; var steps = 0;
  while (currentFloor < unsafe) {
    steps++; 
    if (currentFloor === floor) {
      unsafe = currentFloor;
    }
    else {
      currentFloor++;
    } 
  }
  return steps;
}    

function outputResults(first, last) {
  document.getElementById("myList").innerHTML = "";
  var myResult = document.getElementById('myList');

  var listHead = document.createElement('h5');
  listHead.setAttribute("class", "list-group-item-heading");
  listHead.appendChild(document.createTextNode("Floor ---> Attempts_count"));
  myResult.appendChild(listHead);

  for (var i = first;i<last+1; i++) {
    var newResult = document.createElement('li');
    newResult.setAttribute("class", "list-group-item");
    newResult.appendChild(document.createTextNode("#" + i + " ---> " + results[i]));
    myResult.appendChild(newResult);
  }
    
}
    
function main() {
  document.getElementById("pages").style.visibility = "visible";
  results[0] = 0;
  var totalSteps = 0; 
  var firstStep = 14;
  var myBall = new firstBall;
  for (var i = 1; i < 101; i++) {
    totalSteps = 0;
    myBall = firstThrow(firstStep, i);
    if (myBall.safe === 99) {
      totalSteps++;
    }
    totalSteps += myBall.steps; 
    totalSteps += secondThrow(myBall.safe, myBall.unsafe, i);
    results[i] = totalSteps;
  }
  outputResults(1,10);
}

window.onload = function() {
  document.getElementById("pages").style.visibility = "hidden";
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  