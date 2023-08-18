const pritomnost = document.getElementById('pritomnost')
const hlasovani = document.getElementById('hlasovani')
const windows = [pritomnost, hlasovani]  //div sectors by id

function sh(sh){
  for (let i = 0; i < windows.length; i++) { 
    windows[i].style.display = "none";
  }
  setTimeout(() => {  
    windows[sh].style.display = "block";
  }, 50);
  
}



sh(0)

window.api.receive_cmd("fromMain_showhide", (show) => {
  sh(show);
});