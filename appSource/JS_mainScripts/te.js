const path = require('path');
var fs = require('fs')

const f1 = (a,b) => {


  pritomni = []
  fileName = path.join(__dirname, '..', 'appData/data.json')
  console.log(fileName)
  uzivatele = ""
  fs.readFile(fileName, (err, jsonString) => {
    if (err) {
      fs.writeFileSync(fileName, "[]", (err) => {  //wrive file sync čeká na uložení pak dělá další program 
        if (!err) {
          fs.readFile(fileName, (err, jsonString)=>{uzivatele = jsonString})
        }
      })
    }
    else
    {
      uzivatele=jsonString
    }
    console.log(uzivatele, jsonString)
  });
  
  return uzivatele
}

module.exports = {f1}