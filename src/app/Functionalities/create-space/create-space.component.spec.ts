import { CreateSpaceComponent } from './create-space.component';

describe('CreateSpaceComponent', () => {
  let fixture: CreateSpaceComponent;
  let initialSetupMock;
  window.alert = jest.fn();
  beforeEach(() => {
    initialSetupMock = {
      createInstance: jest.fn(),
    };
    fixture = new CreateSpaceComponent(initialSetupMock);
  });

  it('should call initialSetup.createInstance ', () => {
    fixture.ngOnInit();
    expect(initialSetupMock.createInstance).toBeCalledTimes(1);
  });
  it('should create the form with default values', () => {
    fixture.ngOnInit();
    const spaceCreation = {
      roomName: '',
      addMembers: 'no',
      sendMessage: null,
      memberMailID: [null],
    };
    expect(fixture.spaceCreation.value).toEqual(spaceCreation);
  });
  it('should call onAddMember', () => {
    const onAddMemberSpy = jest.spyOn(fixture, 'onAddMember');
    fixture.ngOnInit();
    expect(onAddMemberSpy).toBeCalledTimes(1);
  });
  it('should call oncreateRoom and set the roomID', (done) => {
    fixture.ngOnInit();
    fixture.spaceCreation.setValue({
      roomName: 'testRoom',
      addMembers: 'no',
      sendMessage: null,
      memberMailID: [null],
    });
    const room = {
      id: 'testRoomId',
    };
    const oncreateRoomSpy = jest
      .spyOn(fixture, 'oncreateRoom')
      .mockResolvedValue(room);
    fixture.roomId = undefined;
    fixture.onSubmit();
    expect(oncreateRoomSpy).toBeCalledWith('testRoom');
    process.nextTick(() => {
      expect(fixture.roomId).toEqual('testRoomId');
      done();
    });
  });
  it('should not set roomID when oncreateRoom throws an error', (done) => {
    fixture.ngOnInit();
    fixture.spaceCreation.setValue({
      roomName: '',
      addMembers: 'no',
      sendMessage: null,
      memberMailID: [null],
    });

    const oncreateRoomSpy = jest
      .spyOn(fixture, 'oncreateRoom')
      .mockRejectedValue(null);
    fixture.roomId = undefined;
    fixture.onSubmit();
    expect(oncreateRoomSpy).toBeCalledWith('');
    process.nextTick(() => {
      expect(fixture.roomId).toBeUndefined();
      done();
    });
  });
  it('should call onSendMessage when sendMessage != null', (done) => {
    fixture.ngOnInit();
    fixture.spaceCreation.setValue({
      roomName: 'testRoom',
      addMembers: 'no',
      sendMessage: 'hello',
      memberMailID: [null],
    });
    const room = {
      id: 'testRoomId',
    };
    jest.spyOn(fixture, 'oncreateRoom').mockResolvedValue(room);
    const onSendMessageSpy = jest.spyOn(fixture, 'onSendMessage');
    fixture.onSubmit();
    process.nextTick(() => {
      expect(onSendMessageSpy).toBeCalledWith('hello');
      done();
    });
  });
  it('should not call onSendMessage when sendMessage is null', (done) => {
    fixture.ngOnInit();
    fixture.spaceCreation.setValue({
      roomName: 'testRoom',
      addMembers: 'no',
      sendMessage: null,
      memberMailID: [null],
    });
    const room = {
      id: 'testRoomId',
    };
    jest.spyOn(fixture, 'oncreateRoom').mockResolvedValue(room);
    const onSendMessageSpy = jest.spyOn(fixture, 'onSendMessage');
    fixture.onSubmit();
    process.nextTick(() => {
      expect(onSendMessageSpy).not.toBeCalled();
      done();
    });
  });
  it('should not call onAddUser when addMembers is no', (done) => {
    fixture.ngOnInit();
    fixture.spaceCreation.setValue({
      roomName: 'testRoom',
      addMembers: 'no',
      sendMessage: null,
      memberMailID: [null],
    });
    const room = {
      id: 'testRoomId',
    };
    jest.spyOn(fixture, 'oncreateRoom').mockResolvedValue(room);
    const onAddUserSpy = jest.spyOn(fixture, 'onAddUser');
    fixture.onSubmit();
    process.nextTick(() => {
      expect(onAddUserSpy).not.toBeCalled();
      done();
    });
  });
  it('should call onAddUser when addMembers is yes', (done) => {
    fixture.ngOnInit();
    fixture.spaceCreation.setValue({
      roomName: 'testRoom',
      addMembers: 'yes',
      sendMessage: null,
      memberMailID: ['example@mail.com'],
    });
    const room = {
      id: 'testRoomId',
    };
    jest.spyOn(fixture, 'oncreateRoom').mockResolvedValue(room);
    const onAddUserSpy = jest.spyOn(fixture, 'onAddUser');
    fixture.onSubmit();
    process.nextTick(() => {
      expect(onAddUserSpy).toBeCalledWith(['example@mail.com']);
      done();
    });
  });


});
