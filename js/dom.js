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
  outputStatistics();
}

function outputStatistics() {
  var tableString = "<table class ='table table-bordered'>"
  body = document.getElementById('statistics'),
  div = document.createElement('div');
  body.innerHTML = "";
  tableString += "<thead>";
  tableString += "<th colspan='2'>" + "Statistics" + "</th>";
  tableString += "</thead>";
  tableString += "<tbody>";
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