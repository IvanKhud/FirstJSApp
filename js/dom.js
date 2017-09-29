var dom = {
  results: [],
  maxThrows: 0,
  minThrows: 100,
  averageThrows: 0,
  firstVisibleRow: 1,
  lastVisibleRow: 5,
  maxRowsPerPage: 5
} 

window.onload = onStart;

function onStart() {
  document.getElementById("maxRowsPerPageForm").style.visibility = 'hidden';
  document.getElementById("pages").style.visibility = 'hidden';
}

function buttonPush() {
 var button1 = document.getElementById('mainBtn');
 if (button1.innerHTML == 'Start') {
   document.getElementById("maxRowsPerPageForm").style.visibility = 'visible';
   document.getElementById("pages").style.visibility = 'visible';
   main();
   button1.innerHTML = 'Reset';
   button1.className = 'btn btn-warning btn-block';
 }
   else {
     document.getElementById("maxRowsPerPage").value = 5;
     document.getElementById("maxRowsPerPageForm").style.visibility = 'hidden';
     document.getElementById("pages").style.visibility = 'hidden';
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
    dom.maxRowsPerPage = parseInt(document.getElementById("maxRowsPerPage").value);
    if ((dom.firstVisibleRow + dom.maxRowsPerPage) > 100) {
      dom.lastVisibleRow = 100;
      dom.firstVisibleRow = 101 - dom.maxRowsPerPage;
    }
      else {
        dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage - 1;
      } 
    outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}

function navButtonClick(direction) {
  switch (direction) {
    case 'first':
      dom.firstVisibleRow = 1;
      dom.lastVisibleRow = dom.maxRowsPerPage;
      break;
    case 'previous':
      dom.firstVisibleRow -= dom.maxRowsPerPage;
      if (dom.firstVisibleRow < 1) {
        dom.firstVisibleRow = 1;
      };  
      dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage - 1;
      break;
    case 'next':
      dom.lastVisibleRow += dom.maxRowsPerPage;
      if (dom.lastVisibleRow > 100) {
        dom.lastVisibleRow = 100;
      };     
      dom.firstVisibleRow = dom.lastVisibleRow - dom.maxRowsPerPage + 1;
      break;
    case 'last':
      dom.lastVisibleRow = 100;
      dom.firstVisibleRow = 101 - dom.maxRowsPerPage;
      break;
  };
  outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
}

function checkButtons(){
  if (dom.firstVisibleRow == 1) {
    document.getElementById("buttonFirst").className = "disabled";
    document.getElementById("buttonPrevious").className = "disabled";
  }
  else {
    document.getElementById("buttonFirst").className = "unDisabled";
    document.getElementById("buttonPrevious").className = "unDisabled";
  };
  if (dom.lastVisibleRow == 100) {
    document.getElementById("buttonNext").className = "disabled";
    document.getElementById("buttonLast").className = "disabled";
  }
  else {
    document.getElementById("buttonNext").className = "unDisabled";
    document.getElementById("buttonLast").className = "unDisabled";
  };
}

window.onscroll = function() {myFunction()};

function myFunction() {
    if (window.pageYOffset > 50) {
      document.getElementById("return-to-top").style.display = "block";
    }
     else {
       document.getElementById("return-to-top").style.display = "none";
     }
        if (window.pageYOffset < (document.body.scrollHeight - document.body.clientHeight - 50)) {
      document.getElementById("return-to-bottom").style.display = "block";
    }
     else {
       document.getElementById("return-to-bottom").style.display = "none";
     }
}
  
function toTop() {
  window.scrollTo(0,0);
}
  
function toBottom() {
  window.scrollTo(0,document.body.scrollHeight);
}
