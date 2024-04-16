const toggleButton = document.getElementById('toggleSubcategories');
const toggleIcon = document.getElementById('toggleIcon');
const subcategories = document.getElementById('subcategories');


let isSubcategoriesVisible = false;


toggleButton.addEventListener('click', function() {
    isSubcategoriesVisible = !isSubcategoriesVisible;
   
    if (isSubcategoriesVisible) {
        subcategories.style.display = 'block';
        toggleIcon.textContent = '-';
    } else {
        subcategories.style.display = 'none';
        toggleIcon.textContent = '+';
    }
});

//add and delete budget button 
const budgetInputEl = document.querySelector(".budget_input");

function addNewBill(expensesPara) {
    const html = `<div class="tbl_tr_content">
              <div data-id=${expensesPara.id}>${expensesPara.id + 1}</div>
              <div>${expensesPara.title}</div>
              <div><span>$</span>${expensesPara.amount}</div>
              <div>
                <button type="button" class="btn_edit">Edit</button>
                <button type="button" class="btn_delete">Delete</button>
              </div>
            </div>`;
  
    tblRecordEl.insertAdjacentHTML("beforeend", html);


    const btnEdit = document.querySelectorAll(".btn_edit");
    const btnDel = document.querySelectorAll(".btn_delete");

    btnEdit.forEach((btnedit) => {
        btnedit.addEventListener("click", (el) => {
          let id;
    
          content_id.forEach((ids) => {
            id = ids.firstElementChild.dataset.id;
          });
    
          let element = el.target.parentElement.parentElement;
          element.remove();
    
          let expenses = itemList.filter(function (item) {
            return item.id == id;
          });
    
          expenseDesEl.value = expenses[0].title;
          expenseAmountEl.value = expenses[0].amount;
    
          let temp_list = itemList.filter(function (item) {
            return item.id != id;
          });
    
          itemList = temp_list;
        });
      });
    
      btnDel.forEach((btndel) => {
        btndel.addEventListener("click", (el) => {
          let id;
    
          content_id.forEach((ids) => {
            id = ids.firstElementChild.dataset.id;
          });
    
          let element = el.target.parentElement.parentElement;
          element.remove();
    
          let temp_list = itemList.filter(function (item) {
            return item.id != id;
          });
    
          itemList = temp_list;
          showBalance();
        });
      });
    }
    // budget function
   
    function budgetFun() {
        const budgetValue = budgetInputEl.value;
      
        if (budgetValue == "" || budgetValue < 0) {
          errorMessage("Please Enter Your Budget or More Than 0");
        } else {
          budgetCardEl.textContent = budgetValue;
          budgetInputEl.value = "";
          showBalance();
        }
      }