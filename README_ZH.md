## 浏览器设备管理
  这是一个用于浏览器的设备管理工具，支持获取麦克风、摄像头和屏幕共享画面。包括一些外接设备
  pc端支持windows、macos、linux、electron下的浏览器
  移动端支持android、ios端的浏览器
  

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
  
  pc端
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

  移动端
  ``` javascript
  var devicemanager = new BrowserDeviceManager();
  // user is front, environment is back camera
  devicemanager.getVideoTrack({facingMode: "user" }).then((videotrack) => {
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