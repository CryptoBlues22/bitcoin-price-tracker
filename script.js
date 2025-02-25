document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('priceButton').addEventListener('click', function () {
        const priceElement = document.getElementById('price');
        const loader = document.getElementById('loader');

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
    });
});
