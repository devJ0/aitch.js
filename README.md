# 사용에 대한 예시
1. 테스트 작업 중, 특정 함수를 특정 시점에 호출이 필요할 때<br>
    `(ex. 컴포넌트를 생성하고 데이터를 호출한 뒤에 재호출을 하거나 새로고침 동작 등)`
2. 반복 작업 중, 특정 함수를 반복적으로 호출이 필요할 때<br>
    `(ex. 페이지별 데이터를 json으로 가져와서 클립보드에 복사하기)`
3. 단축키로 다른 페이지로 이동하고자 할 때
4. 단축키로 UI상 모달창과 같은 무언가를 띄울 때

# aitch.js 특징
- 10KB 미만의 가벼운 용량
- Javascript 기초 지식이 있으면 누구나 쉽게 이해하고 사용가능
- 사용중 문제가 생겼을 경우, 문제를 확인하여 개선 라이브러리 릴리즈
- 단축키 생성 실패한 경우, 어떠한 문제로 인하여 생성이 안 됐는지 로그를 통해 안내
- 옵션을 설정하여 범용성 넓게 사용이 가능

# aitch.js 간단 사용설명서
1. aitch.js 파일을 다운로드 합니다.
2. 사용하고자 할 페이지(.html / .jsp / .asp / .php 등) &lt;head&gt; 태그 내에 해당 라이브러리를 호출합니다.<br>
    ```html
    ‥‥ 생략 ‥‥
    <head>
        <script src="./js/aitch.js"></script>
    </head>
    ‥‥ 생략 ‥‥
    ```
3.  해당 라이브러리에 대한 속성을 설정합니다.<br>
    `window._aitchProperties` 라는 전역변수에 값을 Object 형태로 설정합니다.<br>
    속성은 추후에 버전이 업그레이드되면 점차 늘어날 것입니다.
    ```javascript
    window._aitchProperties = {
        isInfoLog: true, // 단축키 생성 시, 정보메시지 출력유무 설정
        isErrLog: true, // 단축키 생성 시, 에러메시지 출력유무 설정
        isWarnLog: true, // 단축키 생성 시, 경고메시지 출력유무 설정
        isKeyUpDownLog: false, // 키가 눌리고 떼어지는 시점에 관련메시지 출력유무 설정
        autoKeyRefresh: false, // 자동으로 키에 대한 새로고침 여부 설정
        refreshTick: 1000, // 키에 대한 새로고침 간격 설정 (ms단위)
    }
    ```
4. 이후에 단축키를 생성합니다. 생성 양식은 아래와 같습니다.<br>
    ```javascript
    // 단축키 생성
    const myShortcut = new aitch({
        name: "MyShortcut",
        description: "This is my custom shortcut",
        keys: ["shift", "m"], // 조합키에 대해서는 소문자로 입력해야 합니다.
        func: () => {console.log('success!')}
    });
    ```
5. 브라우저에서 `shift` + `m` 키를 입력하면 함수가 호출됩니다!<br>
    ```html
    <!-- 아래 코드는 위 내용들에 대한 결과입니다. -->
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>aitch.js</title>
        <script src="aitch.js"></script>
    </head>
    <body>
        <script>
            // 단축키 생성
            const myShortcut = new aitch({
                name: "MyShortcut",
                description: "This is my custom shortcut",
                keys: ["shift", "m"],
                func: () => {console.log('success!')}
            });
        </script>
    </body>
    </html>
    ```