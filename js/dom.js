var dom = {
  results: [],
  maxRowsPerPage: 5,
  firstVisibleRow: 1,
  lastVisibleRow: 5
} 

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

window.onload = function() {
  document.getElementById("pages").style.visibility = "hidden";
}
