function showError(inputId, msgId, message) {
    const input = document.getElementById(inputId);
    const msg = document.getElementById(msgId);

    if (!input || !msg) return;

    input.classList.add('is-invalid');
    msg.textContent = message;
    msg.classList.remove('d-none');
}

function clearError(inputId, msgId) {
    const input = document.getElementById(inputId);
    const msg = document.getElementById(msgId);

    if (!input || !msg) return;

    input.classList.remove('is-invalid');
    msg.textContent = '';
    msg.classList.add('d-none');
}

function validateAndLogin() {
    let valid = true;

    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // 아이디 검사
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;

    if (!usernameRegex.test(username)) {
        showError(
            'usernameInput',
            'usernameMsg',
            '아이디는 4~20자 영문/숫자만 가능합니다.'
        );
        valid = false;
    } else {
        clearError('usernameInput', 'usernameMsg');
    }

    // 비밀번호 검사
    const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
        showError(
            'passwordInput',
            'passwordMsg',
            '패스워드는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.'
        );
        valid = false;
    } else {
        clearError('passwordInput', 'passwordMsg');
    }

    // 통과 시 로그인
    if (valid) {
        submitLogin();
    }
}

async function submitLogin() {
    const password = document.getElementById('passwordInput').value;
    const hashed = await hashPassword(password);

    document.getElementById('password').value = hashed;
    document.getElementById('loginForm').submit();
}

window.addEventListener('load', function() {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');

    if (error === 'username_empty') {
        showError('usernameInput', 'usernameMsg', '아이디를 입력해주세요.');
    }

    else if (error === 'password_empty') {
        showError('passwordInput', 'passwordMsg', '패스워드를 입력해주세요.');
    }

    else if (error === 'not_found' || error === 'password_wrong' || error === '1') {
        showError('passwordInput', 'passwordMsg', '아이디 또는 패스워드가 올바르지 않습니다.');
    }

    else if (error === 'session_empty') {
        showError('passwordInput', 'passwordMsg', '로그인이 필요한 페이지입니다.');
    }
});