
let studentList = [];

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');


function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}


function renderTable() {
    tableBody.innerHTML = "";
    let totalScore = 0;

    studentList.forEach((student, index) => {
        const rank = getRank(student.score);
        const rowClass = student.score < 5 ? "bg-warning" : "";
        totalScore += student.score;

        const row = `
            <tr class="${rowClass}">
                <td>${index + 1}</td>
                <td>${student.name}</td>
                <td>${student.score}</td>
                <td>${rank}</td>
                <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    
    const avg = studentList.length > 0 ? (totalScore / studentList.length).toFixed(2) : 0;
    summaryArea.innerText = `Tổng số SV: ${studentList.length} | Điểm trung bình: ${avg}`;
}


function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập tên và điểm hợp lệ (0-10)!");
        return;
    }

    
    studentList.push({ name, score });

    
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();

   
    renderTable();
}


btnAdd.addEventListener('click', addStudent);


txtScore.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addStudent();
    }
});


tableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        studentList.splice(index, 1); 
        renderTable(); 
    }
});

let students = [
    { name: "Nguyễn Lưu Ly ", score: 9.0 },
    { name: "Trần Vũ Dũng", score: 9.5 },
    { name: "Nguyễn Đức Hoàn", score: 7.5 }
];

let sortDirection = 0; 


function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}


function applyFilters() {
    const keyword = document.getElementById('searchName').value.toLowerCase();
    const rankFilter = document.getElementById('filterRank').value;

    
    let filteredStudents = students.filter(s => {
        const matchesName = s.name.toLowerCase().includes(keyword);
        const matchesRank = (rankFilter === "All") || (getRank(s.score) === rankFilter);
        return matchesName && matchesRank;
    });

   
    if (sortDirection !== 0) {
        filteredStudents.sort((a, b) => {
            return sortDirection === 1 ? a.score - b.score : b.score - a.score;
        });
    }

    renderTable(filteredStudents);
}


function renderTable(dataList) {
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = "";

    if (dataList.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`;
        return;
    }

    dataList.forEach((student, index) => {
        const row = document.createElement('tr');
        if (student.score < 5) row.style.backgroundColor = 'yellow';
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${getRank(student.score)}</td>
            <td><button onclick="deleteStudent('${student.name}')">Xóa</button></td>
        `;
        tableBody.appendChild(row);
    });
}




document.getElementById('searchName').addEventListener('input', applyFilters);


document.getElementById('filterRank').addEventListener('change', applyFilters);

document.getElementById('sortScore').addEventListener('click', () => {
    
    if (sortDirection === 0 || sortDirection === -1) sortDirection = 1;
    else sortDirection = -1;

   
    const icon = sortDirection === 1 ? "▲" : "▼";
    document.getElementById('sortIcon').innerText = icon;

    applyFilters();
});


function deleteStudent(name) {
    students = students.filter(s => s.name !== name);
    applyFilters();
}


applyFilters();