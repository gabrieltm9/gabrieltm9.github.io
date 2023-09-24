const menuItems = document.querySelectorAll("#menu-list li a");

menuItems.forEach((item) => {
    item.addEventListener("click", (event) => {
        // Remove the "active" class from all items
        menuItems.forEach((menuItem) => {
            menuItem.classList.remove("active");
        });

        // Add the "active" class to the clicked item
        event.target.classList.add("active");
    });
});