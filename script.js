document.addEventListener('DOMContentLoaded', function () {
    const priceElement = document.getElementById('price');
    const loader = document.getElementById('loader');
    const ctx = document.getElementById('btcChart').getContext('2d');

    let btcChart;

    document.getElementById('priceButton').addEventListener('click', function () {
        loader.style.display = 'block';
        priceElement.innerText = "Fetching price...";

        fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
            .then(response => response.json())
            .then(data => {
                const price = data.bitcoin.usd;
                priceElement.innerText = `Bitcoin Price: $${price}`;
                loader.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching Bitcoin price:', error);
                priceElement.innerText = 'Failed to load price.';
                loader.style.display = 'none';
            });

        // Fetch historical data for the chart
        fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7')
            .then(response => response.json())
            .then(data => {
                const prices = data.prices.map(entry => entry[1]); // Extract price
                const timestamps = data.prices.map(entry => new Date(entry[0]).toLocaleDateString());

                // If the chart already exists, destroy it before creating a new one
                if (btcChart) {
                    btcChart.destroy();
                }

                btcChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: timestamps,
                        datasets: [{
                            label: 'Bitcoin Price (USD)',
                            data: prices,
                            borderColor: 'orange',
                            backgroundColor: 'rgba(255, 165, 0, 0.2)',
                            fill: true,
                            tension: 0.3
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: { title: { display: true, text: 'Price (USD)' } }
                        }
                    }
                });
            })
            .catch(error => console.error('Error fetching historical data:', error));
    });
});
