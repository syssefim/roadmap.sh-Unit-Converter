// temperature.js

// Get elements
const navLength = document.getElementById("navLength");
const navWeight = document.getElementById("navWeight");                
const temperature = document.getElementById("temperature");
const convertFromUnit = document.getElementById("from");
const convertToUnit = document.getElementById("to");
const convertButton = document.getElementById("convert");
const resultContainer = document.getElementById('result');
const resetButton = document.getElementById("reset");

// Add event listeners

// Navigation buttons
navLength.addEventListener("click", function() {
    window.location.href = "/length";
});

navWeight.addEventListener("click", function() {
    window.location.href = "/weight";
});

// Handle browser back/forward navigation
window.addEventListener("popstate", function(event) {
    // Get the state data we saved during pushState/replaceState
    let state = event.state;

    // If there is no state (fallback) or the state is 'converting'
    if (!state || state.view === 'converting') {
        // Show the converting view
        document.getElementById('converting-view').classList.remove('hidden');
        document.getElementById('converted-view').classList.add('hidden');
    } 
    // If the state is 'converted'
    else if (state.view === 'converted') {
        // Show the converted view
        document.getElementById('converting-view').classList.add('hidden');
        document.getElementById('converted-view').classList.remove('hidden');
    }
});

// Convert button click event
convertButton.addEventListener("click", function() {
    // Switch views
    document.getElementById('converting-view').classList.add('hidden');
    document.getElementById('converted-view').classList.remove('hidden');

    // Conversion calculation
    //let result = Number(temperature.value) * conversion[convertFromUnit.value.toLowerCase() + '-' + convertToUnit.value.toLowerCase()];
    let result = 0;
    
    switch (convertFromUnit.value.toLowerCase() + '-' + convertToUnit.value.toLowerCase()) {
        // C
        case 'c-c':
            result = 1;
            break;
        case 'c-f':
            result = (Number(temperature.value) * 1.8) + 32;
            break;
        case 'c-k':
            result = Number(temperature.value) + 273.15;
            break;
        
        // F
        case 'f-c':
            result = (Number(temperature.value) - 32) * 0.55555;
            break;
        case 'f-f':
            result = 1;
            break;
        case 'f-k':
            result = ((Number(temperature.value) - 32) * 0.55555) + 273.15;
            break;

        // K
        case 'k-c':
            result = Number(temperature.value) - 273.15;
            break;
        case 'k-f':
            result = (Number(temperature.value) - 273.15) * 1.8 + 32;
            break;
        case 'k-k':
            result = 1;
            break;
    }



    resultContainer.innerHTML = temperature.value + ' ' + convertFromUnit.value + ' = ' + result + ' ' + convertToUnit.value;

    history.pushState({ 
        view: 'converted', 
        savedResults: resultContainer.innerHTML 
    }, "", "#converted");
});

// Reset button click event
resetButton.addEventListener("click", function() {
    // Switch views
    document.getElementById('converting-view').classList.remove('hidden');
    document.getElementById('converted-view').classList.add('hidden');

    // Reset input values
    temperature.value = temperature.defaultValue;
    convertFromUnit.value = convertFromUnit.defaultValue;
    convertToUnit.value = convertToUnit.defaultValue;
    resultContainer.innerHTML = '';

    history.pushState({ view: 'converting' }, "", "#converting");
});