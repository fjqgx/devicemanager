import { BrowserDeviceManager } from "./core/browserdevicemanager";

declare global {
  interface Window {
    BrowserDeviceManager: any;
    define: any;
  }
}

if (window) {
  window.BrowserDeviceManager = BrowserDeviceManager;
}

export { BrowserDeviceManager };