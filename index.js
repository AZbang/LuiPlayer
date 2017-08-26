const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', () => {
  if(process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    transparent: true,
    frame: false,
    height: 420,
    width: 360,
  });

  mainWindow.loadURL('file://' + __dirname + '/renderer/index.html');
  mainWindow.setResizable(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
