## Browser Device Manager

This is a device management tool for browsers, which supports the acquisition of microphone, camera and screen shared images. Including some external equipment

The PC supports the browser under windows, MacOS, Linux and electron

The mobile terminal supports Android and IOS browser


[device manager demo](https://fjqgx.github.io/devicemanager/demo/) 

### Install
  html
  ``` html
    <script src="./browserdevicemanager.js" ></script>
  ```

  npm
  ``` javascript
    npm i browserdevicemanager
  ```

### Usage

#### get camera list
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

#### get mic list
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

#### get camera
   
  pc
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

  mobile
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

#### get mic
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

#### get screen
  ``` javascript
  var devicemanager = new BrowserDeviceManager();

  devicemanager.getScreenTrack().then((mediastream) => {
    video.srcObject = mediastream;  // video is html video element
  }).catch((err) => {
    console.log("get screen track error:", err);
  })
  ```
