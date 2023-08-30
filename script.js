const balance=document.querySelector("#balance");
const incomeAmount=document.querySelector("#income-amount");
const expenseAmount=document.querySelector("#expense-amount");
const trans=document.querySelector("#trans");
const form=document.querySelector("#form");
const description=document.querySelector("#desc");
const amount=document.querySelector("#amount");


const localStorageTrans=JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans")!==null?
localStorageTrans:[]

const loadTransactionDetails=(transaction)=>{
    const sign=transaction.amount < 0 ? "-" : "+"; //Eğer amount negatifse, sign değişkenine - atanır, aksi halde + atanır.
    const item=document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "expense" : "income"); //Eğer miktar negatifse, elemente "expense" sınıfı eklenir, aksi halde "income" sınıfı eklenir
    item.innerHTML=`
    ${transaction.description}
    <span>${sign}   ${Math.abs(transaction.amount)}</span>  
    <button class="deleteBtn" onclick="removeTrans(${transaction.id})"><i class="fa-solid fa-xmark"></i></button>
    
    
    `
    trans.appendChild(item);

}


const removeTrans=(id)=>{
    if(confirm("Are you sure you want to delete Transaction")){
      transactions=transactions.filter((transaction) =>
      transaction.id != id);
      config();
      updateLocalStorage();
    }else{
        return;
    }
}


const updateAmount=()=>{
    const amounts=transactions.map((transaction)=>transaction.amount);
   

    //balance
    const total=amounts.reduce((acc,item)=> (acc += item),0).toFixed(2);
    balance.innerHTML=`${total} &#8378;`;


    //income
    const income=amounts
    .filter((item) => item > 0)
    .reduce((acc,item) =>(acc += item), 0).toFixed(2);
    incomeAmount.innerHTML=`${income} &#8378;`;
    

    //expense
    const expense=amounts
    .filter((item) => item < 0).reduce((acc,item) =>
    (acc += item), 0).toFixed(2);
    expenseAmount.innerHTML=`${Math.abs(expense)} &#8378;`;
    


}



const config=()=>{
    trans.innerHTML="";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
    
}
const addTransaction=(event) => {
    event.preventDefault();
    if(description.value.trim() == "" || amount.value.trim() == ""){
        alert("Please Enter Description and Amount");
    }else{
        const transaction = {
            id: uniqueId(),
            description: description.value,
            amount:+amount.value
        };
        transactions.push(transaction);
        console.log(transactions)
        loadTransactionDetails(transaction);
        description.value = "";
        amount.value= "" ;
        updateAmount();
        updateLocalStorage();
    }
}


const uniqueId=()=>{
    return Math.floor(Math.random()*1000000);//Bu rastgele ondalık sayıyı 1000000 ile çarpıp, 0 ile 999999 arasında bir sayı elde edilir.
}
form.addEventListener("submit", addTransaction);


window.addEventListener("load", function(){
    config();
})



const updateLocalStorage=()=>{
    localStorage.setItem("trans",JSON.stringify(transactions));
}