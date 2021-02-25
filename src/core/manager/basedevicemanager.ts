

import { DeviceError, ErrorCode, DeviceErrorDescription } from "../error";
import { IAudioConstraints, IDeviceManager, IError, IScreenConstraints, IVideoConstraints, DeviceType } from "../interface";

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

export class BaseDeviceManager implements IDeviceManager {

  constructor () {

  }

  public checkSupportScreenShare (): boolean {
    if (navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const mediaDevices = navigator.mediaDevices as any;
      if (mediaDevices.getDisplayMedia) {
        return true
      }
    }
    return false;
  }

  public getCameraList (): Promise<Array<MediaDeviceInfo>> {
    return new Promise((resolve, reject) => {
      if (this.checkSupport()) {
        this.getDeviceRight(DeviceType.Camera).then(() => {
          this.getDeviceList(DeviceType.Camera).then((list) => {
            resolve(list)
          }).catch((err) => {
            reject(this.parseError(DeviceType.Camera, err));
          })
        }).catch((err) => {
          reject(this.parseError(DeviceType.Camera, err));
        })
      } else {
        reject(new DeviceError(ErrorCode.ERROR_DEVICE_NOTSUPPORT, "not support navigator.mediaDevices"))
      }
    })
  }

  public getMicList (): Promise<Array<MediaDeviceInfo>> {
    return new Promise((resolve, reject) => {
      if (this.checkSupport()) {
        this.getDeviceRight(DeviceType.Mic).then(() => {
          this.getDeviceList(DeviceType.Mic).then((list) => {
            resolve(list);
          }).catch((err) => {
            reject(this.parseError(DeviceType.Mic, err))
          })
        }).catch((err) => {
          reject(this.parseError(DeviceType.Mic, err));
        })
      } else {
        reject(new DeviceError(ErrorCode.ERROR_DEVICE_NOTSUPPORT, "not support navigator.mediaDevices"))
      }
    })
  }

  public getAudioTrack (constraints?: IAudioConstraints): Promise<MediaStreamTrack> {
    return new Promise((resolve, reject) => {
      if (this.checkSupport()) {
        let audioConstraints: { 
          audio ?: boolean | IAudioConstraints;
        };
        if (constraints && constraints.deviceId) {
          audioConstraints = { 
            audio: {deviceId: constraints.deviceId}
          }
        } else {
          audioConstraints = { audio: true };
        }
        navigator.mediaDevices.getUserMedia(audioConstraints).then((mediastream) => {
          resolve(mediastream.getAudioTracks()[0]);
        }).catch((err) => {
          reject(this.parseError(DeviceType.Mic, err));
        })
      } else {
        reject(new DeviceError(ErrorCode.ERROR_DEVICE_NOTSUPPORT, "not support navigator.mediaDevices"));
      }
    })
  }

  public getVideoTrack (constraints: IVideoConstraints): Promise<MediaStreamTrack> {
    return new Promise((resolve, reject) => {
      if (this.checkSupport()) {
        let videoConstraints = this.createVideoConstraints(constraints);
        navigator.mediaDevices.getUserMedia(videoConstraints).then((mediastream) => {
          resolve(mediastream.getVideoTracks()[0]);
        }).catch((err) => {
          reject(this.parseError(DeviceType.Camera, err))
        })
      } else {
        reject(new DeviceError(ErrorCode.ERROR_DEVICE_NOTSUPPORT, "not support navigator.mediaDevices"))
      }
    })
  }

