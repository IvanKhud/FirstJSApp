function Ball(safe, unsafe, steps) {
  this.safe = safe;
  this.steps = steps;
  this.unsafe = unsafe;
}

function firstThrow(firstStep, floor) {
  var isFirstBallSafe = true, currentStep = firstStep, currentFloor =0, firstResult = new Ball();
  firstResult.steps = 0;
  firstResult.safe = 0;
  while (isFirstBallSafe && (currentFloor < 99)) {
    currentFloor += currentStep; 
    firstResult.steps++;
    if (currentFloor >= floor) {
      isFirstBallSafe = false;
      firstResult.unsafe = currentFloor; 
    } else {
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
    } else {
      currentFloor++;
    } 
  }
  return steps;
} 