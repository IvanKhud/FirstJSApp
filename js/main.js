function main() {
  dom.results[0] = 0;
  dom.maxRowsPerPage = 5;
  dom.firstVisibleRow = 1;
  dom.lastVisibleRow = 5;
  var totalSteps = 0, firstStep = 14, totalThrows = 0; 
  var myBall = new Ball;
  for (var i = 1; i < 101; i++) {
    totalSteps = 0;
    myBall = firstThrow(firstStep, i);
    if (myBall.safe === 99) {
      totalSteps++;
    }
    totalSteps += myBall.steps; 
    totalSteps += secondThrow(myBall.safe, myBall.unsafe, i);
    dom.results[i] = totalSteps;
    totalThrows += totalSteps;
    if (totalSteps < dom.minThrows) {
      dom.minThrows = totalSteps;
    }
    if (totalSteps > dom.maxThrows) {
      dom.maxThrows = totalSteps;
    }
  }
  dom.averageThrows = totalThrows/100;
  dom.outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}

  
  
  
  
  
  
  
  
  
  
  
  
  
