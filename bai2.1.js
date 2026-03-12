const form = document.getElementById('registerForm');


function showError(fieldId, message) {
    const parent = document.getElementById(fieldId).parentElement;
    const errorDisplay = parent.querySelector('.error-msg');
    errorDisplay.innerText = message;
    parent.classList.add('error');
}

function clearError(fieldId) {
    const parent = document.getElementById(fieldId).parentElement;
    const errorDisplay = parent.querySelector('.error-msg');
    errorDisplay.innerText = "";
    parent.classList.remove('error');
}


function validateFullname() {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (val === "") { showError('fullname', "Họ tên không được trống"); return false; }
    if (val.length < 3) { showError('fullname', "Họ tên phải >= 3 ký tự"); return false; }
    if (!regex.test(val)) { showError('fullname', "Chỉ chứa chữ cái và khoảng trắng"); return false; }
    clearError('fullname');
    return true;
}

function validateEmail() {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) { showError('email', "Email không đúng định dạng"); return false; }
    clearError('email');
    return true;
}

function validatePhone() {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/; 
    if (!regex.test(val)) { showError('phone', "SĐT phải 10 số và bắt đầu bằng 0"); return false; }
    clearError('phone');
    return true;
}

function validatePassword() {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) { 
        showError('password', "Tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 số"); 
        return false; 
    }
    clearError('password');
    return true;
}

function validateConfirmPassword() {
    const pass = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirmPassword').value;
    if (confirmPass === "" || confirmPass !== pass) {
        showError('confirmPassword', "Mật khẩu xác nhận không khớp");
        return false;
    }
    clearError('confirmPassword');
    return true;
}

function validateGender() {
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
        document.getElementById('gender-error').innerText = "Vui lòng chọn giới tính";
        return false;
    }
    document.getElementById('gender-error').innerText = "";
    return true;
}

function validateTerms() {
    const isChecked = document.getElementById('terms').checked;
    if (!isChecked) {
        document.getElementById('terms-error').innerText = "Bạn phải đồng ý với điều khoản";
        return false;
    }
    document.getElementById('terms-error').innerText = "";
    return true;
}


const inputs = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
inputs.forEach(id => {
    const element = document.getElementById(id);
   
    element.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirmPassword();
    });
   
    element.addEventListener('input', () => clearError(id));
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateFullname() & 
                    validateEmail() & 
                    validatePhone() & 
                    validatePassword() & 
                    validateConfirmPassword() & 
                    validateGender() & 
                    validateTerms();

   
    if (isValid) {
        
        const name = document.getElementById('fullname').value;
        form.style.display = 'none';
        const successMsg = document.getElementById('successMessage');
        successMsg.style.display = 'block';
        successMsg.innerHTML = `<h3>Đăng ký thành công! 🎉</h3><p>Chào mừng, ${name}!</p>`;
    }
});

const fullnameInput = document.getElementById('fullname');
const charCount = document.getElementById('charCount');

fullnameInput.addEventListener('input', () => {
    const length = fullnameInput.value.length;
    charCount.innerText = `${length}/50`;
    if (length >= 50) {
        charCount.style.color = 'red';
    } else {
        charCount.style.color = 'inherit';
    }
});


const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.innerText = type === 'password' ? '👁️' : '🙈';
});


const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');

passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    if (val.length >= 8) score++; 
    if (/[A-Z]/.test(val)) score++; 
    if (/[a-z]/.test(val)) score++; 
    if (/[0-9]/.test(val)) score++; 
    if (/[^A-Za-z0-9]/.test(val)) score++; 

    let color = "";
    let width = "";
    let label = "";

    if (val.length === 0) {
        width = "0%";
    } else if (score <= 2) {
        width = "33%";
        color = "red";
        label = "Yếu";
    } else if (score <= 4) {
        width = "66%";
        color = "orange";
        label = "Trung bình";
    } else {
        width = "100%";
        color = "green";
        label = "Mạnh";
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;
    strengthText.innerText = label;
    strengthText.style.color = color;
});