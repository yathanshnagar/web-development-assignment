// listening to searches
document.getElementById("search-input").addEventListener("input", processSearch);

function processSearch(event) {
  var searchValue = event.target.value.toLowerCase();
  const filteredCharacters = characterList.filter(character => character.name.toLowerCase().includes(searchValue));
  loadCharacters(filteredCharacters); // Call loadCharacters with filtered data
  console.log(searchValue);
  search(searchValue);
}

function search(searchValue){
	// TODO: search JSON data for the searchValue
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
        console.log(characterList); // print it into console (developer tools)
        console.log(characterList[0]);
        console.log(characterList[1]);
        console.log(characterList[2]);
        console.log(characterList[3]);
        console.log(characterList[4]);
        console.log(characterList[5]);
        console.log(characterList[6]);
        console.log(characterList[7]);
        console.log(characterList[8]);
        console.log(characterList[9]);
        console.log(characterList[10]);
        console.log(characterList[11]);
        console.log(characterList[12]);
        console.log(characterList[13]);
        console.log(characterList[14]);
        // print the first character object to the console 
        // here you can call methods to load or refresh the page 
        // loadCharacters() or refreshPage()
    },
    function(xhr) { console.error(xhr); }
);

// Get a reference to the table element
const table = document.getElementById('character-table');

// Function to create a new table row with cells for specific properties
function createTableRow(character) {
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

// Function to load characters from the JSON data
function loadCharacters(data) {
  for (const character of data.Characters) {
    createTableRow(character);
  }
}

// Fetch the JSON data and call the loadCharacters function on success
fetch('data.json')
  .then(response => response.json())
  .then(data => loadCharacters(data))
  .catch(error => console.error('Error fetching JSON data:', error));