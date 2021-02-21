
export = DeviceManager;
export as namespace DeviceManager;

declare namespace DeviceManager {
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
  
    getCameraList (): Promise<Array<MediaDeviceInfo>>;
  
    getMicList (): Promise<Array<MediaDeviceInfo>>;
  
    getAudioTrack (constraints: IAudioConstraints): Promise<MediaStreamTrack>;
  
    getVideoTrack (constraints: IVideoConstraints): Promise<MediaStreamTrack>;

    getScreenTrack (constraints: IScreenConstraints): Promise<MediaStream>;
  }
}




