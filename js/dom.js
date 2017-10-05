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
    var button = document.getElementById('mainButton');
    button.innerHTML = 'Reset';
    button.className = 'btn btn-danger btn-block';
    document.getElementById("errorMessage").style.visibility = 'hidden';
    document.getElementById("startMessage").style.visibility = 'hidden';
  },

  buttonPush: function() {
    var button = document.getElementById('mainButton');

    if (button.innerHTML == 'Start') {
     document.getElementById("maxRowsPerPageForm").style.visibility = 'visible';
     document.getElementById("pages").style.visibility = 'visible';
     document.getElementById("firstVisibleRowForm").style.visibility = 'visible';
     document.getElementById("firstVisibleRow").value = 1;
     main();
     button.innerHTML = 'Reset';
     button.className = 'btn btn-danger btn-block';
     document.getElementById("startMessage").style.visibility = 'hidden';
    } else {
      document.getElementById("maxRowsPerPage").value = 5;
      document.getElementById("maxRowsPerPageForm").style.visibility = 'hidden';
      document.getElementById("pages").style.visibility = 'hidden';
      document.getElementById("firstVisibleRowForm").style.visibility = 'hidden';
      document.getElementById("errorMessage").style.visibility = 'hidden';
      document.getElementById('generalTable').getElementsByTagName('tbody')[0].innerHTML = "";
      document.getElementById('statisticsTable').getElementsByTagName('tbody')[0].innerHTML = "";
      button.innerHTML = 'Start';
      button.className = 'btn btn-success btn-block';
      document.getElementById("startMessage").style.visibility = 'visible';
    }

    dom.onBodyResize();
  }, 



  outputResults: function(first, last) {
    document.getElementById('generalTable').getElementsByTagName('tbody')[0].innerHTML = "";
      var tableRef = document.getElementById('generalTable').getElementsByTagName('tbody')[0];

      for (i = first; i <= last; i ++) {
        var newRow   = tableRef.insertRow(tableRef.rows.length);
        var newCell1  = newRow.insertCell(0);
        var newText1  = document.createTextNode(i);
        newCell1.appendChild(newText1);
        var newCell2  = newRow.insertCell(1); 
        var newText2  = document.createTextNode(dom.results[i]);
        newCell2.appendChild(newText2);
      }

    dom.outputStatistics();
    dom.checkButtons();
    dom.onBodyResize();
  },


  outputStatistics: function() {
    var tableStat = document.getElementById('statisticsTable').getElementsByTagName('tbody')[0];
    tableStat.innerHTML = "";
        var newRow1   = tableStat.insertRow(tableStat.rows.length);
        var newCell11  = newRow1.insertCell(0);
        var newText11  = document.createTextNode('Minimum');
        newCell11.appendChild(newText11);
        var newCell12  = newRow1.insertCell(1); 
        var newText12  = document.createTextNode(dom.minThrows);
        newCell12.appendChild(newText12);
 
        var newRow2   = tableStat.insertRow(tableStat.rows.length);
        var newCell21  = newRow2.insertCell(0);
        var newText21  = document.createTextNode('Maximum');
        newCell21.appendChild(newText21);
        var newCell22  = newRow2.insertCell(1); 
        var newText22  = document.createTextNode(dom.maxThrows);
        newCell22.appendChild(newText22); 

        var newRow3   = tableStat.insertRow(tableStat.rows.length);
        var newCell31  = newRow3.insertCell(0);
        var newText31  = document.createTextNode('Average');
        newCell31.appendChild(newText31);
        var newCell32  = newRow3.insertCell(1); 
        var newText32  = document.createTextNode(dom.averageThrows);
        newCell32.appendChild(newText32); 
  },

  maxRowsPerPageOnChange: function() {
    dom.maxRowsPerPage = parseInt(document.getElementById("maxRowsPerPage").value);

    if ((dom.firstVisibleRow + dom.maxRowsPerPage) > 100) {
      dom.lastVisibleRow = 100;
      dom.firstVisibleRow = 101 - dom.maxRowsPerPage;
    } else {
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
    }

    document.getElementById("firstVisibleRow").value = dom.firstVisibleRow;
    dom.outputResults(dom.firstVisibleRow, dom.lastVisibleRow);
  },

  checkButtons: function(){

    if (dom.firstVisibleRow == 1) {
      document.getElementById("buttonFirst").className = "disabled";
      document.getElementById("buttonPrevious").className = "disabled";
    } else {
      document.getElementById("buttonFirst").className = "unDisabled";
      document.getElementById("buttonPrevious").className = "unDisabled";
    }

    if (dom.lastVisibleRow == 100) {
      document.getElementById("buttonNext").className = "disabled";
      document.getElementById("buttonLast").className = "disabled";
    } else {
    document.getElementById("buttonNext").className = "unDisabled";
    document.getElementById("buttonLast").className = "unDisabled";
    }

  },

  onScrollCheck: function() {

    if (window.pageYOffset > 50) {
      document.getElementById("returnToTop").style.display = "inline";
    } else {
      document.getElementById("returnToTop").style.display = "none";
    }

    if (window.pageYOffset < (document.body.scrollHeight - document.body.clientHeight - 50)) {
      document.getElementById("returnToBottom").style.display = "inline";
    } else {
      document.getElementById("returnToBottom").style.display = "none";
    }

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
    } else {
      document.getElementById("returnToBottom").style.display = "none";  
      document.getElementById("returnToTop").style.display = "none"; 
      document.getElementById("topBottomForm").style.display = "none"; 
    }

  },

  firstVisibleRowChange: function() {
    var typedFirstVisibleRow = + document.getElementById("firstVisibleRow").value;

    if(typedFirstVisibleRow >= 1 && typedFirstVisibleRow <= 100) {
      document.getElementById("errorMessage").style.visibility  = "hidden";
      dom.firstVisibleRow = typedFirstVisibleRow;

      if ((dom.firstVisibleRow + dom.maxRowsPerPage) > 100) {
        dom.lastVisibleRow = 100;
      } else {
        dom.lastVisibleRow = dom.firstVisibleRow + dom.maxRowsPerPage - 1;
      }

      dom.outputResults(dom.firstVisibleRow, dom.lastVisibleRow);   
    } else {
      document.getElementById("firstVisibleRow").value = "";
      document.getElementById("errorMessage").style.visibility  = "visible";
      dom.makeErrorMessage(typedFirstVisibleRow); 
    }

  },

  makeErrorMessage: function(input) {

    if (input < 1) {
      document.getElementById("errorMessage").innerHTML  = 'You can start from "1" only';
    } else if (input > 100) {
      document.getElementById("errorMessage").innerHTML  = 'There are only 100 floors';
    } else {
      document.getElementById("errorMessage").innerHTML  = 'You can only enter a number';
    }

  }

}

window.onload = dom.onStart;

window.onscroll = dom.onScrollCheck;
