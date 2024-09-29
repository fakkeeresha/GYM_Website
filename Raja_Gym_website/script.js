// Utility function to create table rows
function createTableRow(data) {
    const row = document.createElement('tr');
    data.forEach(text => {
        const cell = document.createElement('td');
        cell.textContent = text;
        row.appendChild(cell);
    });
    return row;
}

// Function to add a new member
function addMember(e) {
    e.preventDefault();
    const name = document.getElementById('memberName').value;
    const age = document.getElementById('memberAge').value;
    const membership = document.getElementById('membershipType').value;
    
    const tableBody = document.querySelector('#memberList tbody');
    const row = createTableRow([name, age, membership]);
    tableBody.appendChild(row);
    
    e.target.reset();
}

// Function to add a new class
function addClass(e) {
    e.preventDefault();
    const className = document.getElementById('className').value;
    const instructor = document.getElementById('classInstructor').value;
    const time = document.getElementById('classTime').value;
    
    const tableBody = document.querySelector('#classList tbody');
    const row = createTableRow([className, instructor, time]);
    tableBody.appendChild(row);
    
    e.target.reset();
}

// Function to add new equipment
function addEquipment(e) {
    e.preventDefault();
    const equipment = document.getElementById('equipmentName').value;
    const quantity = document.getElementById('equipmentQuantity').value;
    const condition = document.getElementById('equipmentCondition').value;
    
    const tableBody = document.querySelector('#equipmentList tbody');
    const row = createTableRow([equipment, quantity, condition]);
    tableBody.appendChild(row);
    
    e.target.reset();
}

// Event listeners
document.getElementById('memberForm').addEventListener('submit', addMember);
document.getElementById('classForm').addEventListener('submit', addClass);
document.getElementById('equipmentForm').addEventListener('submit', addEquipment);

// Local Storage functions
function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Function to load data from local storage
function loadStoredData() {
    const members = getFromLocalStorage('members');
    const classes = getFromLocalStorage('classes');
    const equipment = getFromLocalStorage('equipment');

    members.forEach(member => {
        const row = createTableRow([member.name, member.age, member.membership]);
        document.querySelector('#memberList tbody').appendChild(row);
    });

    classes.forEach(cls => {
        const row = createTableRow([cls.name, cls.instructor, cls.time]);
        document.querySelector('#classList tbody').appendChild(row);
    });

    equipment.forEach(item => {
        const row = createTableRow([item.name, item.quantity, item.condition]);
        document.querySelector('#equipmentList tbody').appendChild(row);
    });
}

// Load stored data when the page loads
window.addEventListener('load', loadStoredData);

// Update local storage when new items are added
function updateStorage(formId, storageKey) {
    document.getElementById(formId).addEventListener('submit', function(e) {
        const data = getFromLocalStorage(storageKey);
        const newItem = Array.from(e.target.elements)
            .filter(element => element.tagName === 'INPUT' || element.tagName === 'SELECT')
            .reduce((obj, input) => ({ ...obj, [input.id]: input.value }), {});
        data.push(newItem);
        saveToLocalStorage(storageKey, data);
    });
}

updateStorage('memberForm', 'members');
updateStorage('classForm', 'classes');
updateStorage('equipmentForm', 'equipment');