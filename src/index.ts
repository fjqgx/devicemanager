import { DeviceErrorCode, FacingMode, IAudioConstraints, IVideoConstraints, IScreenConstraints, IError } from "./core/interface";
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

export { 
  BrowserDeviceManager,
  DeviceErrorCode, 
  FacingMode, 
  IAudioConstraints, 
  IVideoConstraints, 
  IScreenConstraints, 
  IError 
};