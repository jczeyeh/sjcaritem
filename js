let items = JSON.parse(localStorage.getItem("items")) || [];

function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

function addItem() {
    const code = document.getElementById("code").value.trim();
    const name = document.getElementById("name").value.trim();
    const shelf = document.getElementById("shelf").value.trim();

    if (!code || !name || !shelf) {
        alert("Please fill all fields");
        return;
    }

    items.push({ code, name, shelf });
    saveItems();

    alert("Item added");
    document.getElementById("code").value = "";
    document.getElementById("name").value = "";
    document.getElementById("shelf").value = "";
}

function deleteItem() {
    const input = document.getElementById("deleteInput").value.trim().toLowerCase();
    const before = items.length;

    items = items.filter(item =>
        item.code.toLowerCase() !== input &&
        item.name.toLowerCase() !== input
    );

    if (items.length === before) {
        alert("Item not found");
    } else {
        saveItems();
        alert("Item deleted");
    }

    document.getElementById("deleteInput").value = "";
}

function searchItem() {
    const input = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    const resultDiv = document.getElementById("searchResult");
    resultDiv.innerHTML = "";

    if (!input) {
        resultDiv.innerText = "Please enter a search term";
        return;
    }

    const results = items.filter(item =>
        item.code.toLowerCase().startsWith(input) ||
        item.name.toLowerCase().startsWith(input)
    );

    if (results.length === 0) {
        resultDiv.innerText = "No matching items found";
        return;
    }

    results.forEach(item => {
        const line = document.createElement("div");
        line.innerText =
            `Item: ${item.name} | Code: ${item.code} | Shelf: ${item.shelf}`;
        resultDiv.appendChild(line);
    });
}
