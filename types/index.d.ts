
export = DeviceManager;
export as namespace DeviceManager;

declare namespace DeviceManager {

  export enum ErrorCode {
    ERROR_DEVICE_UNKNOWNERROR = 10000,
    ERROR_DEVICE_AUDIODEVICE_NOTFOUND,
    ERROR_DEVICE_VIDEODEVICE_NOTFOUND,
    ERROR_DEVICE_AUDIODEVICE_NOTALLOWED,
    ERROR_DEVICE_VIDEODEVICE_NOTALLOWED,
    ERROR_DEVICE_AUDIODEVICE_NOTREADABLE,
    ERROR_DEVICE_VIDEODEVICE_NOTREADABLE,
  
    ERROR_SCREENSHARE_NOTSUPPORT = 10010,
    ERROR_SCREENSHARE_NOTALLOWED,
    ERROR_SCREENSHARE_ENDED,
    ERROR_SCREENSHARE_NOPERMISSION,
    ERROR_SCREENSHARE_SAFARI_INVALIDACCESS,
  
    ERROR_SCREENSHARE_UNKNOWNERRO = 10019,
  
    ERROR_DEVICE_NOTSUPPORT = 20000,
  }
  
  export enum FacingMode {
    USER = "user",
    ENVIRONMENT = "environment",
  }
  
  export interface IError {
    code: number;
    reason: string;
  }
  
  export interface IAudioConstraints {  
    deviceId?: string;
  }

  export interface IVideoConstraints {
    deviceId ?: string;
    facingMode ?: FacingMode;
    width ?: number;
    height ?: number;
  }
  
  export interface IScreenConstraints {
    audio ?: boolean;
    video ?: boolean;
  }
  
  export class BrowserDeviceManager {

    checkSupportScreenShare (): boolean;
  
    getCameraList (): Promise<Array<MediaDeviceInfo>>;
  
    getMicList (): Promise<Array<MediaDeviceInfo>>;
  
    getAudioTrack (constraints: IAudioConstraints): Promise<MediaStreamTrack>;
  
    getVideoTrack (constraints: IVideoConstraints): Promise<MediaStreamTrack>;

    getScreenTrack (constraints: IScreenConstraints): Promise<MediaStream>;
  }
}




