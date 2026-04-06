document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const entriesSelect = document.getElementById("entriesSelect");
    const tableBody = document.getElementById("datasetTableBody");
    const tableCountInfo = document.getElementById("tableCountInfo");

    if (!searchInput || !entriesSelect || !tableBody || !tableCountInfo) {
        return;
    }

    const allRows = Array.from(tableBody.querySelectorAll("tr"));

    function updateTable() {
        const keyword = searchInput.value.toLowerCase().trim();
        const visibleCountLimit = parseInt(entriesSelect.value, 10);

        const filteredRows = allRows.filter((row) => {
            const text = row.innerText.toLowerCase();
            return text.includes(keyword);
        });

        allRows.forEach((row) => row.classList.add("hidden-row"));

        filteredRows.forEach((row, index) => {
            if (index < visibleCountLimit) {
                row.classList.remove("hidden-row");
            }
        });

        const showingCount = Math.min(filteredRows.length, visibleCountLimit);
        tableCountInfo.textContent = `Showing ${showingCount} of ${filteredRows.length} matching entries`;
    }

    searchInput.addEventListener("input", updateTable);
    entriesSelect.addEventListener("change", updateTable);

    updateTable();
});
