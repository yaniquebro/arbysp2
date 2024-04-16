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
