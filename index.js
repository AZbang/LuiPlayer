const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', () => {
  if(process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({frame: false, transparent: true, width: 360, height: 420, minWidth: 360, minHeight: 420});

  mainWindow.loadURL('file://' + __dirname + '/src/index.html');
  // mainWindow.setMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
