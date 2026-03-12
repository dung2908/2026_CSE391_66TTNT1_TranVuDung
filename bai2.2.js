const prices = { "Áo": 150000, "Quần": 200000, "Giày": 500000 };

const form = document.getElementById('orderForm');
const productEl = document.getElementById('product');
const quantityEl = document.getElementById('quantity');
const noteEl = document.getElementById('note');
const summaryBox = document.getElementById('summary-box');


function calculateTotal() {
    const product = productEl.value;
    const quantity = parseInt(quantityEl.value) || 0;
    const total = (prices[product] || 0) * quantity;
    document.getElementById('total-price').innerText = total.toLocaleString('vi-VN') + "đ";
}

productEl.addEventListener('change', calculateTotal);
quantityEl.addEventListener('input', calculateTotal);


noteEl.addEventListener('input', function() {
    const count = this.value.length;
    const counterDisplay = document.getElementById('char-count');
    counterDisplay.innerText = `${count}/200`;
    
    if (count > 200) {
        counterDisplay.classList.add('over-limit');
        showError(this, true);
    } else {
        counterDisplay.classList.remove('over-limit');
        showError(this, false);
    }
});


function showError(element, isError) {
    const parent = element.closest('.form-group');
    const msg = parent.querySelector('.error-msg');
    if (isError) {
        element.classList.add('invalid');
        msg.style.display = 'block';
    } else {
        element.classList.remove('invalid');
        msg.style.display = 'none';
    }
}


function validateForm() {
    let isValid = true;

    
    if (!productEl.value) { showError(productEl, true); isValid = false; } 
    else { showError(productEl, false); }

    
    const qty = parseInt(quantityEl.value);
    if (isNaN(qty) || qty < 1 || qty > 99) { showError(quantityEl, true); isValid = false; } 
    else { showError(quantityEl, false); }

    
    const dateVal = new Date(document.getElementById('deliveryDate').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (!dateVal || dateVal < today || dateVal > maxDate) {
        showError(document.getElementById('deliveryDate'), true);
        isValid = false;
    } else {
        showError(document.getElementById('deliveryDate'), false);
    }

  
    if (document.getElementById('address').value.trim().length < 10) {
        showError(document.getElementById('address'), true);
        isValid = false;
    } else {
        showError(document.getElementById('address'), false);
    }

   
    if (noteEl.value.length > 200) { isValid = false; }

  
    const payment = document.querySelector('input[name="payment"]:checked');
    const payError = document.getElementById('pay-error');
    if (!payment) { payError.style.display = 'block'; isValid = false; } 
    else { payError.style.display = 'none'; }

    return isValid;
}


form.onsubmit = function(e) {
    e.preventDefault();
    if (validateForm()) {
        const product = productEl.value;
        const qty = quantityEl.value;
        const total = document.getElementById('total-price').innerText;
        const date = document.getElementById('deliveryDate').value;

        document.getElementById('summary-content').innerHTML = `
            <p><strong>Sản phẩm:</strong> ${product}</p>
            <p><strong>Số lượng:</strong> ${qty}</p>
            <p><strong>Ngày giao:</strong> ${date}</p>
            <p><strong>Tổng tiền:</strong> ${total}</p>
        `;
        summaryBox.style.display = 'block';
    }
};


document.getElementById('confirmBtn').onclick = function() {
    alert("Đặt hàng thành công!");
    summaryBox.style.display = 'none';
    form.reset();
    document.getElementById('total-price').innerText = "0đ";
};

document.getElementById('cancelBtn').onclick = function() {
    summaryBox.style.display = 'none';
};


form.querySelectorAll('input, select, textarea').forEach(el => {
    el.onblur = () => { /* Có thể gọi validate riêng lẻ ở đây */ };
    el.oninput = () => { showError(el, false); };
});