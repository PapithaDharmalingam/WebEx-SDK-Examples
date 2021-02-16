import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InitialSetupService } from '../initialSetup.service';

@Component({
  selector: 'app-single-party-call',
  templateUrl: './single-party-call.component.html',
  styleUrls: ['./single-party-call.component.sass'],
})
export class SinglePartyCallComponent implements OnInit {
  @ViewChild('selfView', { static: true }) selfView: ElementRef;
  @ViewChild('remoteViewAudio', { static: true }) remoteViewAudio: ElementRef;
  @ViewChild('remoteViewVideo', { static: true }) remoteViewVideo: ElementRef;
  @ViewChild('f', { static: true }) inviteeForm:NgForm;
  meeting;
  cancel:boolean = false;
  spinnerVisible= false;
  constructor(private initialSetup: InitialSetupService) {}

  ngOnInit(): void {
    this.initialSetup.createInstance();
    this.onRegister()
  }

  onSubmit(form: NgForm) {
    const destination: string = form.value.invitee;
    this.spinnerVisible = true;
    this.initialSetup.webex.meetings
      .create(destination)
      .then((meeting) => {
        // Call our helper function for binding events to meetings
        // console.log(meeting);
        this.bindMeetingEvents(meeting);
        this.meeting = meeting;
        return this.joinMeeting(meeting);
      })
      .catch((error) => {
        // Report the error
        alert("Error in joining the meeting");
        console.error(error);
      });
  }
  onRegister() {
    return this.initialSetup.webex.meetings.register().catch((err) => {
      console.error(err);
      alert(err);
      throw err;
    });
  }

  bindMeetingEvents(meeting) {
    meeting.on('error', (err) => {
      console.error(err);
    });

    // Handle media streams changes to ready state
    meeting.on('media:ready', (media) => {
      this.spinnerVisible = false;
      this.cancel=true;
      if (!media) {
        return;
      }
      if (media.type === 'local') {
        this.selfView.nativeElement.srcObject = media.stream;
      }
      if (media.type === 'remoteVideo') {
        this.remoteViewVideo.nativeElement.srcObject = media.stream;
      }
      if (media.type === 'remoteAudio') {
        this.remoteViewAudio.nativeElement.srcObject = media.stream;
      }
    });

    // Handle media streams stopping
    meeting.on('media:stopped', (media) => {
      // Remove media streams
      if (media.type === 'local') {
        this.selfView.nativeElement.srcObject = null;
      }
      if (media.type === 'remoteVideo') {
        this.remoteViewVideo.nativeElement.srcObject = null;
      }
      if (media.type === 'remoteAudio') {
        this.remoteViewAudio.nativeElement.srcObject = null;
      }
    });

    // Of course, we'd also like to be able to leave the meeting:
  }
  onHangup() {
    console.log('left meeting');
    this.meeting.leave();
    this.cancel=false;
    this.inviteeForm.reset();
  }
  joinMeeting(meeting) {
    return meeting.join().then(() => {
      const mediaSettings = {
        receiveVideo: true,
        receiveAudio: true,
        receiveShare: false,
        sendVideo: true,
        sendAudio: true,
        sendShare: false,
      };

      // Get our local media stream and add it to the meeting
      return meeting.getMediaStreams(mediaSettings).then((mediaStreams) => {
        const [localStream, localShare] = mediaStreams;

        meeting.addMedia({
          localShare,
          localStream,
          mediaSettings,
        });
      });
    });
  }
}
