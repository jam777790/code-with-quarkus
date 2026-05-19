function validateAndShowModal() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const passwordCheck = document.getElementById("passwordCheck").value;
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!username || !password || !passwordCheck || !email || !phone) {
        alert("모든 항목을 입력해주세요.");
        return;
    }

    if (password !== passwordCheck) {
        alert("패스워드가 일치하지 않습니다.");
        return;
    }

    document.getElementById("confirmUsername").innerText = username;
    document.getElementById("confirmEmail").innerText = email;
    document.getElementById("confirmPhone").innerText = phone;

    const modal = new bootstrap.Modal(document.getElementById("confirmModal"));
    modal.show();
}

function submitRegister() {
    const password = document.getElementById("password").value;

    document.getElementById("hashedPassword").value = SHA256(password);

    document.getElementById("password").removeAttribute("name");
    document.getElementById("passwordCheck").removeAttribute("name");

    document.getElementById("registerForm").submit();
}