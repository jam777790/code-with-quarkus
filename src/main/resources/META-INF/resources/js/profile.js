window.onload = function() {
    fetch('/profile/info')
        .then(res => {
            if (!res.ok) {
                throw new Error('프로필 정보를 불러오지 못했습니다.');
            }
            return res.json();
        })
        .then(data => {
            const infoUsername = document.getElementById('infoUsername');
            const infoEmail = document.getElementById('infoEmail');
            const infoPhone = document.getElementById('infoPhone');
            const profileImg = document.getElementById('profileImg');

            if (infoUsername) infoUsername.textContent = data.username;
            if (infoEmail) infoEmail.textContent = data.email;
            if (infoPhone) infoPhone.textContent = data.phone;

            if (profileImg) {
                if (data.profileImage && data.profileImage !== '') {
                    profileImg.src = '/uploads/profile/' + data.profileImage;
                } else {
                    profileImg.src = '/uploads/profile/default.png';
                }
            }

            const updateEmail = document.getElementById('updateEmail');
            const updatePhone = document.getElementById('updatePhone');

            if (updateEmail) updateEmail.value = data.email;
            if (updatePhone) updatePhone.value = data.phone;

            const profileLink = document.getElementById('profileNavLink');
            if (profileLink) {
                profileLink.setAttribute('data-bs-title', '👋 ' + data.username);
                new bootstrap.Tooltip(profileLink);
            }
        })
        .catch(err => {
            console.error(err);
        });

    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    const success = params.get('success');

    const updateMsg = document.getElementById('updateMsg');

    if (updateMsg) {
        if (success === 'updated') {
            updateMsg.className = 'alert alert-success';
            updateMsg.textContent = '✅ 개인정보가 수정되었습니다.';
        } else if (error === 'duplicate_email') {
            updateMsg.className = 'alert alert-danger';
            updateMsg.textContent = '⚠️ 이미 사용 중인 이메일입니다.';
        }
    }

    if (success === 'password_changed') {
        showToast('비밀번호가 변경되었습니다. 다시 로그인해주세요.', 'success');

        setTimeout(function() {
            location.href = '/logout';
        }, 1500);
    }

    if (error === 'wrong_password') {
        showToast('현재 비밀번호가 일치하지 않습니다.', 'danger');

        const pwMsg = document.getElementById('pwMsg');
        if (pwMsg) {
            pwMsg.className = 'alert alert-danger';
            pwMsg.textContent = '⚠️ 현재 비밀번호가 일치하지 않습니다.';
        }
    }

    const uploadErrorMsg = document.getElementById('uploadErrorMsg');

    if (uploadErrorMsg) {
        const messages = {
            invalid_type: 'jpg, png, gif, webp 파일만 가능합니다.',
            too_large: '파일 크기는 5MB 이하여야 합니다.',
            upload_fail: '업로드 실패. 다시 시도해주세요.',
            no_file: '업로드할 파일을 선택해주세요.'
        };

        if (messages[error]) {
            uploadErrorMsg.textContent = messages[error];
            uploadErrorMsg.classList.remove('d-none');
        }
    }
};

function validateAndUpdate() {
    let valid = true;

    const email = document.getElementById('updateEmail').value.trim();
    const phone = document.getElementById('updatePhone').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^010-\d{4}-\d{4}$/;

    if (!emailRegex.test(email)) {
        showFieldError(
            'updateEmail',
            'updateEmailMsg',
            '올바른 이메일 형식이 아닙니다.'
        );
        valid = false;
    } else {
        clearFieldError('updateEmail');
    }

    if (!phoneRegex.test(phone)) {
        showFieldError(
            'updatePhone',
            'updatePhoneMsg',
            '010-0000-0000 형식으로 입력해주세요.'
        );
        valid = false;
    } else {
        clearFieldError('updatePhone');
    }

    if (valid) {
        document.getElementById('updateForm').submit();
    }
}

async function validateAndChangePassword() {
    let valid = true;

    const currentPw = document.getElementById('currentPwInput').value;
    const newPw = document.getElementById('newPwInput').value;
    const newPwConfirm = document.getElementById('newPwConfirm').value;

    if (!currentPw) {
        showFieldError(
            'currentPwInput',
            'currentPwMsg',
            '현재 비밀번호를 입력해주세요.'
        );
        valid = false;
    } else {
        clearFieldError('currentPwInput');
    }

    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (!pwRegex.test(newPw)) {
        showFieldError(
            'newPwInput',
            'newPwMsg',
            '8자 이상, 영문+숫자+특수문자를 포함해야 합니다.'
        );
        valid = false;
    } else {
        clearFieldError('newPwInput');
    }

    if (newPw !== newPwConfirm) {
        showFieldError(
            'newPwConfirm',
            'newPwConfirmMsg',
            '새 비밀번호가 일치하지 않습니다.'
        );
        valid = false;
    } else {
        clearFieldError('newPwConfirm');
    }

    if (!valid) return;

    const hashedCurrent = await hashPassword(currentPw);
    const hashedNew = await hashPassword(newPw);

    document.getElementById('currentPassword').value = hashedCurrent;
    document.getElementById('newPassword').value = hashedNew;

    document.getElementById('pwForm').submit();
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

function showFieldError(fieldId, msgId, message) {
    const field = document.getElementById(fieldId);
    const msg = document.getElementById(msgId);

    if (!field) return;

    field.classList.remove('is-valid');
    field.classList.add('is-invalid');

    if (msg) msg.textContent = message;
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);

    if (!field) return;

    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
}