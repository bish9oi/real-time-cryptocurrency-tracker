async function fetchCoinData() {
    const urlParams = new URLSearchParams(window.location.search);
    const coinId = urlParams.get("id");
    const currency = urlParams.get("currency");

    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=7`);
    const data = await res.json();

    document.getElementById("coin-name").innerText = coinId.toUpperCase();

    const ctx = document.getElementById("price-chart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.prices.map(price => new Date(price[0]).toLocaleDateString()),
            datasets: [{
                label: `Price in ${currency.toUpperCase()}`,
                data: data.prices.map(price => price[1]),
                borderColor: "blue",
                fill: false
            }]
        }
    });
}

function goBack() {
    window.history.back();
}

fetchCoinData();
