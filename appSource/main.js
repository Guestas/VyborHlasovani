const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron')
const path = require('path')
var fs = require('fs')

/*
  install like dev electron
  npm install electron --save-dev

  without devs:
  npm install electron
*/ 

let mainWindow

const options = {
  type: 'question',
  buttons: ['Cancel', 'Yes, please', 'No, thanks'],
  defaultId: 2,
  title: 'Question',
  message: 'Do you want to do this?',
  detail: 'It does not really matter',
  checkboxLabel: 'Remember my answer',
  checkboxChecked: true,
};
// file open and return message with filepath

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog()
  if (canceled) {
    return
  } else {
    options.message = filePaths[0]
    dialog.showMessageBox(mainWindow, options).then(box => {
      console.log('Button Clicked Index - ', box.response);
      console.log('Checkbox Checked - ', box.checkboxChecked);
    }).catch(err => {
      console.log(err)
  }); 
    return filePaths[0]
  }
}


function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1900, height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation : true,
      preload: path.join(__dirname, 'preload.js')}
  })
  //vzhled menu
  const isMac = process.platform === 'darwin'
  const menu = [
      // { role: 'appMenu' }
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'uzivateleices' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideOthers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }] : []),
      // { role: 'fileMenu' }
      {
        label: 'File',
        submenu: [
          { label: 'Load file', click: () => handleFileOpen() },
          { label: 'Save', click: () => "" },
          { label: 'Save as', click: () => "" },
        ]
      },
      {
        label: 'Switch',
        submenu: [
          { label: 'Pritomnost', click: () => mainWindow.webContents.send("fromMain_showhide", 0) },
          { type: 'separator' },
          { label: 'Hlasovani', click: () => mainWindow.webContents.send("fromMain_showhide", 1) },
        ]
      },
      // { role: 'editMenu' }
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
        ]
      },
      // { role: 'windowMenu' }
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          {
            label: 'Wiew',
            submenu: [
              { role: 'resetZoom' },
              { role: 'zoomIn' },
              { role: 'zoomOut' },
              { type: 'separator' },
              { role: 'togglefullscreen' }
            ]
          },
          ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ] : [
            { role: 'close' }
          ])
        ]
      }
  ]
  
  //vývojářské nástroje
  if(process.env.NODE_ENV !== 'production'){
    menu.push({
      label: 'Developer Tools',
      submenu:[
        {
          role: 'Reload'
        },
        {
          label: 'Toggle DevTools',
          accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
          click(item, focusedWindow){focusedWindow.toggleDevTools();}
        }
      ]
    });
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))//nastavení položek v menu
  mainWindow.loadFile(path.join(__dirname, 'index.html'))         //načte html soubor
  mainWindow.webContents.openDevTools()   //otevře vývojářské nástroje při spuštění
}

const { f1 } = require("./JS_mainScripts/te.js");

//načítání aplikace a poté spuštění funkcí které si volá render proces
app.whenReady().then(() => {
  console.log(f1(1,1));
  pritomni = []
  fileName = path.join(__dirname, 'appData/data.json')
  
//načte json pro úpravu dat nebo vytvoří soubor json
  ipcMain.on('toMain_jslo', (event, args) => {
    uzivatele = ""
    fs.readFile(fileName, (err, jsonString) => {
      if (err) {
        fs.writeFileSync(fileName, "[]", (err) => {  //wrive file sync čeká na uložení pak dělá další program 
          if (!err) {
            fs.readFile(fileName, (err, jsonString)=>{uzivatele = jsonString})
          }
        })
      }else{uzivatele=jsonString}
      mainWindow.webContents.send("fromMain_jslo", JSON.parse(uzivatele));
    });
  });

  ipcMain.on('toMain_pritomni', (event, args) => {
    pritomni = args
    mainWindow.webContents.send("fromMain_pritomni", pritomni);
  });

  createWindow()  //otevře okno
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

 // Quit app when closed Zavře vše včetně druhého okna
app.on('close', function () {
  if (process.platform !== 'darwin') app.quit()
})


