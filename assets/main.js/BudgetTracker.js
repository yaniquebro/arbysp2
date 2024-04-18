export default class BudgetTracker {
    constructor(querySelectorString) {
        this.root = document.querySelector(querySelectorString);
        this.root.innerHTML = BudgetTracker.html();

        this.root.querySelector(".new-entry").addEventListener("click", () => {
            this.onNewEntryBtnClick()
        });

        //load initial data from local storage
        this.load();
    }

    static html() {
        return `
            <table class="budget-tracker">
            <thead>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th></th>
            </thead>
            <tbody class="entries"></tbody>
            <tbody class="controls">
                <tr>
                    <td colspan="5">
                        <button type="button" class="controls">New Entry</button>
                    </td>
                </tr>
            </tbody>
            <tfoot class="summary">
                <tr>
                    <td colspan="5">
                        <strong>TOTAL:</strong>
                        <span class="total">$0.00</span>
                    </td>
                </tr>
            </tfoot>
            </table>
        `;
    }

    static entryHtml() {
        return `
            <tr>
                <td>
                    <input class="input input-date" type="date">
                </td>
                <td>
                    <input class="input input-category" type="text" placeholder="bills, utilities, groceries etc.)">
                </td>
                <td>
                    <select class="input input-type">
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </td>
                <td>
                    <input class="input input-amount" type="number">
                </td>
                <td>
                    <button type="button" class="delete-entry">&#10005;</button>
                    </td>
            </tr>
                   
        `;
    }

    load() {
        const entries = JSON.parse(localStorage.getItem("budget-tracker-entries") || "[]");
        for (const entry of entries);
            this.addEntry(entry);
    }

    updateFinal() {
        const total = this.getEntryRows() .reduce((total, row) => {
            const amount = row.querySelector("input-amount").value; 
            const isExspense = row.querySelector("input-type").value === "expense";
            const modifier = isExspense ? -1 : 1;

            return total + (amount * modifier)
        },  0);

        const totalFormatted = new setInterval.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(total);

        this.root.querySelector(".total").textContent = totalFormatted


    }

    save() {
        const data = this.getEntryRows().map(row => {
            return{
                date: row.querySelector(".input-date").value,
                type: row.querySelector(".input-type").value,
                category: row.querySelector(".input-category").value,
                amount: parseFloat(row.querySelector(".input-amount").value),
            };
        })

        localStorage.setItem("budget-tracker-entries", JSON.stringify(data));
        this.updateFinal-total();
    }

    addEntry(entry = {}) {
        this.root.querySelector(".entries").insertAdjacentHTML("beforeend", BudgetTracker.html());

        const row = this.root.querySelector("entries tr:last-of-type");

        row.querySelector(".input-date").value = entry.date || new Date().toISOString().replace(/T.*/, "");
        row.querySelector(".input-catergory").value = entry.catergory || "";
        row.querySelector(".input-type").value = entry.type ||  "income";
        row.querySelector(".input-amount").value = entry.amount || 0;
        row.querySelector(".delete-entry").addEventListener("click", e => {
            this.onDeleteEntryBtnClick(e);
        });

        row.querySelectorAll(".input").forEach(input => {
            input.addEventListener("change", () => this.save())
        })
    }

    getEntryRows() {
        return Array.from(this.root.querySelectorAll("entries tr"))
    }

    onNewEntryBtnClick() {
        this.addEntry();
    }

    onDeleteEntryBtyClick(e) {
        console.log("Entry Deleted")

    }

}