  public getScreenTrack (constraints: IScreenConstraints): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      if (this.checkSupportScreenShare()) {
        navigator.mediaDevices.getDisplayMedia(constraints).then((mediastream: MediaStream) => {
          resolve(mediastream);
        }).catch((err) => {
          reject(this.parseError(DeviceType.Screen, err));
        })
      } else {
        reject(new DeviceError(ErrorCode.ERROR_SCREENSHARE_NOTSUPPORT, "browser not support screenshare"))
      }
    })
  }


  protected checkSupport (): boolean {
    if (navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices && navigator.mediaDevices.getUserMedia) {
      return true;
    }
    return false
  }

  protected getDeviceList (deviceType: DeviceType): Promise<Array<MediaDeviceInfo>> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.enumerateDevices().then((deviceList) => {
        let arr: Array<MediaDeviceInfo> = [];
        deviceList.forEach((device: MediaDeviceInfo) => {
          if (device.kind === deviceType) {
            arr.push(device);
          }
        })
        resolve(arr);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  protected getDeviceRight (deviceType: DeviceType): Promise<IError | undefined > {
    return new Promise((resolve, reject) => {
      let constraints;
      if (DeviceType.Camera === deviceType) {
        constraints = {video: true};
      } else if (DeviceType.Mic === deviceType) {
        constraints = {audio: true}
      }
      navigator.mediaDevices.getUserMedia(constraints).then((mediastream) => {
        mediastream.getVideoTracks().forEach((track) => {
          track.stop();
        })
        resolve(undefined);
      }).catch((err) => {
        reject(err);
      })
    })
  }

  protected parseError (deviceType: DeviceType, err:Error): IError {
    let error: IError | null = null;
    if (DeviceType.Mic === deviceType) {
      error = this.parseAudioError(err);
    } else if (DeviceType.Camera === deviceType) {
      error = this.parseAudioError(err);
    } else if (DeviceType.Screen === deviceType) {
      error = this.parseAudioError(err);
    }
    if (null === error) {
      return new DeviceError(ErrorCode.ERROR_DEVICE_UNKNOWNERROR, "");
    } 
    return error;
  }

  protected parseAudioError (err: Error): IError | null {
    if (err.message === DeviceErrorDescription.ERRORMESSAGE_DEVICENOTFOUND 
      || err.name === DeviceErrorDescription.ERRORNAME_DEVICENOTFOUND) {
      return new DeviceError(ErrorCode.ERROR_DEVICE_AUDIODEVICE_NOTFOUND, "audio device not found");
    } else if (err.message === DeviceErrorDescription.ERRORMESSAGE_DEVICENOTALLOWED 
      || err.message === DeviceErrorDescription.ERRORMESSAGE_MACSAFARI_DEVICENOTALLOWED) {
      return new DeviceError(ErrorCode.ERROR_DEVICE_AUDIODEVICE_NOTALLOWED, "audio device not allowed");
    } else if (err.message === DeviceErrorDescription.ERRORMESSAGE_MACCHROME_DEVICENOTREADABLE 
      || err.message === DeviceErrorDescription.ERRORMESSAGE_AUDIODEVICENOTREADABLE 
      || err.message === DeviceErrorDescription.ERRORNAME_DEVICENOTREADABLE) {
      return new DeviceError(ErrorCode.ERROR_DEVICE_AUDIODEVICE_NOTREADABLE, "audio device not readable");
    }
    return null;
  }

  protected parseVideoError (err: Error): IError | null {
    if (err.message === DeviceErrorDescription.ERRORMESSAGE_DEVICENOTFOUND 
      || err.name === DeviceErrorDescription.ERRORNAME_DEVICENOTFOUND) {
        return new DeviceError(ErrorCode.ERROR_DEVICE_VIDEODEVICE_NOTFOUND, "video device not found");
    } else if (err.message === DeviceErrorDescription.ERRORMESSAGE_DEVICENOTALLOWED 
      || err.message === DeviceErrorDescription.ERRORMESSAGE_MOBILEDEVICE_NOTALLOWED 
      || err.message === DeviceErrorDescription.ERRORMESSAGE_MACSAFARI_DEVICENOTALLOWED) {
      return new DeviceError(ErrorCode.ERROR_DEVICE_VIDEODEVICE_NOTALLOWED, "video device not allowed");
    } else if (err.message === DeviceErrorDescription.ERRORMESSAGE_MACCHROME_DEVICENOTREADABLE 
      || err.message === DeviceErrorDescription.ERRORMESSAGE_VIDEODEVICENOTREADABLE 
      || err.name === DeviceErrorDescription.ERRORNAME_DEVICENOTREADABLE) {
      return new DeviceError(ErrorCode.ERROR_DEVICE_VIDEODEVICE_NOTREADABLE, "video device not readable");
    } 
    // else if (err.name === DeviceErrorDescription.ERRORNAME_DEVICEOVERCONSTRAINED) {
    //   return new DeviceError(ErrorCode.ERROR_DEIVCE_CONSTRAINEDERROR, "constraints" + err.constraint + " error");
    // }
    return null;
  }

  protected parseScreenError (err: Error): IError | null {
    return null;
  }

  /**
   * processing parameters
   * 
   * @param constraints 
   */
  protected createVideoConstraints(constraints: IVideoConstraints): MediaStreamConstraints {
    let videoConstraints: MediaStreamConstraints;
    if (!constraints.deviceId && !constraints.width && !constraints.height && !constraints.frameRate) {
      videoConstraints = { video: true };
    } else {
      videoConstraints = {
        video: {
          deviceId: constraints.deviceId,
          width: constraints.width,
          height: constraints.height,
          frameRate: constraints.frameRate,
        }
      };
    }
    return videoConstraints;
  }
}