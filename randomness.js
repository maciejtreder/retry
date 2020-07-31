
function wobblyBarn() {
    var hundreds = Math.round(Math.random() * 10) - 1;
    console.log(hundreds);
    var tens = Math.round(Math.random() * 10) - 1;
    
    var digits = Math.round(Math.random() * 10) -1;

    if (tens <=5){
        tens = 0;
    }
    else if (tens <= 9){
        tens = 1;
    }
    else {
        tens = 2;
    };
    const code = hundreds.toString() + tens.toString() + digits.toString();
    console.log(code);
    return;
}

function wobblyApi(url) {
    var wobbleRate = Math.round(Math.random() * 10);
    console.log('wobbleRate = ' + wobbleRate);
    if (wobbleRate > 5) {
        return 'http://non-existing.com/api'
    }
    else {
        return url
    }
} 

(() => {
    console.log(wobblyApi('http://example.com/api'));
})();