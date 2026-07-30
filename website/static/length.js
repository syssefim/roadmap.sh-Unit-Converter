// length.js

// Get elements
const navWeight = document.getElementById("navWeight");
const navTemperature = document.getElementById("navTemperature");                
const length = document.getElementById("length");
const convertFromUnit = document.getElementById("from");
const convertToUnit = document.getElementById("to");
const convertButton = document.getElementById("convert");
const resultContainer = document.getElementById('result');
const resetButton = document.getElementById("reset");

// Add event listeners

// Navigation buttons
navWeight.addEventListener("click", function() {
    window.location.href = "/weight";
});

navTemperature.addEventListener("click", function() {
    window.location.href = "/temperature";
});


// Convert and Reset buttons
convertButton.addEventListener("click", function() {
    // Switch views
    document.getElementById('converting-view').classList.add('hidden');
    document.getElementById('converted-view').classList.remove('hidden');


    // Conversion calculation
    let result = 0;

    if (convertFromUnit.value === 'm' && convertToUnit.value === 'km') {
        result = length.value / 1000;
        resultContainer.innerHTML += length.value + ' ' + convertFromUnit.value + ' = ' + result + ' ' + convertToUnit.value;
    }
});

resetButton.addEventListener("click", function() {
    // Switch views
    document.getElementById('converting-view').classList.remove('hidden');
    document.getElementById('converted-view').classList.add('hidden');

    console.log('Resetting.....')

    // Reset input values
    length.value = length.defaultValue;
    convertFromUnit.value = convertFromUnit.defaultValue;
    convertToUnit.value = convertToUnit.defaultValue;
    resultContainer.innerHTML = '';

});