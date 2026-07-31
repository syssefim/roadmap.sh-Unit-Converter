// weight.js

// Create conversion value map
const conversion = {
  // mg
  'mg-mg': 1,
  'mg-g': 0.001,
  'mg-kg': 0.000001,
  'mg-t': 0.00000000110231, // US Short Ton
  'mg-oz': 0.000035274,
  'mg-lb': 0.00000220462,

  // g
  'g-mg': 1000,
  'g-g': 1,
  'g-kg': 0.001,
  'g-t': 0.00000110231,
  'g-oz': 0.035274,
  'g-lb': 0.00220462,

  // kg
  'kg-mg': 1000000,
  'kg-g': 1000,
  'kg-kg': 1,
  'kg-t': 0.00110231,
  'kg-oz': 35.274,
  'kg-lb': 2.20462,

  // t (US Short Ton)
  't-mg': 907184740,
  't-g': 907184.74,
  't-kg': 907.18474,
  't-t': 1,
  't-oz': 32000,
  't-lb': 2000,

  // oz
  'oz-mg': 28349.52,
  'oz-g': 28.34952,
  'oz-kg': 0.02834952,
  'oz-t': 0.00003125,
  'oz-oz': 1,
  'oz-lb': 0.0625,

  // lb
  'lb-mg': 453592.37,
  'lb-g': 453.59237,
  'lb-kg': 0.45359237,
  'lb-t': 0.0005,
  'lb-oz': 16,
  'lb-lb': 1
};


// Get elements
const navLength = document.getElementById("navLength");
const navTemperature = document.getElementById("navTemperature");                
const weight = document.getElementById("weight");
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

navTemperature.addEventListener("click", function() {
    window.location.href = "/temperature";
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
    let result = Number(weight.value) * conversion[convertFromUnit.value.toLowerCase() + '-' + convertToUnit.value.toLowerCase()];
    resultContainer.innerHTML = weight.value + ' ' + convertFromUnit.value + ' = ' + result + ' ' + convertToUnit.value;

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
    weight.value = weight.defaultValue;
    convertFromUnit.value = convertFromUnit.defaultValue;
    convertToUnit.value = convertToUnit.defaultValue;
    resultContainer.innerHTML = '';

    history.pushState({ view: 'converting' }, "", "#converting");
});