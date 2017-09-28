var dom = {
  results: [],
  maxThrows: 0,
  minThrows: 100,
  averageThrows: 0,
  firstVisibleRow: 1,
  lastVisibleRow: 5,
  maxRowsPerPage: 5
} 

window.onload = main;

function buttonPush() {
 var button1 = document.getElementById('mainBtn');
 if (button1.innerHTML == 'Start') {
   outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
   button1.innerHTML = 'Reset';
   button1.className = 'btn btn-warning btn-block';
 }
   else {
     document.getElementById('generalTable').innerHTML = ""; 
     document.getElementById('statisticsTable').innerHTML = "";
     button1.innerHTML = 'Start';
     button1.className = 'btn btn-success btn-block';
   }
} 

function outputResults(first, last) {
  var tableString = "";
  document.getElementById('generalTable').innerHTML = "";
  for (i = first; i <= last; i ++) {
    tableString += "<tr>";
    tableString += "<td>" + i + "</td>";
    tableString += "<td>" + dom.results[i] + "</td>";
    tableString += "</tr>";
  }
  document.getElementById('generalTable').innerHTML = tableString;
  outputStatistics();
  checkButtons();
}

function outputStatistics() {
  var tableString = "";
  document.getElementById('statisticsTable').innerHTML = "";

  tableString += "<tr>";
  tableString += "<td>" + 'Minimum' + "</td>";
  tableString += "<td>" + dom.minThrows + "</td>";
  tableString += "</tr>";
  tableString += "<tr>";
  tableString += "<td>" + 'Maximum' + "</td>";
  tableString += "<td>" + dom.maxThrows + "</td>";
  tableString += "</tr>";
  tableString += "<tr>";
  tableString += "<td>" + 'Average' + "</td>";
  tableString += "<td>" + dom.averageThrows + "</td>";
  tableString += "</tr>";
 
  document.getElementById('statisticsTable').innerHTML = tableString;

}

function maxRowsPerPageOnChange() {
    var x = parseInt(document.getElementById("maxRowsPerPage").value);
    dom.firstVisibleRow = 1;
    dom.lastVisibleRow = x;
    dom.maxRowsPerPage = x;
    outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}

function navButtonClick(direction) {
  switch (direction){
    case 'first':
      dom.firstVisibleRow = 1;
      dom.lastVisibleRow = dom.maxRowsPerPage;
      break;
    case 'previous':
      dom.firstVisibleRow -= dom.maxRowsPerPage;
      dom.lastVisibleRow -= dom.maxRowsPerPage;
      break;
    case 'next':
       dom.firstVisibleRow += dom.maxRowsPerPage;
       dom.lastVisibleRow += dom.maxRowsPerPage;
       break;
    case 'last':
      dom.firstVisibleRow = 101 - dom.maxRowsPerPage;
      dom.lastVisibleRow = 100;
      break;
  }
  outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}

function checkButtons(){
  if (dom.firstVisibleRow < dom.maxRowsPerPage) {
    document.getElementById("buttonFirst").className = "disabled";
    document.getElementById("buttonPrevious").className = "disabled";
  }
  else {
    document.getElementById("buttonFirst").className = "unDisabled";
    document.getElementById("buttonPrevious").className = "unDisabled";
  };
  if ((dom.firstVisibleRow + dom.maxRowsPerPage) >= 100) {
    document.getElementById("buttonNext").className = "disabled";
    document.getElementById("buttonLast").className = "disabled";
  }
  else {
    document.getElementById("buttonNext").className = "unDisabled";
    document.getElementById("buttonLast").className = "unDisabled";
  };
}

