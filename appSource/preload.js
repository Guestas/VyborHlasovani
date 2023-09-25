const {
    contextBridge,
    ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
    openFile: () => ipcRenderer.invoke('openFiledial'),  //open dialog file
    send: (channel, data) => {  //render to main activate fnc in main with data from face
        // whitelist channels
        let validChannels = ["toMain_jslo","toMain_pritomni", "toMain_savevote"];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
            console.log(channel, " send")//transfer log
        }
        else {console.log(channel," is not in whitelist of send")}
    },
    receive: (channel, func) => {//main to render just send data2 
        // whitelist channels
        let validChannels = ["fromMain_jslo"];
        console.log(channel, " recieve")  //transfer log
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.once(channel, (event, ...args) => func(...args));
        }
        else {console.log(channel," is not in whitelist of recieve")}
    },
    receive_cmd: (channel, func) => {//main to render just send data 
        // whitelist channels
        let validChannels = ["fromMain_showhide", "fromMain_pritomni"];
        console.log(channel, " recieve_cmd")  //transfer log
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
        else {console.log(channel," is not in whitelist of recieve_cmd")}
    },
});