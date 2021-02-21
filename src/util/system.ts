
/**
 * system type
 */
enum SystemType {
  Unknown = 0,
  MacOS,
  Windows,
  Android,
  Iphone,
  Ipad,
  Linux,
}

/**
 * 
 */
export class SystemUtil {

  private systemType: SystemType;

  constructor () {
    this.systemType = SystemType.Unknown;

    this.getSystemInfo();
  }

  get isIos (): boolean {
    return this.systemType === SystemType.Ipad || this.systemType === SystemType.Iphone;
  }

  get isAndroid (): boolean {
    return this.systemType === SystemType.Android;
  }

  get isMacOS (): boolean {
    return this.systemType === SystemType.MacOS;
  }

  get isWindows (): boolean {
    return this.systemType === SystemType.Windows;
  }

  get isLinux (): boolean {
    return this.systemType === SystemType.Linux;
  }

  private getSystemInfo (): void {
    if (navigator && navigator.userAgent) {
      let ua = navigator.userAgent.toLocaleLowerCase();
      if (ua.indexOf('ipad') > -1) {
        this.systemType = SystemType.Ipad;
      } else if (ua.indexOf('iphone') > -1) {
        this.systemType = SystemType.Iphone;
      } else if (ua.indexOf('android') > -1) {
        this.systemType = SystemType.Android;
      } else if (ua.indexOf('win') > -1) {
        this.systemType = SystemType.Windows;
      } else if (ua.indexOf('mac') > -1) {
        this.systemType = SystemType.MacOS;
      } else if (ua.indexOf('linux') > -1) {
        this.systemType = SystemType.Linux;
      } else if (ua.indexOf('') > -1) {
        this.systemType = SystemType.Unknown;
      }
    }
  }
}