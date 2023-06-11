async function logJSONData() {
  const response = await fetch("/resources/js/data.json");
  const jsonData = await response.json();
  createChart(jsonData);
}
logJSONData();

function createChart(jsonData) {
  const chart_container = document.querySelector(".chart-container");
  const maxAmount = Math.max(...jsonData.map(({ amount }) => amount));

  jsonData.forEach(({ amount, day }) => {
    const columnHeight = (amount / maxAmount) * 100;
    const column_data = `
      <div class="column-container">
        <div>
          <div class="column ${
            maxAmount === amount ? "max" : ""
          }" style="height: ${columnHeight}%" data-stat="$${amount}"></div>
        </div>
        <p class="label">${day}</p>
      </div>
    `;

    chart_container.innerHTML += column_data;
  });
}
