var dom = {
  results: [],
  firstVisibleRow: 1,
  lastVisibleRow: 5,
  maxRowsPerPage: 5
} 

window.onload = main;

function outputResults(first, last) {
  var tableString = "<table class ='table table-bordered'>",
    body = document.getElementById('output'),
    div = document.createElement('div');
  body.innerHTML = "";
  tableString += "<thead>";
  tableString += "<th>" + "Floor" + "</th>";
  tableString += "<th>" + "Attempts count" + "</th>";
  tableString += "</thead>";
  tableString += "<tbody>";
  for (i = first; i <= last; i ++) {
    tableString += "<tr>";
    tableString += "<td>" + i + "</td>";
    tableString += "<td>" + dom.results[i] + "</td>";
    tableString += "</tr>";
  }
  tableString += "</tbody>";
  tableString += "</table>";
  div.innerHTML = tableString;
  output.appendChild(div);
}

function maxRowsPerPageOnChange() {
    var x = parseInt(document.getElementById("maxRowsPerPage").value);
    dom.firstVisibleRow = 1;
    dom.lastVisibleRow = x;
    dom.maxRowsPerPage = x;
    outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}

  
function buttonFirstClick() {
  dom.firstVisibleRow = 1;
  dom.lastVisibleRow = dom.maxRowsPerPage;
  outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}


function buttonPreviousClick() {
  dom.firstVisibleRow -= dom.maxRowsPerPage;
  dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage;
  outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}


function buttonNextClick() {
  dom.firstVisibleRow += dom.maxRowsPerPage;
  dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage;
  outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}  


function buttonLastClick() {
  dom.firstVisibleRow = 101 - dom.maxRowsPerPage;
  dom.lastVisibleRow = 100;
  outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}