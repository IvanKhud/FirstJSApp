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
    
    
function main() {
  var output = document.getElementById("output");
  output.innerHTML = "";
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
    output.innerHTML += ("#" + i + " = " + totalSteps + "<br/>");
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
