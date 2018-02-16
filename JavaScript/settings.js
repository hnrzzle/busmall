const settingsForm = document.getElementById('submission');
settingsForm.addEventListener('submit', function() {

    event.preventDefault();

    const productAmt = parseInt(this['product-amount'].value);
    const roundsAmt = parseInt(this['rounds-amount'].value);

    const settings = {
        prodAmt: productAmt,
        roundAmt: roundsAmt,
    };
    if (this['product-amount'].value) {
        const error = document.getElementById('error-success');
        const p = document.createElement('p');
        p.textContent = 'Your changes were successfully saved!';
        error.appendChild(p);

        console.log('yes');

    } else {
        console.log('no');
    }

});

