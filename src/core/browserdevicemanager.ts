
import { SystemUtil } from "../util/system";
import { IAudioConstraints, IDeviceManager, IError, IScreenConstraints, IVideoConstraints } from "./interface";
import { AndroidDeviceManager } from "./manager/androiddevicemanager";
import { BaseDeviceManager } from "./manager/basedevicemanager";
import { IosDeviceManager } from "./manager/iosdevicemanager";
import { LinuxDeviceManager } from "./manager/linuxdevicemanager";
import { MacDeviceManager } from "./manager/macdevicemanager";
import { WindowsDeviceManager } from "./manager/windowsdevicemanager";

export class BrowserDeviceManager implements IDeviceManager {

  private systemUtil: SystemUtil;
  private deviceManager: IDeviceManager;

  constructor () {
    this.systemUtil = new SystemUtil();
    this.deviceManager = this.createDeviceManager(); 
  }

  public getCameraList (): Promise<Array<MediaDeviceInfo>> {
    return this.deviceManager.getCameraList();
  }

  public getMicList (): Promise<Array<MediaDeviceInfo>> {
    return this.deviceManager.getMicList();
  }

  public getAudioTrack (constraints?: IAudioConstraints): Promise<MediaStreamTrack> {
    return this.deviceManager.getAudioTrack(constraints);
  }

  public getVideoTrack (constraints: IVideoConstraints): Promise<MediaStreamTrack> {
    return this.deviceManager.getVideoTrack(constraints);
  }

  public getScreenTrack (constraints: IScreenConstraints): Promise<MediaStream> {
    return this.deviceManager.getScreenTrack(constraints);
  }

  private createDeviceManager ():IDeviceManager {
    if (this.systemUtil.isWindows) {
      return new WindowsDeviceManager();
    } else if (this.systemUtil.isAndroid) {
      return new AndroidDeviceManager();
    } else if (this.systemUtil.isIos) {
      return new IosDeviceManager();
    } else if (this.systemUtil.isMacOS) {
      return new MacDeviceManager();
    } else if (this.systemUtil.isLinux) {
      return new LinuxDeviceManager();
    }
    return new BaseDeviceManager();
  }
}