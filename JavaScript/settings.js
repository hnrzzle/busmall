const settingsForm = document.getElementById('submission');
settingsForm.addEventListener('submit', function() {

    event.preventDefault();

    const productAmt = parseInt(this['product-amount'].value);
    const roundsAmt = parseInt(this['rounds-amount'].value);

    const settings = {
        prodAmt: productAmt,
        roundAmt: roundsAmt,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
});

