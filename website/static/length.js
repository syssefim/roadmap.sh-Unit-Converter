// length.js

// Create conversion value map
const conversion = {
  // mm
  'mm-mm': 1,
  'mm-cm': 0.1,
  'mm-m': 0.001,
  'mm-km': 0.000001,
  'mm-in': 0.0393701,
  'mm-ft': 0.00328084,
  'mm-yd': 0.00109361,
  'mm-mi': 0.000000621371,

  // cm
  'cm-mm': 10,
  'cm-cm': 1,
  'cm-m': 0.01,
  'cm-km': 0.00001,
  'cm-in': 0.393701,
  'cm-ft': 0.0328084,
  'cm-yd': 0.0109361,
  'cm-mi': 0.00000621371,

  // m
  'm-mm': 1000,
  'm-cm': 100,
  'm-m': 1,
  'm-km': 0.001,
  'm-in': 39.3701,
  'm-ft': 3.28084,
  'm-yd': 1.09361,
  'm-mi': 0.000621371,

  // km
  'km-mm': 1000000,
  'km-cm': 100000,
  'km-m': 1000,
  'km-km': 1,
  'km-in': 39370.1,
  'km-ft': 3280.84,
  'km-yd': 1093.61,
  'km-mi': 0.621371,

  // in
  'in-mm': 25.4,
  'in-cm': 2.54,
  'in-m': 0.0254,
  'in-km': 0.0000254,
  'in-in': 1,
  'in-ft': 0.0833333,
  'in-yd': 0.0277778,
  'in-mi': 0.0000157828,

  // ft
  'ft-mm': 304.8,
  'ft-cm': 30.48,
  'ft-m': 0.3048,
  'ft-km': 0.0003048,
  'ft-in': 12,
  'ft-ft': 1,
  'ft-yd': 0.333333,
  'ft-mi': 0.000189394,

  // yd
  'yd-mm': 914.4,
  'yd-cm': 91.44,
  'yd-m': 0.9144,
  'yd-km': 0.0009144,
  'yd-in': 36,
  'yd-ft': 3,
  'yd-yd': 1,
  'yd-mi': 0.000568182,

  // mi
  'mi-mm': 1609344,
  'mi-cm': 160934.4,
  'mi-m': 1609.344,
  'mi-km': 1.609344,
  'mi-in': 63360,
  'mi-ft': 5280,
  'mi-yd': 1760,
  'mi-mi': 1
};


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
    let result = Number(length.value) * conversion[convertFromUnit.value.toLowerCase() + '-' + convertToUnit.value.toLowerCase()];
    resultContainer.innerHTML = '<strong>' + length.value + ' ' + convertFromUnit.value + ' = ' + result + ' ' + convertToUnit.value + '</strong>';

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
    length.value = length.defaultValue;
    convertFromUnit.value = convertFromUnit.defaultValue;
    convertToUnit.value = convertToUnit.defaultValue;
    resultContainer.innerHTML = '';

    history.pushState({ view: 'converting' }, "", "#converting");
});