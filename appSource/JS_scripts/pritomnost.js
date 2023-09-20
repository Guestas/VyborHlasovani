/* 

        vars a const

*/
//button
const loadb = document.getElementById('load')
//
const uzivatelevypis = document.getElementById('bytyInfo')
const uzivateleprit = document.getElementById('pritomni')
//inputs
const vlozeniCbytu = document.getElementById('vlozeniCbytu')
//labels
const stat = document.getElementById('stat')
const udajebyt = document.getElementById('udajebyt')
const usnaseni = document.getElementById('usnaseni')

var z = []// class="lab"
document.querySelectorAll('.lab').forEach(item => {
  z.push(item)
})
//checkboxs
document.querySelectorAll('.check').forEach(item => {
  item.addEventListener('click', event => {
    pritomniV(parseInt(item.id[6]), item)
    
  })
})

var bytyInfo = []
var pritomni = []
var zastoupeni1 = []
var zastoupeni2 = []
var zastoupeni3 = []
var zastoupeni4 = []
var zastoupeni5 = []
var zaa = [zastoupeni1,zastoupeni2,zastoupeni3,zastoupeni4,zastoupeni5]
var usnasenisch =0//soucet, celek
var usnasenipritomnych = 0 //usnas přitomnych

zastoupeni = [0, 0, 0, 0, 0]
che = [false, false, false, false, false]

/* 

      nactení


*/


window.api.send("toMain_jslo")
  window.api.receive("fromMain_jslo", (data) => {
      zastupy = data.zastupy
      bytyInfo = data.byty
      usnasenisch = 0
      bytyInfo.forEach(element => {
        usnasenisch += element.vymera
        if (element.zastup != 0){
            if (element.zastup==1) {
                zastoupeni1.push(element.c_byt)
                zastoupeni[0] += element.vymera
                }
            else if (element.zastup==2) {
                zastoupeni2.push(element.c_byt)
                zastoupeni[1] += element.vymera
                }
            else if (element.zastup==3) {
                zastoupeni3.push(element.c_byt)
                zastoupeni[2] += element.vymera
                }
            else if (element.zastup==4) {
                zastoupeni4.push(element.c_byt)
                zastoupeni[3] += element.vymera
                }
            else if (element.zastup==5) {
                zastoupeni5.push(element.c_byt)
                zastoupeni[4] += element.vymera
                }
            else if (element.zastup==6) {
                pritomni.push(element.c_byt)
                }
        }
      });
      i = 0
      zb = [zastoupeni1, zastoupeni2, zastoupeni3, zastoupeni4, zastoupeni5]
      z.forEach(element => {
        z[i].innerText += " - hodnota: " + zastoupeni[i] + " počet bytů: " + zb[i].length
        element.innerText = zastupy[i]
        i++
      });
      uzivatelevypis.innerText = jsonToTxt(bytyInfo)
      uzivateleprit.innerText = getNames(pritomni)
      uzivateleprit.scrollTop = uzivateleprit.scrollHeight;
    }
  )

  window.api.receive_cmd("fromMain_showhide", (show) => {
        //zab.forEach(element => {che.push(element.checked)})
        ppk=pritomni.filter(item => !zastoupeni1.concat(zastoupeni2,zastoupeni3,zastoupeni4,zastoupeni5).includes(item))
        window.api.send("toMain_pritomni",[ppk, zastoupeni1, zastoupeni2, zastoupeni3, zastoupeni4, zastoupeni5, che])
  });

/* 

        funkce
      nactení atp

*/

function jsonToTxt(jsonUziv){
  printuzivatelu = ""
  jsonUziv.forEach(el => {
    printuzivatelu += el.c_byt + " " + el.uzivatele + " " + el.vymera+ " " + el.zastup + "\n"
  });
  return printuzivatelu
}


function getNames(ar){
  printuzivatelu = ""
  usnasenipritomnych = 0
  
  ar.forEach(cb => {
    b = bytyInfo[cb-1]
    printuzivatelu += b.c_byt + " " + b.uzivatele + " " + b.vymera+ " " + b.zastup + "\n"
    usnasenipritomnych += + b.vymera
  });
  
  if ((usnasenipritomnych/usnasenisch)*100 >= 50){
    usnaseni.style.color = 'green'
  }
  else{
    usnaseni.style.color = 'red'
  }
  usnaseni.innerText = "Usnášeníschopnost: " + usnasenipritomnych + "/" + usnasenisch + " Procentuelně: " + Math.round(usnasenipritomnych/usnasenisch*10000,4)/100 + "%"
  return printuzivatelu
}


function rewritePritTab(){
  uzivateleprit.innerText = getNames(pritomni)
  uzivateleprit.scrollTop = uzivateleprit.scrollHeight;
  vlozeniCbytu.value = ""
}

function pritomniV(i, zk){
  if (zk.checked){
    zaa[i].forEach(element => {
      pritomni.push(element)
      che[i] = true
    });
  }
  else if (!zk.checked){
    l = []
      pritomni=pritomni.filter(item => !zaa[i].includes(item))
      che[i] = false
  }
  uzivateleprit.innerText = getNames(pritomni)
  uzivateleprit.scrollTop = uzivateleprit.scrollHeight;
}

/* 

        eventy
      nactení atp

*/

loadb.addEventListener('click', ()=>{
  console.log(getNames(pritomni))
})

vlozeniCbytu.addEventListener('input', ()=>{
  out = ""
  if (vlozeniCbytu.value >= 1 && vlozeniCbytu.value <= 126) 
    out = jsonToTxt([bytyInfo[vlozeniCbytu.value-1]])
  else out = "mimo hodnotu"
  udajebyt.innerText = out
})

vlozeniCbytu.addEventListener("keypress", function (event) {
  cb = parseInt(udajebyt.innerText)
  if (cb <= 126 && cb > 0){
    if (event.key === "a" || event.key === "Enter") {
      if (zastoupeni1.includes(cb)||zastoupeni2.includes(cb)||zastoupeni3.includes(cb)||zastoupeni4.includes(cb)){
        console.log("zastupováni")
        vlozeniCbytu.value = ""
      }
      else{
        if (pritomni.includes(cb)) console.log("pritomni")
        else if (!pritomni.includes(cb)) {
          pritomni.push(cb)
          stat.innerText = cb
          stat.style.color = "green"
        }
        rewritePritTab()
        }
    }
    else if (event.key === "d"){
      if (zastoupeni1.includes(cb)||zastoupeni2.includes(cb)||zastoupeni3.includes(cb)||zastoupeni4.includes(cb)){
        console.log("zastupováni")
        vlozeniCbytu.value = ""
      }
      else{
        if (!pritomni.includes(cb)) console.log("nepritomni")
        else if (pritomni.includes(cb)) {
          pritomni.splice(pritomni.indexOf(cb),1)
          stat.innerText = cb
          stat.style.color = "red"
        }
        rewritePritTab()
      }
    }
  }
})



