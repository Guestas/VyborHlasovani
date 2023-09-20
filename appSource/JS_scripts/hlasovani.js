/* 

        vars a const

*/


//labels
hlasl = [{"lpro": "", "lproti": "", "lzdrzeni": ""}]//json of labels 
hlasll = [{"llpro": "", "llproti": "", "llzdrzeni": ""}]//json of labels 
hlaslll = [{"lllpro": "", "lllproti": "", "lllzdrzeni": ""}]//json of labels
data_hlasovani = [{"pro": [], "proti": [], "zdrzeni": []}]//json od data ints of apartments
hlast = [{"tpro": "", "tproti": "", "tzdrzeni": ""}]//json of textboxes
console.log(hlasl, hlasll, hlaslll, data_hlasovani, hlast)

document.querySelectorAll('.hlasovll').forEach(item => {
  hlasll[0][item.id] = item
  item.innerText = ""
})

document.querySelectorAll('.hlasovl').forEach(item => {
  hlasl[0][item.id] = item
  item.innerText = ""
})

document.querySelectorAll('.hlasovlll').forEach(item => {
  hlaslll[0][item.id] = item
})


function updateValues(){
  zh.forEach(x=>console.log(x.value, zastoupeni[x.id[1]-1]))
  p1 = getNamesHlas(data_hlasovani[0]["pro"])[1]
  p2 = getNamesHlas(data_hlasovani[0]["proti"])[1]
  p3 = getNamesHlas(data_hlasovani[0]["zdrzeni"])[1]
  zh.forEach(x=>{
    if (x.value=="pro"){
      p1 += zastoupeni[x.id[1]-1]
    }
    else if (x.value == "proti"){
      p2 += zastoupeni[x.id[1]-1]
    }
    else if (x.value == "zdrzeni"){
      p3 += zastoupeni[x.id[1]-1]
    }
  })
  hlaslll[0]["lllpro"].innerText = "Přítomných:"+p1+"/"+usnasenipritomnych+"="+Math.round(p1/usnasenipritomnych*10000,4)/100+"%  \n Celku: "+p1+"/"+usnasenisch+"="+Math.round(p1/usnasenisch*10000,4)/100+"%"
  hlaslll[0]["lllproti"].innerText = "Přítomných:"+p2+"/"+usnasenipritomnych+"="+Math.round(p2/usnasenipritomnych*10000,4)/100+"%  \n Celku: "+p2+"/"+usnasenisch+"="+Math.round(p2/usnasenisch*10000,4)/100+"%"
  hlaslll[0]["lllzdrzeni"].innerText = "Přítomných:"+p3+"/"+usnasenipritomnych+"="+Math.round(p3/usnasenipritomnych*10000,4)/100+"%  \n Celku: "+p3+"/"+usnasenisch+"="+Math.round(p3/usnasenisch*10000,4)/100+"%"
}

document.querySelectorAll('[name="hlasovt"]').forEach(item => {
  hlast[0][item.id] = item
})


i=0
document.querySelectorAll('.zastupy').forEach(item => {
  item.innerText = zastupy[i]
  i++
})

var zh = []// class="lab"
document.querySelectorAll('[name="combo"]').forEach(item =>{
  zh.push(item)
})


document.querySelectorAll('.butons').forEach(item =>{
  item.addEventListener('click', event => {
    //console.log(item.id, pritomni, data_hlasovani)
    pritomni.forEach(p=>{
      pridani(data_hlasovani[0][item.id], hlasll[0]["ll"+item.id], hlast[0]["t"+item.id], "Enter", p, hlaslll[0]["lll"+item.id],)
    })
    updateValues()
  })
})
document.querySelectorAll('.dell').forEach(item =>{
  item.addEventListener('click', event => {
    //console.log(item.id, pritomni, data_hlasovani)
    data_hlasovani[0][item.id] = []
    p1 = getNamesHlas(data_hlasovani[0][item.id])
    hlast[0]["t"+item.id].innerText = p1[0]
    hlast[0]["t"+item.id].scrollTop = hlast[0]["t"+item.id].scrollHeight;
    
    updateValues()
    console.log(getNamesHlas(data_hlasovani[0]["pro"]),getNamesHlas(data_hlasovani[0]["proti"]),getNamesHlas(data_hlasovani[0]["zdrzeni"]))
    //hodn.innerText = "Přítomných:"+p1[1]+"/"+usnasenipritomnych+"="+Math.round(p1[1]/usnasenipritomnych*10000,4)/100+"%  \n Celku: "+p1[1]+"/"+usnasenisch+"="+Math.round(p1[1]/usnasenisch*10000,4)/100+"%"
    //hlaslll[0]["lllpro"].innerText = "Přítomných:"+0+"/"+usnasenipritomnych+"="+Math.round(0/usnasenipritomnych*10000,4)/100+"%  \n Celku: "+0+"/"+usnasenisch+"="+Math.round(0/usnasenisch*10000,4)/100+"%"
  
  })
})



