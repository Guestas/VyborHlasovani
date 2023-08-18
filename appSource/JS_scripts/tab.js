document.querySelectorAll('.tab').forEach(item => {
    item.addEventListener('click', event => {
      console.log(item, event)
      console.log(item.id[4])
      sortTable(item.id[4])
    })
    
  })


  document.querySelectorAll('.row').forEach(item => {
    item.addEventListener('click', event => {
        console.log(item)
    })
})


document.querySelectorAll('.dropdown').forEach(item => {
    item.addEventListener('click', event => {
      console.log(item)
      contextMenu.classList.remove("show-context-menu");
    })
  })







var contextMenu = document.getElementById("context-menu");

// Hide context menu on click outside
document.addEventListener("click", function(event) {
contextMenu.classList.remove("show-context-menu");
});



// sort table by ithem
table = document.getElementById("myTable");
function sortTable(n) {
    var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }


  



  var data = [{"name":"seznam","address":"www.seznam.cz","color":"#ff0000","period":"9m","coordinates":[0,0],"worker":"default","runing":true},
  {"name":"FB","address":"facebook.com","color":"#0011ff","period":"11m","coordinates":[60,-160],"worker":"default","runing":true},
  {"name":"GOG","address":"google.com","color":"#eeff00","period":"9m","coordinates":[30,-80],"worker":"default","runing":true},
  {"name":"alza","address":"alza.cz","color":"#099806","period":"11m","coordinates":[-60,-160],"worker":"default","runing":true},
  {"name":"Palace","address":"palaceskateboards.com","color":"#fb00ff","period":"13m","coordinates":[-30,-80],"worker":"default","runing":true},
  {"name":"Supreme","address":"supremenewyork.com","color":"#940000","period":"15m","coordinates":[30,80],"worker":"default","runing":true},
  {"name":"www.kos.cvut.cz","address":"www.kos.cvut.cz","color":"#000000","period":"11m","coordinates":[60,160],"worker":"default","runing":true},
  {"name":"chart","address":"www.chartjs.org","color":"#cd4747","period":"11m","coordinates":[-30,80],"worker":"default","runing":true},
  {"name":"epoch time","address":"www.epochconverter.com","color":"#ab00ad","period":"9m","coordinates":[-60,160],"worker":"default","runing":true},
  {"name":"alaska","address":"www.alaskaair.com","color":"#000000","period":"9m","coordinates":[null,null],"worker":"default","runing":true},
  {"name":"au","address":"www.australia.gov.au","color":"#ff5900","period":"11m","coordinates":[null,null],"worker":"default","runing":true},
  {"name":"wifi","address":"192.168.1.1","color":"#ffffff","period":"5m","coordinates":[null,null],"worker":"default","runing":false},
  {"name":"jetbrains","address":"jetbrains.com","color":"#000000","period":"11m","coordinates":[null,null],"worker":"default","runing":true}]

      

    
      // Generate table rows and cells
      
      

      function appendTableData(data){
        data.forEach(function callback(rowData, index){

            var row = document.createElement("tr");
    
            var idCell = document.createElement("td");
            generate(row ,idCell, index, index)
    
            var nameCell = document.createElement("td");
            generate(row ,nameCell, rowData["name"], index)
    
            var addressCell = document.createElement("td");
            generate(row ,addressCell, rowData["address"], index)
    
            var colorCell = document.createElement("td");
            colorCell.style.backgroundColor = rowData["color"];
            context(colorCell)
            colorCell.setAttribute("id", "row" + index);
            row.appendChild(colorCell);
    
            var periodCell = document.createElement("td");
            generate(row, periodCell, rowData["period"], index)
    
            var periodCell = document.createElement("td");
            periodCell.innerHTML = "Lat: " + rowData["coordinates"][0]+"<br>Len: " + rowData["coordinates"][1];
            context(periodCell)
            periodCell.setAttribute("id", "row" + index);
            row.appendChild(periodCell);
    
            var periodCell = document.createElement("td");
            generate(row, periodCell, rowData["worker"], index)
    
            var periodCell = document.createElement("td");
            generate(row, periodCell, rowData["runing"], index)
    
            table.appendChild(row);
          });
      }


      appendTableData(data)

      function generate(row, cell, rowdata, index){
        cell.classList.add("row");
        cell.setAttribute("id", "row" + index);
        cell.addEventListener("click", function() {
            alert("ID clicked: " + rowdata);
          });
        context(cell)
        cell.innerHTML = rowdata;
        row.appendChild(cell);
      }

      function context(cell){
        cell.addEventListener('contextmenu', event => {
            console.log(cell)
            // Show context menu on right click
            event.preventDefault();
            contextMenu.classList.add("show-context-menu");
            contextMenu.style.left = event.pageX + "px";
            contextMenu.style.top = event.pageY + "px";
        })
      }


      var removeAllButton = document.getElementById("remove-all-rows-button");

      // Remove all rows on button click except first one (header)
      removeAllButton.addEventListener("click", function() {
        while (table.lastElementChild && table.lastElementChild!=table.firstElementChild) {
            console.log(table.lastElementChild==table.firstElementChild)
                table.lastElementChild.remove();
          
        }
        appendTableData(data)
      });