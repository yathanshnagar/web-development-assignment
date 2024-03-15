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

characterList = [];
getJsonObject('data.json',
  function(data) {
    characterList = data.Characters;
    loadCharacters(characterList);
    },
    function(xhr) { console.error(xhr); }
);

const table = document.getElementById('character-table');

function createTableRow(character) {
    const tableBody = table.getElementsByTagName('tbody')[0];
    const row = table.insertRow();
  
    // Define the order of data based on table header names (adjust as needed)
    const cellValues = [
      character.name,
      character.strength,
      character.speed,
      character.skill,
      character.fear_factor,
      character.power,
      character.intelligence,
      character.wealth,
      '<input type="checkbox" class="selected-checkbox">'
    ];
  
    for (const value of cellValues) {
      const cell = row.insertCell();
      cell.innerHTML = value;
    }
}

function loadCharacters(data) {
    const tableBody = table.getElementsByTagName('tbody')[0]; // Get the table body element
      for (const character of data) {
        createTableRow(character);
      }
}

table.addEventListener('change', function(event) {
    if (event.target.classList.contains('selected-checkbox')) {
      // Get all checkboxes
      const checkboxes = document.querySelectorAll('.selected-checkbox');
      let selectedCount = 0;
      // Count the number of selected checkboxes
      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          selectedCount++;
        }
      });
      // Check if more than two checkboxes are selected
      if (selectedCount > 2) {
        // If more than two are selected, uncheck the current checkbox
        event.target.checked = false;
        return;
      }
      // Get the row of the changed checkbox
      const row = event.target.closest('tr');
      // Toggle the "selected" class based on checkbox state
      if (event.target.checked) {
        row.classList.add('selected');
      } else {
        row.classList.remove('selected');

    }
}
});
