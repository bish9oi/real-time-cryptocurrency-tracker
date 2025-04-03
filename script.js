
// const cryptoContainer = document.getElementById("crypto-container");
// const searchInput = document.getElementById("search");
// const currencySelect = document.getElementById("currency-select");
// const themeToggle = document.getElementById("theme-toggle");
// const pageNumber = document.getElementById("page-number");
// const sortSelect = document.getElementById("sort-select");
// let currentPage = 1;
// let currentCurrency = "usd";
// let allCryptoData = [];
// let sortBy = "market_cap_desc";
// async function fetchCryptoData() {
//     try {
//         currentCurrency = currencySelect.value;
//         const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=market_cap_desc&per_page=50&page=${currentPage}`);
//         allCryptoData = await res.json();
//         displayCrypto(allCryptoData);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// function displayCrypto(cryptos) {
//     cryptoContainer.innerHTML = "";
//     cryptos.forEach(crypto => {
//         const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? "green" : "red";
//         cryptoContainer.innerHTML += `
//             <div class="crypto-card" onclick="goToCoinPage('${crypto.id}')">
//                 <img src="${crypto.image}" alt="${crypto.name}">
//                 <p>${crypto.name} (${crypto.symbol.toUpperCase()})</p>
//                 <p class="price">${crypto.current_price} ${currencySelect.value.toUpperCase()}</p>
//                 <p class="${priceChangeClass}">${crypto.price_change_percentage_24h.toFixed(2)}%</p>
//             </div>
//         `;
//     });
// }

// function filterCoins() {
//     const query = searchInput.value.toLowerCase();
//     if (query === "") {
//         displayCrypto(allCryptoData);
//         return;
//     }

//     let filteredCryptos = allCryptoData.filter(crypto =>
//         crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query)
//     );

   
//     filteredCryptos.sort((a, b) => {
//         if (a.name.toLowerCase().startsWith(query)) return -1;
//         if (b.name.toLowerCase().startsWith(query)) return 1;
//         return 0;
//     });

//     displayCrypto(filteredCryptos);
// }

// function goToCoinPage(coinId) {
//     window.location.href = `coin.html?id=${coinId}&currency=${currentCurrency}`;
// }

// function changePage(direction) {
//     currentPage += direction;
//     if (currentPage < 1) currentPage = 1;
//     pageNumber.innerText = `Page ${currentPage}`;
//     fetchCryptoData();
// }

// themeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("light-mode");
// });

// setInterval(fetchCryptoData, 30000);
// fetchCryptoData();
// searchInput.addEventListener("input", filterCoins);





// setInterval(() => {
//     fetchCryptoData();
//     refreshInterval = 30;
// }, 30000);

// setInterval(() => {
//     if (refreshInterval > 0) {
//         refreshInterval--;
//         countdownTimer.innerText = refreshInterval;
//     }
// }, 1000);





// script.js
const cryptoContainer = document.getElementById("crypto-container");
const searchInput = document.getElementById("search");
const currencySelect = document.getElementById("currency-select");
const themeToggle = document.getElementById("theme-toggle");
const pageNumber = document.getElementById("page-number");
const sortSelect = document.getElementById("sort-select");
let currentPage = 1;
let currentCurrency = "usd";
let allCryptoData = [];
let sortBy = "market_cap_desc";

async function fetchCryptoData() {
    try {
        currentCurrency = currencySelect.value;
        sortBy = sortSelect.value;
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currentCurrency}&order=${sortBy}&per_page=50&page=${currentPage}`);
        allCryptoData = await res.json();
        displayCrypto(allCryptoData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayCrypto(cryptos) {
    cryptoContainer.innerHTML = "";
    cryptos.forEach(crypto => {
        const priceChangeClass = crypto.price_change_percentage_24h >= 0 ? "green" : "red";
        cryptoContainer.innerHTML += `
            <div class="crypto-card" onclick="goToCoinPage('${crypto.id}')">
                <img src="${crypto.image}" alt="${crypto.name}">
                <div>
                    <p><strong>${crypto.name} (${crypto.symbol.toUpperCase()})</strong></p>
                    <p class="price">Price: ${crypto.current_price} ${currencySelect.value.toUpperCase()}</p>
                    <p>Market Cap: ${crypto.market_cap.toLocaleString()} ${currencySelect.value.toUpperCase()}</p>
                    <p class="${priceChangeClass}">24h Change: ${crypto.price_change_percentage_24h.toFixed(2)}%</p>
                </div>
            </div>
        `;
    });
}

function filterCoins() {
    const query = searchInput.value.toLowerCase();
    if (query === "") {
        displayCrypto(allCryptoData);
        return;
    }
    let filteredCryptos = allCryptoData.filter(crypto =>
        crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query)
    );
    displayCrypto(filteredCryptos);
}

function goToCoinPage(coinId) {
    window.location.href = `coin.html?id=${coinId}&currency=${currentCurrency}`;
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    pageNumber.innerText = `Page ${currentPage}`;
    fetchCryptoData();
}

sortSelect.addEventListener("change", fetchCryptoData);
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

setInterval(fetchCryptoData, 30000);
fetchCryptoData();
searchInput.addEventListener("input", filterCoins);
