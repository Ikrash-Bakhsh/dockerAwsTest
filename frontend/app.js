const API_URL = "/api/employees";

const employeeTable = document.getElementById("employeeTable");
const loginBtn = document.getElementById("loginBtn");

const addEmployeeBtn = document.getElementById("addEmployeeBtn");

addEmployeeBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    if (!name || !email || !department) {

        alert("Please fill all fields");

        return;

    }

    await fetch("/api/employees", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            name,
            email,
            department

        })

    });

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("department").value = "";

    loadEmployees();

});

// Load Employees
async function loadEmployees() {

    try {

        const response = await fetch(API_URL);

        const employees = await response.json();

        employeeTable.innerHTML = "";

        employees.forEach(employee => {

            employeeTable.innerHTML += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.department}</td>
                    <td>
                        <button onclick="deleteEmployee(${employee.id})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    }

    catch(err){

        console.log(err);

    }

}

// Delete Employee

async function deleteEmployee(id){

    await fetch(`/api/employees/${id}`,{

        method:"DELETE"

    });

    loadEmployees();

}

// Login

loginBtn.addEventListener("click",()=>{

    alert("Login Successful");

    loadEmployees();

});

loadEmployees();