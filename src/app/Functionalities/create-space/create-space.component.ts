import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { InitialSetupService } from '../initialSetup.service';

@Component({
  selector: 'app-create-space',
  templateUrl: './create-space.component.html',
  styleUrls: ['./create-space.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSpaceComponent implements OnInit {
  spaceName: string;
  spaceCreation: FormGroup;
  roomId: string;
  constructor(private initialSetup: InitialSetupService) {}

  ngOnInit(): void {
    this.initialSetup.createInstance();

    this.spaceCreation = new FormGroup({
      roomName: new FormControl('', Validators.required),
      addMembers: new FormControl('no', Validators.required),
      sendMessage: new FormControl(null),
      memberMailID: new FormArray([]),
    });
    this.onAddMember();
  }

  get controls() {
    return (this.spaceCreation.get('memberMailID') as FormArray).controls;
  }
  onAddMember() {
    const control = new FormControl(null);
    (this.spaceCreation.get('memberMailID') as FormArray).push(control);
  }
  onDeleteMember(index: number) {
    (this.spaceCreation.get('memberMailID') as FormArray).removeAt(index);
  }
  onSubmit() {
    console.log(this.spaceCreation.value);
    const spaceName = this.spaceCreation.value.roomName;
    const memberMailID = this.spaceCreation.value.memberMailID;
    const sendMessage = this.spaceCreation.value.sendMessage;

    this.oncreateRoom(spaceName)
      .then((room) => {
        this.roomId = room.id;
        console.log(this.roomId);
        if (this.spaceCreation.value.addMembers == 'yes') {
          this.onAddUser(memberMailID);
        }
        if (sendMessage != null) {
          this.onSendMessage(sendMessage);
        }
        alert("Space Successfully Created");
        this.spaceCreation.reset();
      })
      .catch((error) => {
        alert("Error Space Is not created");

      });

  }

  oncreateRoom(spaceName: string) {
    return this.initialSetup.webex.rooms.create({
      title: spaceName,
    });
  }
  onAddUser(memberMailID: []) {
    memberMailID.forEach((element) => {
      if (element != null) {
        this.initialSetup.webex.memberships.create({
          roomId: this.roomId,
          personEmail: element,
        });
      }
    });
  }

  onSendMessage(message: string) {
    this.initialSetup.webex.messages.create({
      text: message,
      roomId: this.roomId,
    });
  }
}
