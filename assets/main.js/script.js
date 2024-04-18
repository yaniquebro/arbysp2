

import BudgetTracker from "./BudgetTracker.js";

new BudgetTracker("#container");


// Get all toggle buttons
 const toggleButtons = document.querySelectorAll('.toggle-button');

// Add click event listener to each toggle button
 toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const target = document.getElementById(targetId);
        const subcategories = target.querySelector('.subcategories');

        if (subcategories.style.display === 'none' || subcategories.style.display === '') {
            subcategories.style.display = 'block';
            this.textContent = '-';
        } else {
            subcategories.style.display = 'none';
            this.textContent = '+';
        }

    });
});

