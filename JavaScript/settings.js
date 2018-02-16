const settingsForm = document.getElementById('submission');
settingsForm.addEventListener('submit', function() {
    event.preventDefault();
    
    const error = document.getElementById('error-success');
        
    const p = document.createElement('p');
    error.innerHTML = '';

    const productAmt = parseInt(this['product-amount'].value);
    const roundsAmt = parseInt(this['rounds-amount'].value);

    const settings = {
        prodAmt: productAmt,
        roundAmt: roundsAmt,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
    console.log(settings);

    if (this['product-amount'].value || this['rounds-amount'].value) {
        
        p.textContent = 'Your changes were successfully saved!';
        error.appendChild(p);

        console.log('yes');

    } else {
        p.textContent = 'Please input a value!';
        error.appendChild(p);
        console.log('no');
    }
});

