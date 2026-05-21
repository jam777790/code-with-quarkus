function validateAndLogin() {
let valid = true;
const username = document.getElementById('usernameInput').value.trim();
const password = document.getElementById('passwordInput').value;
// ① 아이디 유효성 검사
// 조건 : 4~20자 영문/숫자만 허용
// 정규식 : /^[a-zA-Z0-9]{4,20}$/
// 실패 시 : showError('usernameInput', 'usernameMsg', '오류 메시지')
// 성공 시 : clearError('usernameInput')
/* 여기에 코드를 작성하시오 */
// ② 패스워드 유효성 검사
// 조건 : 8자 이상, 영문 + 숫자 + 특수문자(!@#$%^&*) 포함
// 정규식 : /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/
// 실패 시 : showError('passwordInput', 'passwordMsg', '오류 메시지')
// 성공 시 : clearError('passwordInput')
/* 여기에 코드를 작성하시오 */
// ③ 두 항목 모두 통과 시 로그인 실행
if (valid) submitLogin();
}

function validateAndLogin() {
submitLogin(); // 유효성 검사(지난 주 문제)
}
async function submitLogin() {
const password = document.getElementById('passwordInput').value;
const hashed = await hashPassword(password);
document.getElementById('password').value = hashed;
document.getElementById('loginForm').submit();
}