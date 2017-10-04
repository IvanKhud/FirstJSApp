var dom = {
  results: [],
  maxThrows: 0,
  minThrows: 100,
  averageThrows: 0,
  firstVisibleRow: 1,
  lastVisibleRow: 5,
  maxRowsPerPage: 5,


  onStart: function() {
    document.getElementById("maxRowsPerPageForm").style.visibility = 'visible';
    document.getElementById("pages").style.visibility = 'visible';
    document.getElementById("firstVisibleRowForm").style.visibility = 'visible';
    document.getElementById("firstVisibleRow").value = 1;
    main();
    var button1 = document.getElementById('mainBtn');
    button1.innerHTML = 'Reset';
    button1.className = 'btn btn-danger btn-block';
    document.getElementById("errorMessage").style.visibility = 'hidden';
    document.getElementById("startMessage").style.visibility = 'hidden';
  },



  buttonPush: function() {
    var button1 = document.getElementById('mainBtn');
    if (button1.innerHTML == 'Start') {
     document.getElementById("maxRowsPerPageForm").style.visibility = 'visible';
     document.getElementById("pages").style.visibility = 'visible';
     document.getElementById("firstVisibleRowForm").style.visibility = 'visible';
     document.getElementById("firstVisibleRow").value = 1;
     main();
     button1.innerHTML = 'Reset';
     button1.className = 'btn btn-danger btn-block';
     document.getElementById("startMessage").style.visibility = 'hidden';
    }
      else {
        document.getElementById("maxRowsPerPage").value = 5;
        document.getElementById("maxRowsPerPageForm").style.visibility = 'hidden';
        document.getElementById("pages").style.visibility = 'hidden';
        document.getElementById("firstVisibleRowForm").style.visibility = 'hidden';
        document.getElementById("errorMessage").style.visibility = 'hidden';
        document.getElementById('generalTable').innerHTML = ""; 
        document.getElementById('statisticsTable').innerHTML = "";
        button1.innerHTML = 'Start';
        button1.className = 'btn btn-success btn-block';
        document.getElementById("startMessage").style.visibility = 'visible';
      };
    dom.onBodyResize();
  }, 



  outputResults: function(first, last) {
    var tableString = "";
    document.getElementById('generalTable').innerHTML = "";
    for (i = first; i <= last; i ++) {
      tableString += "<tr>";
      tableString += "<td>" + i + "</td>";
      tableString += "<td>" + dom.results[i] + "</td>";
      tableString += "</tr>";
    }
    document.getElementById('generalTable').innerHTML = tableString;
    dom.outputStatistics();
    dom.checkButtons();
    dom.onBodyResize();
  },


  outputStatistics: function() {
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
  },

  maxRowsPerPageOnChange: function() {
    dom.maxRowsPerPage = parseInt(document.getElementById("maxRowsPerPage").value);
    if ((dom.firstVisibleRow + dom.maxRowsPerPage) > 100) {
      dom.lastVisibleRow = 100;
      dom.firstVisibleRow = 101 - dom.maxRowsPerPage;
    }
      else {
        dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage - 1;
      } 
    dom.outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
    dom.onBodyResize();
  },

  navButtonClick: function(direction) {
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
    document.getElementById("firstVisibleRow").value = dom.firstVisibleRow;
    dom.outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
  },

  checkButtons: function(){
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
  },

  onScrollCheck: function() {
    if (window.pageYOffset > 50) {
      document.getElementById("returnToTop").style.display = "inline";
    }
      else {
        document.getElementById("returnToTop").style.display = "none";
      };
    if (window.pageYOffset < (document.body.scrollHeight - document.body.clientHeight - 50)) {
      document.getElementById("returnToBottom").style.display = "inline";
    }
      else {
        document.getElementById("returnToBottom").style.display = "none";
      };
  },

  toTop: function() {
    window.scrollTo(0,0);
  },
  
  toBottom: function() {
    window.scrollTo(0,document.body.scrollHeight);
  },

  onBodyResize: function() {
    if (document.body.scrollHeight > document.body.clientHeight) {
      document.getElementById("topBottomForm").style.display = "inline"; 
      dom.onScrollCheck();
    }
      else {
        document.getElementById("returnToBottom").style.display = "none";  
        document.getElementById("returnToTop").style.display = "none"; 
        document.getElementById("topBottomForm").style.display = "none"; 
      };
  },

  firstVisibleRowChange: function() {
    var typedFirstVisibleRow = + document.getElementById("firstVisibleRow").value;
    if(typedFirstVisibleRow >= 1 && typedFirstVisibleRow <= 100) {
      document.getElementById("errorMessage").style.visibility  = "hidden";
      dom.firstVisibleRow = typedFirstVisibleRow;
      if ((dom.firstVisibleRow + dom.maxRowsPerPage) > 100) {
        dom.lastVisibleRow = 100;
      }
        else {
          dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage - 1;
        }; 
      dom.outputResults(dom.firstVisibleRow, dom.lastVisibleRow);   
    } 
      else {
        document.getElementById("firstVisibleRow").value = "";
        document.getElementById("errorMessage").style.visibility  = "visible";
        dom.makeErrorMessage(typedFirstVisibleRow); 
      }; 
  },

  makeErrorMessage: function(input) {
    if (input < 1) {
      document.getElementById("errorMessage").innerHTML  = 'You can start from "1" only';
    } 
      else if (input > 100) {
        document.getElementById("errorMessage").innerHTML  = 'There are only 100 floors';
      } 
        else {
          document.getElementById("errorMessage").innerHTML  = 'You can only enter a number';
        };
  }

}

window.onload = dom.onStart;

window.onscroll = function() {dom.onScrollCheck()};
