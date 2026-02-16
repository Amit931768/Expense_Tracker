let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

displayExpenses();

function addExpense(){

    let desc = document.getElementById("desc").value;
    let amount = Number(document.getElementById("amount").value);

    if(desc === "" || amount === 0){
        alert("Enter details");
        return;
    }

    expenses.push({desc, amount});

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
}


function displayExpenses(){

    let list = document.getElementById("list");
    list.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {

        total += expense.amount;

        let li = document.createElement("li");

        li.innerHTML = `
            ${expense.desc} - ₹${expense.amount}

            <div>
                <button class="action-btn" onclick="editExpense(${index})">Edit</button>
                <button class="action-btn" onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;

        list.appendChild(li);

    });

    document.getElementById("total").textContent = total;

    updateChart();
}


function deleteExpense(index){

    expenses.splice(index,1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}


function editExpense(index){

    let newDesc = prompt("Edit Description", expenses[index].desc);
    let newAmount = Number(prompt("Edit Amount", expenses[index].amount));

    if(newDesc && newAmount){

        expenses[index].desc = newDesc;
        expenses[index].amount = newAmount;

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();
    }
}


function updateChart(){

    let labels = expenses.map(e => e.desc);
    let data = expenses.map(e => e.amount);

    if(chart){
        chart.destroy();
    }

    let ctx = document.getElementById("expenseChart");

    chart = new Chart(ctx,{
    type:"pie",
    data:{
        labels: labels,
        datasets:[{
            data: data
        }]
    },
    options:{
        plugins:{
            legend:{
                labels:{
                    color:"black"
                }
            }
        }
    }
});

}
