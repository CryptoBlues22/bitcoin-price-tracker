// Define the function that fetches the Bitcoin price
function fetchBitcoinPrice() {
    document.getElementById('loader').style.display = 'block'; // Show loader

    // Fetch Bitcoin price from CoinGecko API
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const price = data.bitcoin.usd;
            document.getElementById('price').innerText = `Bitcoin Price: $${price}`;
            document.getElementById('loader').style.display = 'none'; // Hide loader
        })
        .catch(error => {
            console.error('Error fetching the Bitcoin price:', error);
            document.getElementById('price').innerText = 'Failed to load price.';
            document.getElementById('loader').style.display = 'none'; // Hide loader
        });
}

// Wait for the document to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('priceButton');
    // Add event listener to button to trigger fetchBitcoinPrice function on click
    button.addEventListener('click', fetchBitcoinPrice);
});
