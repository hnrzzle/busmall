const settingsForm = document.getElementById('submission');
settingsForm.addEventListener('submit', function() {

    event.preventDefault();

    const productAmt = this['product-amount'].value;
    const roundsAmt = this['rounds-amount'].value;

    const settings = {
        prodAmt: productAmt,
        roundAmt: roundsAmt,
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
});

