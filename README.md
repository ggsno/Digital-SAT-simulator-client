# Digital-SAT-simulator-client
온라인 SAT 시험 시뮬레이터 및 시험 관리 웹 사이트

## 설치 및 개발 모드 실행
```bash
yarn
yarn dev
```
mock 회원 정보
- 선생님 아이디/비밀번호 admin/admin
- 학생 아이디/비밀번호 qq/qq

## 개요
- SAT 학원 학생들이 온라인 SAT 시험에 적응 할 수 있도록 실제 온라인 SAT 시험을 보는 프로그램 Blue book을 참고해 실전과 비슷한 경험 전달을 목표로 함

## 주안점

### 실사용자의 요구에 부합하는 UI/UX 구성
- 로그인 후 두 가지 분기(학생, 선생님)로 화면으로 앱 구성
  - 학생은 실제 시험과 비슷하게 구성 (bookmark, navigator, annotate 기능 등 데모 영상 시험 시뮬레이터 참고)
  - 시험을 관리하는 선생님은 최대한 직관적으로 구성

### 다양한 OS에서 안정적으로 작동하도록 구현
- IOS(아이패드), MacOS, Windows 환경에서 핵심 기능 테스트 완료

## 데모 영상

### 시험 시뮬레이터
https://github.com/ggsno/Digital-SAT-simulator-client/assets/46833758/c258408c-82e4-4142-96c6-77f35d905712

### 시험 결과
https://github.com/ggsno/Digital-SAT-simulator-client/assets/46833758/5c951f95-bdbd-4dff-97ca-a222dd9b6118

### 시험 관리
https://github.com/ggsno/Digital-SAT-simulator-client/assets/46833758/2ec7335f-cc07-493a-97c5-fa8094429387

