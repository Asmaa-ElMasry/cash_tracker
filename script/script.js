class CashTracker{
	constructor(){
		this.income = 0;
		this.expense = 0;
	}
	getTotal(){
		return this.income - this.expense;
	}
	addItem(){
		let type = document.getElementById("type");
		let description = document.getElementById("description");
		let amount = document.getElementById("amount");
		let table = document.getElementById(type.value);
		let row = table.insertRow(0);
		row.setAttribute("class", type.value+"-tr");
		let cell1 = row.insertCell(0);
		cell1.innerHTML = description.value;
		cell1.setAttribute("class", "td-description");
		let cell2 = row.insertCell(1);
		cell2.innerHTML = amount.value;
		cell2.setAttribute("class", "td-amount");
		row.insertCell(2).innerHTML = "<img src='images/trashcan.svg' alt='delete' onclick='tracker.deleteItem(this)'/>";
		this.addAmount(type.value, amount.value);
		this.setTotal();
		this.clearForm(type, description, amount);
	}
	deleteItem(imgElement){
		let tr_element = imgElement.parentElement.parentElement;
		let tr_type = tr_element.getAttribute("class");
		let amount = 0;
		for (var i = 0; i < tr_element.childNodes.length; i++) {
			if (tr_element.childNodes[i].className == "td-amount") {
				amount = tr_element.childNodes[i].innerHTML;
				break;
			}
		}
		if (tr_type == "Income-tr"){
			this.subtractAmount("Income", amount);
			this.setTotal();
			tr_element.parentNode.removeChild(tr_element);
		}
		else{
			this.subtractAmount("Expense", amount);
			this.setTotal();
			tr_element.parentNode.removeChild(tr_element);
		}
	}
	addAmount(type, amount){
		if (type === "Income"){
			this.income = parseFloat(this.income) + parseFloat(amount);
			document.getElementById("income-value").innerHTML = this.income;
		}
		else{
			this.expense = parseFloat(this.expense) + parseFloat(amount);
			document.getElementById("expense-value").innerHTML = this.expense;
		}
	}
	subtractAmount(type, amount){
		if (type === "Income"){
			this.income = parseFloat(this.income) - parseFloat(amount);
			document.getElementById("income-value").innerHTML = this.income;
		}
		else{
			this.expense = parseFloat(this.expense) - parseFloat(amount);
			document.getElementById("expense-value").innerHTML = this.expense;
		}
	}
	setTotal(){
		document.getElementById("total-amount").innerHTML = this.getTotal();
	}
	clearForm(type, description, amount){
		type.value = "Income";
		description.value = "";
		amount.value = "";
	}
}
var tracker = new CashTracker();
var form = document.getElementById("income-expene-form");
form.addEventListener("submit", function(event){
	event.preventDefault();
	tracker.addItem();
});
