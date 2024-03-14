document.getElementById("search-input").addEventListener("input", processSearch);

function processSearch(event) {
  var searchValue = event.target.value.toLowerCase(); // Convert search term to lowercase
  const filteredCharacters = characterList.filter(character => character.name.toLowerCase().includes(searchValue));
  loadCharacters(filteredCharacters); // Call loadCharacters with filtered data
}

function search(searchValue){
  // TODO: search JSON data for the searchValue (not used in this implementation)
}

function getJsonObject(path, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        if (success) success(JSON.parse(xhr.responseText));
      } else {
        if (error) error(xhr);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

characterList = []; // character list container
getJsonObject('data.json',
  function(data) {
    characterList = data.Characters; // store the character list into characterList
    // Uncomment the following line to call loadCharacters after data retrieval using fetch
    loadCharacters(characterList);
  },
  function(xhr) { console.error(xhr); }
);

// Get a reference to the table element
const table = document.getElementById('character-table');

// Function to create a new table row with cells for specific properties
function createTableRow(character) {
  const tableBody = table.getElementsByTagName('tbody')[0];
  const row = table.insertRow();

  // Define the order of data based on table header names (adjust as needed)
  const cellValues = [
    character.name,
    character.strength,
    character.speed,
    character.skill,
    character.fear_factor, // Ensure property name matches exactly (lowercase 'f')
    character.power,
    character.intelligence,
    character.wealth,
    character.selected // Assuming there's a "Selected" property in the JSON
  ];

  for (const value of cellValues) {
    const cell = row.insertCell();
    cell.textContent = value;
  }
}

function loadCharacters(data) {
    const tableBody = table.getElementsByTagName('tbody')[0]; // Get the table body element
    if (tableBody) {
      // Clear existing rows within the tbody
      while (tableBody.rows.length > 1) {
        tableBody.deleteRow(1);
      }
      for (const character of data) {
        createTableRow(character);
      }
    } else {
      console.warn("Table doesn't have a tbody element. Consider adding one for better organization.");
    }
  }



// Fetch the JSON data 
fetch('data.json')
  .then(response => response.json())
  .then(data => { 
    characterList = data.Characters;
    // Uncomment the following line if you're not using the commented-out line in getJsonObject's success function
    // loadCharacters(characterList); // Call loadCharacters after data retrieval using fetch
  })
  .catch(error => console.error('Error fetching JSON data:', error));

// This is the JavaScript code to update the percentage values
// Get all the slider inputs
const sliders = document.querySelectorAll(".filter-item input[type=range]");

// Loop through each slider
sliders.forEach((slider) => {
  // Add an event listener for the input event
  slider.addEventListener("input", () => {
    // Set the value attribute to the current value of the slider
    slider.setAttribute("value", slider.value);
  });
});
