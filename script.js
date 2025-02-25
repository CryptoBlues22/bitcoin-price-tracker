function fetchBitcoinPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        .then(response => response.json())
        .then(data => {
            const price = data.bitcoin.usd;
            document.getElementById('price').innerText = `Bitcoin Price: $${price}`;
        })
        .catch(error => {
            console.error('Error fetching the Bitcoin price:', error);
            document.getElementById('price').innerText = 'Failed to load price.';
        });
}
