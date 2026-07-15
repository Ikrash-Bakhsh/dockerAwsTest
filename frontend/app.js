const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
    alert("Login Successful");
});

async function loadEmployees() {

    try{

        const response = await fetch("/api/employees");

        const data = await response.json();

        const table = document.getElementById("employeeTable");

        table.innerHTML = "";

        data.forEach(emp=>{

            table.innerHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
            </tr>
            `;

        });

    }
    catch(err){
        console.log(err);
    }

}

loadEmployees();