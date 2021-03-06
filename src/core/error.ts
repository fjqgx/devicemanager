import { IError } from "./interface";

export enum DeviceErrorCode {
  ERROR_DEVICE_UNKNOWNERROR = 10000,
  ERROR_DEVICE_AUDIODEVICE_NOTFOUND,
  ERROR_DEVICE_VIDEODEVICE_NOTFOUND,
  ERROR_DEVICE_AUDIODEVICE_NOTALLOWED,
  ERROR_DEVICE_VIDEODEVICE_NOTALLOWED,
  ERROR_DEVICE_AUDIODEVICE_NOTREADABLE,
  ERROR_DEVICE_VIDEODEVICE_NOTREADABLE,
  ERROR_DEIVCE_CONSTRAINEDERROR = 10007,

  ERROR_SCREENSHARE_UNKNOWNERRO = 10010,
  ERROR_SCREENSHARE_NOTALLOWED = 10011,
  ERROR_SCREENSHARE_ENDED = 10012,
  ERROR_SCREENSHARE_NOPERMISSION = 10013,
  ERROR_SCREENSHARE_INVALIDACCESS = 10014,
  
  ERROR_SCREENSHARE_NOTSUPPORT = 10018,
  ERROR_DEVICE_NOTSUPPORT = 10019,
}

export enum DeviceErrorDescription {
  ERRORMESSAGE_DEVICENOTFOUND = "Requested device not found",
  ERRORMESSAGE_DEVICENOTALLOWED = "Permission denied",
  ERRORMESSAGE_MACCHROME_DEVICENOTREADABLE = "Permission denied by system", // mac chrome system disable
  ERRORMESSAGE_MACSAFARI_DEVICENOTALLOWED = "The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.",
  ERRORMESSAGE_MOBILEDEVICE_NOTALLOWED = "video device not allowed",
  ERRORMESSAGE_AUDIODEVICENOTREADABLE = "Could not start audio source",
  ERRORMESSAGE_VIDEODEVICENOTREADABLE = "Could not start video source",

  ERRORNAME_DEVICENOTFOUND = "NotFoundError",
  ERRORNAME_DEVICENOTALLOWED = "NotAllowedError",
  ERRORNAME_DEVICENOTREADABLE = "NotReadableError",
  ERRORNAME_DEVICEOVERCONSTRAINED = "OverconstrainedError",
  ERRORNAME_INVALID_ACCESS = "InvalidAccessError",
}

export class DeviceError implements IError {
  public code: number;
  public reason: string;

  constructor (errorCode: number, reason: string) {
    this.code = errorCode;
    this.reason = reason
  }
}