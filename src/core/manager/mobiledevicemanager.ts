import { DeviceError, ErrorCode } from "../error";
import { IScreenConstraints, IVideoConstraints } from "../interface";
import { BaseDeviceManager } from "./basedevicemanager";


export class MobileDeviceManager extends BaseDeviceManager {
  constructor() {
    super();
  }

  /**
   * mobile not support screenshare
   * @param constraints 
   */
  public getScreenTrack (constraints: IScreenConstraints): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      reject(new DeviceError(ErrorCode.ERROR_SCREENSHARE_NOTSUPPORT, "mobile not support screenshare"))
    })
  }

  /**
   * processing parameters
   * 
   * @param constraints 
   */
  protected createVideoConstraints(constraints: IVideoConstraints): MediaStreamConstraints {
    let videoConstraints: MediaStreamConstraints;
    if (!constraints.deviceId && !constraints.facingMode && !constraints.width && !constraints.height) {
      videoConstraints = { video: true };
    } else {
      videoConstraints = {
        video: {
          deviceId: constraints.facingMode ? constraints.facingMode : constraints.deviceId,
          width: constraints.width,
          height: constraints.height
        }
      };
    }
    return videoConstraints;
  }
}