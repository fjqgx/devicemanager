
import { DeviceError, ErrorCode } from "../error";
import { IAudioConstraints, IDeviceManager, IError, IScreenConstraints, IVideoConstraints } from "../interface";

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

enum DeviceType {
  Camera = "videoinput",
  Mic = "audioinput",
  Screen = "screen",
}

export class BaseDeviceManager implements IDeviceManager {

  constructor () {

  }

  public getCameraList (): Promise<Array<MediaDeviceInfo>> {
    return new Promise((resolve, reject) => {
      if (this.checkSupport()) {
        this.getDeviceRight(DeviceType.Camera).then(() => {
          this.getDeviceList(DeviceType.Camera).then((list) => {
            resolve(list)
          }).catch((err) => {
            reject(err);
          })
        }).catch((err) => {
          reject(err);
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
            reject(err)
          })
        }).catch((err) => {
          reject(err);
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
          audio ?: boolean;
          deviceId ?: string;
        };
        if (constraints && constraints.deviceId) {
          audioConstraints = { deviceId: constraints.deviceId}
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

  // public releaseAllStream(): void {
  //   if (this.mediaStream) {
  //     this.mediaStream.getTracks().forEach((track) => {
  //       this.mediaStream.removeTrack(track);
  //       track.stop();
  //     })
  //   }
  // }

  protected checkSupport (): boolean {
    if (navigator && navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      const mediaDevices = navigator.mediaDevices as any;
      if (mediaDevices.getDisplayMedia) {
        return true
      }
    }
    return false
  }

  protected checkSupportScreenShare (): boolean {
    if (navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      return true;
    }
    return false;
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
    return new DeviceError(ErrorCode.ERROR_DEVICE_UNKNOWNERROR, "");
  }

  /**
   * processing parameters
   * 
   * @param constraints 
   */
  protected createVideoConstraints(constraints: IVideoConstraints): MediaStreamConstraints {
    let videoConstraints: MediaStreamConstraints;
    if (!constraints.deviceId && !constraints.width && !constraints.height) {
      videoConstraints = { video: true };
    } else {
      videoConstraints = {
        video: {
          deviceId: constraints.deviceId,
          width: constraints.width,
          height: constraints.height
        }
      };
    }
    return videoConstraints;
  }
}