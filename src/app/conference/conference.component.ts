import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { WebcamInitError } from 'ngx-webcam';

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.css']
})
export class ConferenceComponent implements OnInit {
  @ViewChild('remoteScreen', { static: true }) remoteScreen: ElementRef;
  @ViewChild('localVideo', { static: true }) localVideo: ElementRef;
  @ViewChild('remoteVideo', { static: true }) remoteVideo: ElementRef;
  public error: String;

  public micOn = false;

  public speakerOn = false;

  public screenShare: boolean = false;
  public mediaStream = null;

  public showWebcam: boolean = false;
  public localVideoStream = null;
  public mirrorWebcam = false;
  public localVideoFilter = 'none';

  public remoteVideoStream = null;

  public webcamResolution = 2;
  public webcamResolutions = [
    {
      name: 'QVGA (160*120)',
      video: { width: 160, height: 120 }
    },
    {
      name: 'HVGA (320*240)',
      video: { width: 320, height: 240 }
    },
    {
      name: 'VGA (640*480)',
      video: { width: 640, height: 480 }
    },
    {
      name: 'XVGA (1024*768)',
      video: { width: 1024, height: 768 }
    },
    {
      name: 'HD (1280*720)',
      video: { width: 1280, height: 720 }
    },
    {
      name: 'fullHD (1920*1080)',
      video: { width: 1920, height: 1080 }
    },
    {
      name: '4K (4096*2160)',
      video: { width: 4096, height: 2160 }
    },
    {
      name: '8K (7680*4320)',
      video: { width: 7680, height: 4320 }
    }
  ];

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  public handleInitError(error: WebcamInitError): void {
    if (error.mediaStreamError && error.mediaStreamError.name === "NotAllowedError") {
      this.error = "Kamera ist nicht erlaubt worden!";
      this.showWebcam = false;
    }
  }

  public toggleMirror(): void {
    this.mirrorWebcam = !this.mirrorWebcam;
  }

  public webcamOff(ev) {
    console.dir(ev);
    this.localVideoStream = null;
    this.showWebcam = false;

    // DEMO: gebe locales Video auch als Remote Video aus
    this.remoteVideoStream = null;
  }

  public webcamOn() {
    // @ts-ignore
    navigator.mediaDevices.getUserMedia({ video: this.webcamResolutions[this.webcamResolution].video })
      .then(this.handleWebcam.bind(this), this.handleError);
  }

  public handleWebcam(stream) {
    let obj = this;
    this.showWebcam = true;
    this.localVideoStream = stream;
    this.localVideoStream.oninactive = function (ev) { obj.webcamOff(ev) };
    console.dir(this.localVideoStream);
    this.renderer.setProperty(this.localVideo.nativeElement, 'srcObject', stream);

    // DEMO: gebe locales Video auch als Remote Video aus
    // Hack: Bei Firefox hat die Funktion captureStream den Namen mozCaptureStream
    if (this.localVideo.nativeElement.mozCaptureStream) {
      this.remoteVideoStream = this.localVideo.nativeElement.mozCaptureStream();
    } else {
      this.remoteVideoStream = this.localVideo.nativeElement.captureStream();
    }
    this.renderer.setProperty(this.remoteVideo.nativeElement, 'srcObject', this.remoteVideoStream);
  }

  public handleShareScreen(stream) {
    let obj = this;
    this.screenShare = true;
    this.mediaStream = stream;
    this.mediaStream.oninactive = function (ev) { obj.screenShareOff(ev) };
    console.dir(this.mediaStream);
    this.renderer.setProperty(this.remoteScreen.nativeElement, 'srcObject', stream);

  }

  public handleError(error) {
    console.log('Error: ', error);
  }

  public screenShareOff(ev) {
    this.mediaStream = null;
    this.screenShare = false;
    console.dir(ev);
  }

  public screenShareOn() {
    // @ts-ignore
    navigator.mediaDevices.getDisplayMedia({ video: this.webcamResolutions[this.webcamResolution].video })
      .then(this.handleShareScreen.bind(this), this.handleError);
  }

  public toggleMic(): void {
    this.micOn = !this.micOn;
  }

  public toggleSpeaker(): void {
    this.speakerOn = !this.speakerOn;
  }

  public toggleWebcam(): void {
    let elem = this.localVideo.nativeElement.srcObject;
    if (elem) {
      let tracks = elem.getTracks();
      tracks.forEach(track => track.stop());
      this.renderer.setProperty(this.localVideo.nativeElement, 'srcObject', null);

      // DEMO: gebe locales Video auch als Remote Video aus
      this.renderer.setProperty(this.remoteVideo.nativeElement, 'srcObject', null);
    }

    if (!this.showWebcam) {
      this.webcamOn();
    } else {
      this.webcamOff(null);
    }
  }

  public toggleScreenShare() {
    let elem = this.remoteScreen.nativeElement.srcObject;
    if (elem) {
      let tracks = elem.getTracks();
      tracks.forEach(track => track.stop());
      this.renderer.removeAttribute(this.remoteScreen.nativeElement, null);
    }

    if (!this.screenShare) {
      this.screenShareOn();
    } else {
      this.screenShareOff(null);
    }
  }
}
