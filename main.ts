// 4. 무선 데이터 수신 시 실행
radio.onReceivedString(function (receivedString) {
    let command = receivedString.trim();
// [명령어 1] PUMP_ON: 전진 -> 턱 넘기 -> 급수 -> 후진 복귀
    // [명령어 2] ALARM: 모든 동작 정지 및 비상 경보
    if (command == "PUMP_ON") {
        basic.showIcon(IconNames.Square)
        // 단계 1: 화분을 향해 전진 (큐브 1, 2번 바퀴)
        gcube.setAGcubeSpeed(1, 50)
        gcube.setAGcubeSpeed(2, -50)
        basic.pause(1500)
        // 단계 2: 턱 넘기 동작 (큐브 3, 4번 팔 90도 회전)
        gcube.stopAllGcubeMotor()
        gcube.setAGcubeServoAngle(3, 90)
        gcube.setAGcubeServoAngle(4, 90)
        basic.pause(1000)
        // 단계 3: 턱 넘어간 후 팔 원위치
        gcube.setAGcubeSpeed(1, 40)
        gcube.setAGcubeSpeed(2, -40)
        basic.pause(1000)
        gcube.setAGcubeServoAngle(3, 0)
        gcube.setAGcubeServoAngle(4, 0)
        gcube.stopAllGcubeMotor()
        // 단계 4: 워터 펌프 가동 (P8 핀)
        basic.showIcon(IconNames.Umbrella)
        pins.digitalWritePin(DigitalPin.P8, 1)
        music.playTone(523, music.beat(BeatFraction.Half))
        basic.pause(3000)
        pins.digitalWritePin(DigitalPin.P8, 0)
        // 단계 5: 원래 위치로 후진 복귀
        gcube.setAGcubeSpeed(1, -50)
        gcube.setAGcubeSpeed(2, 50)
        basic.pause(2500)
        gcube.stopAllGcubeMotor()
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        basic.clearScreen()
    } else if (command == "ALARM") {
        gcube.stopAllGcubeMotor()
        for (let index = 0; index < 3; index++) {
            basic.showIcon(IconNames.No)
            music.playTone(784, music.beat(BeatFraction.Quarter))
            basic.pause(150)
            basic.showIcon(IconNames.Angry)
            music.playTone(523, music.beat(BeatFraction.Quarter))
            basic.pause(150)
        }
        basic.clearScreen()
    }
})
// 1. 라디오 무선 그룹 설정 (1번 채널)
radio.setGroup(1)
// 2. 마이크로비트와 G큐브 간 무선 페어링 대기 (2초)
basic.pause(2000)
// 3. 초기 큐브 팔 각도 세팅 (0도로 초기화)
gcube.setAGcubeServoAngle(3, 0)
gcube.setAGcubeServoAngle(4, 0)
basic.showIcon(IconNames.Yes)
basic.pause(1000)
basic.clearScreen()
// 5. 스탠바이 대기 상태 점멸 표시
basic.forever(function () {
    led.plot(2, 2)
    basic.pause(500)
    led.unplot(2, 2)
    basic.pause(500)
})
