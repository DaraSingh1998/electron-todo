const electron = require('electron');

const {app,BrowserWindow,Menu,ipcMain} = electron;

let mainWindow;
let addWindow;

app.on('ready',()=>{
  mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true
  }
});
  mainWindow.loadURL(`file://${__dirname}/Pages/main.html`);
  mainWindow.on('closed',()=>app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
  addWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width:300,
    height:300,
    title:"Add New Todo"
  });
  addWindow.loadURL(`file://${__dirname}/Pages/add.html`);
  addWindow.on('closed',()=>addWindow=null);
}

ipcMain.on('todo:add',(event,todo)=>{
  mainWindow.webContents.send('todo:add',todo);
  addWindow.close();
});

const menuTemplate = [
  {
    label:"File",
    submenu:[
      {
        label:"New Todo",
        click(){
          createAddWindow();
        }
      },
      {
        label:"Quit",
        accelerator:"CommandOrControl+Q",
        click(){
          app.quit();
        }
      }
    ]
  }
];
if(process.platform === 'darwin'){
  menuTemplate.unshift({});
}
if(process.env.NODE_ENV!=='production'){
  menuTemplate.push({
    label:"Developer Tools",
    submenu:[{
      label:"Toggle Developer Tools",
      accelerator:"CommandOrControl+Shift+I",
      click(item,focusedWindow){
        focusedWindow.toggleDevTools();
      }
    }]
  });
}