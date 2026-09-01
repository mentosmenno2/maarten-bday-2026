import { registerApp } from './appRegistry';
import { internetExplorerApp } from './InternetExplorer';
import { myComputerApp } from './MyComputer';
import { notepadApp } from './Notepad';
import { recycleBinApp } from './RecycleBin';

export function registerDefaultApps(): void {
    [myComputerApp, internetExplorerApp, notepadApp, recycleBinApp].forEach(registerApp);
}
