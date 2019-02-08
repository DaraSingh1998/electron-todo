const electron = require('electron');

const {app,BrowserWindow,Menu} = electron;

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
    height:200,
    title:"Add New Todo"
  });
  addWindow.loadURL(`file://${__dirname}/Pages/add.html`);
}

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