//button
const butte = document.getElementById('buttonX')

butte.addEventListener('click', function(event) {
  updateValues()
})

/* 

        nacteni

*/

pritomnia = []
window.api.receive_cmd("fromMain_pritomni", (data) => {pritomnia = data});

/* 

        funkce
      nactení atp

*/


function getNamesHlas(ar){
  printuzivatelu = ""
  hodnota_o = 0
  ar.forEach(cb => {
    b = bytyInfo[cb-1]
    printuzivatelu += b.c_byt + " " + b.uzivatele + " " + b.vymera+ " " + b.zastup + "\n"
    hodnota_o += b.vymera
  });
  
  return [printuzivatelu, hodnota_o]
}


function pridani(dataarr, labl, tex, key, val, hodn){
    cbv = parseInt(val)
    hlasovali = data_hlasovani[0]["pro"].concat(data_hlasovani[0]["proti"],data_hlasovani[0]["zdrzeni"])
    hl = ""
    data_hlasovani[0]["pro"].includes(cbv) ? hl="v pro": data_hlasovani[0]["proti"].includes(cbv) ? hl="v proti": data_hlasovani[0]["zdrzeni"].includes(cbv) ? hl="v zdrzeni":hl="nebyli"
    console.log(hl)
    if (cbv <= 126 && cbv > 0 && pritomni.includes(cbv)){
      if (key === "a" || key === "Enter" && !hlasovali.includes(cbv)) {
        if (zastoupeni1.includes(cbv)||zastoupeni2.includes(cbv)||zastoupeni3.includes(cbv)||zastoupeni4.includes(cbv)){
          console.log("zastupováni")
        }
        else{
          if (pritomni.includes(cbv) && !hlasovali.includes(cbv)) {
            dataarr.push(cbv)
            labl.innerText = cbv
            labl.style.color = "green"
          }
          else if (hlasovali.includes(cvb)) {
            console.log("už v: ", hl)
          }
        }
      }
      else if (key === "d"){
        if (zastoupeni1.includes(cbv)||zastoupeni2.includes(cbv)||zastoupeni3.includes(cbv)||zastoupeni4.includes(cbv)){
          console.log("zastupováni")
        }
        else{
          if (!dataarr.includes(cbv)) {console.log("nepritomni")}
          else if (dataarr.includes(cbv)) {
            dataarr.splice(dataarr.indexOf(cbv),1)
            labl.innerText = cbv
            labl.style.color = "red"
          }
          else console.log("jsou v: ", hl)
          
        }
      }
      p1 = getNamesHlas(dataarr)
      tex.innerText = p1[0]
      tex.scrollTop = tex.scrollHeight;
      updateValues()
      }
    else{
      console.log("Nepřítomni nebo mimo rozsah")
    }
}

/* 

        eventy
      nactení atp

*/


document.querySelectorAll('.hlasov').forEach(item => {
  item.addEventListener('input', ()=>{
    itv = item.value
    
    if (itv >= 1 && itv <= 126) 
      out = jsonToTxt([bytyInfo[itv-1]])
    else out = "mimo hodnotu"
    hlasl[0]["l"+item.id].innerText = out

  })
  item.addEventListener('keypress', event => {
    out = ""
    if (event.key == "a" || event.key == "Enter" || event.key == "d"){
      pridani(data_hlasovani[0][item.id], hlasll[0]["ll"+item.id], hlast[0]["t"+item.id], event.key, item.value, hlaslll[0]["lll"+item.id],)
      item.value=""
      //console.log(data_hlasovani, pritomni)
      //data array, label, textbox, key, value
    }
  })
})

