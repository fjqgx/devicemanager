## 浏览器设备管理
  这是一个用于浏览器的设备管理工具，支持获取麦克风、摄像头和屏幕共享画面。包括一些外接设备

  支持获取麦克风列表
  支持获取摄像头列表
  支持获取麦克风设备，成功返回一个AudioTrack，失败返回错误
  支持获取摄像头设备，成功返回一个VideoTrack，失败返回错误
  支持获取屏幕共享，成功返回一个MediaStream，失败返回错误

  以上接口都是异步返回的，失败可以通过错误码来定位错误原因。
  

  [设备管理demo](https://fjqgx.github.io/devicemanager/demo/)


### 安装
  网页引入
  ``` html
    <script src="./browserdevicemanager.js" ></script>
  ```

  npm引入
  ``` javascript
    npm i browserdevicemanager
  ```

### 用法

#### 获取摄像头列表 
  ``` javascript
    var devicemanager = new BrowserDeviceManager();

    devicemanager.getCameraList().then((list) => {
      for (let i = 0; i < list.length; ++i) {
        console.log("camera label:", list[i].label, "  deviceId:", list[i].deviceId);
      }
    }).catch((err) => {
      console.log(err);
    })
  ```

#### 获取摄像头列表
  ``` javascript
    var devicemanager = new BrowserDeviceManager();

    devicemanager.getMicList().then((list) => {
      for (let i = 0; i < list.length; ++i) {
        console.log("camera label:", list[i].label, "  deviceId:", list[i].deviceId);
      }
    }).catch((err) => {
      console.log(err);
    })
  ```

#### 获取摄像头
  ``` javascript
  var devicemanager = new BrowserDeviceManager();
  devicemanager.getVideoTrack({deviceId: ""}).then((videotrack) => {
    let mediastream = new MediaStream();
    mediastream.addTrack(videotrack);
    video.srcObject = mediastream;  // video is html video element
  }).catch((err) => {
    console.log("get video track error:", err);
  })
  ```

#### 获取麦克风
  ``` javascript
  var devicemanager = new BrowserDeviceManager();

  devicemanager.geAudioTrack({deviceId: ""}).then((videotrack) => {
    let mediastream = new MediaStream();
    mediastream.addTrack(videotrack);
    audio.srcObject = mediastream;  // audio is html audio element
  }).catch((err) => {
    console.log("get audio track error:", err);
  })
  ```

#### 获取屏幕共享
  ``` javascript
  var devicemanager = new BrowserDeviceManager();

  devicemanager.getScreenTrack().then((mediastream) => {
    video.srcObject = mediastream;  // video is html video element
  }).catch((err) => {
    console.log("get screen track error:", err);
  })
  ```