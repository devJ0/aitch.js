// made by devJo (4onefour@naver.com)

window._aitchs = {}; // 생성된 단축키들을 담아둘 객체
window._aitchProperties = {
    isInfoLog: true, // 단축키 생성 시, 정보메시지 출력유무 설정
    isErrLog: true, // 단축키 생성 시, 에러메시지 출력유무 설정
    isWarnLog: true, // 단축키 생성 시, 경고메시지 출력유무 설정
    isKeyUpDownLog: false, // 키가 눌리고 떼어지는 시점에 관련메시지 출력유무 설정
    autoKeyRefresh: false, // 자동으로 키에 대한 새로고침 여부 설정
    refreshTick: 1000, // 키에 대한 새로고침 간격 설정 (ms단위)
}

class aitch {
    constructor(options) {
        this.name = _aitchIsEmptyCheck("단축키명", options.name);
        if(this.name == false) {
            _aitchProperties.isErrLog && console.error("단축키 생성에 실패하였습니다.");
            return false;
        }
        this.description = _aitchIsEmptyCheck("설명", options.description);
        this.keys = _aitchIsEmptyCheck("조합키", options.keys);
        if(this.keys == false) {
            _aitchProperties.isErrLog && console.error("단축키 생성에 실패하였습니다.");
            return false;
        }
        this.func = _aitchIsEmptyCheck("호출할 함수", options.func);
        if(this.func == false) {
            _aitchProperties.isErrLog && console.error("단축키 생성에 실패하였습니다.");
            return false;
        }

        window._aitchs[Object.keys(window._aitchs).length] = {
            "단축키명" : this.name,
            "키설명" : this.description,
            "조합키" : this.keys,
            "호출함수" : this.func,
        };

        _aitchProperties.isInfoLog && console.info(`ℹ️ 새로운 단축키 '${this.name}'이(가) 생성되었습니다!`);
    }
    deleteAitch() {
        this.name = null;
        this.description = null;
        this.keys = null;
        this.func = null;
    }
}

function _aitchIsEmptyCheck(name, value) {

    for(let i = 0 ; i < Object.keys(_aitchs).length ; i++) { // 이미 생성된 단축키에 대한 중복체크 로직 (대상은 이름, 조합키이다.)
        if(name == "단축키명" && value == _aitchs[i].단축키명) {
            console.error(`${value}라는 단축키명은 이미 존재합니다. 중복되지 않도록 재생성 해주시기 바랍니다.`);
            return false;
        }

        if(name == "조합키") {
            if (value.length !== _aitchs[i].조합키.length) {
                return false;
            } else {
                value.sort();
                _aitchs[i].조합키.sort();

                for (let j = 0; j < value.length; j++) {
                    if (value[j] !== _aitchs[j].조합키[j]) {
                        return true;
                    } else {
                        console.error(`입력한 조합키는 이미 존재합니다. 중복되지 않도록 재생성 해주시기 바랍니다.`);
                        return false;
                    }
                }
            }
        }
    }

    if((value == "" || value == undefined || value == null) || (name == "호출할 함수" && typeof value != "function") || (name == "조합키" && typeof value != "object")) {
        switch(name) {
            case "단축키명" : 
                _aitchProperties.isErrLog && console.error(`${name}이 입력되지 않았습니다!\n${name}은 필수로 입력해야 합니다.`);
                return false;
            case "설명" : 
                _aitchProperties.isWarnLog && console.warn(`${name}이 입력되지 않았습니다!\n${name}은 선택사항이나 가급적 입력을 권장합니다.`);
                break;
            case "조합키" : 
                _aitchProperties.isErrLog && console.error(`${name}가 입력되지 않았거나 arrayString 타입이 아닙니다.\n*올바른 예시 → ["control", "c"]`);
                return false;
            case "호출할 함수" : 
                _aitchProperties.isErrLog && console.error(`${name}가 입력되지 않았거나 호출할 함수의 타입이 function이 아닙니다!\n${name}는 필수로 입력해야 하며 function 타입이어야 합니다.`);
                return false;
        }
        return value;
    } else {
        return value;
    }
}

let _aitchHandler = {
    set: function(target, property, value) {
        _aitchProperties.isKeyUpDownLog && console.log(`${property} => ${value}`);
        target[property] = value;

        let pressedKey = [];
        for(let key in target) {
            if(target[key]) {
                pressedKey.push(key);
            }
        }
        pressedKey.sort();
        for(let i = 0 ; i < Object.keys(window._aitchs).length; i++) {
            if (pressedKey.length !== _aitchs[i].조합키.length) {
                return false;
            } else {
                pressedKey.sort();
                _aitchs[i].조합키.sort();

                if (JSON.stringify(pressedKey) !== JSON.stringify(_aitchs[i].조합키)) {
                    return true;
                } else {
                    _aitchs[i].호출함수();
                    return true;
                }
            }
        }
        return true;
    }
};

let _aitchIsPress = new Proxy({}, _aitchHandler);
let _aitchRefreshTimer;
function _aitchKeyRefresh() {
    for (let key in _aitchIsPress) {
        _aitchIsPress[key] = false;
    };
    _aitchProperties.isInfoLog && console.info("ℹ️ 단축키 상태초기화 완료!");
};
// CapsLock이 켜져 있어도 무조건 소문자로 인식하며, 눌리고 떼지는 시점을 캐치하는 로직
document.addEventListener("keydown", function(event) {
    _aitchIsPress[event.key.toLowerCase()] = true;

    // 자동으로 키에 대한 새로고침 처리해주는 로직
    if(_aitchProperties.autoKeyRefresh) {
        clearTimeout(_aitchRefreshTimer);
        _aitchRefreshTimer = setTimeout(function() {
            _aitchKeyRefresh();
        }, _aitchProperties.refreshTick);
    }
});
document.addEventListener("keyup", function(event) {
    _aitchIsPress[event.key.toLowerCase()] = false;
});