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
      let firstChar = -1;
      let secondChar = -1;
      // Count the number of selected checkboxes
      checkboxes.forEach(function(checkbox, index) {
        if (checkbox.checked) {
          selectedCount++;
          if (firstChar == -1) {
            firstChar = index
          } else {
            secondChar = index
          }
        }
      });
      // Check if more than two checkboxes are selected
      if (selectedCount > 2) {
        // If more than two are selected, uncheck the current checkbox
        event.target.checked = false;
        return;
      }

      document.getElementById('left-strength').innerText = "";
      document.getElementById('left-speed').innerText = "";
      document.getElementById('left-skill').innerText = "";
      document.getElementById('left-fear_factor').innerText = "";
      document.getElementById('left-power').innerText = "";
      document.getElementById('left-intelligence').innerText = "";
      document.getElementById('left-wealth').innerText = "";
      
      document.getElementById('right-strength').innerText = "";
      document.getElementById('right-speed').innerText = "";
      document.getElementById('right-skill').innerText = "";
      document.getElementById('right-fear_factor').innerText = "";
      document.getElementById('right-power').innerText = "";
      document.getElementById('right-intelligence').innerText = "";
      document.getElementById('right-wealth').innerText = "";


      document.getElementById('left-char').innerText = ""
      document.getElementById('right-char').innerText = ""
      
      document.getElementById('left-char-image').src = "";
      document.getElementById('right-char-image').src = ""


      if (firstChar != -1) {
        document.getElementById('left-char-image').src = "./" + characterList[firstChar].image_url;
        document.getElementById('left-char').innerText = characterList[firstChar].name
      }
      
      if (secondChar != -1) {
        let wonByOne = 0;
        let wonByTwo = 0;
        document.getElementById('right-char-image').src = "./" + characterList[secondChar].image_url;
        document.getElementById('right-char').innerText = characterList[secondChar].name;

        if (characterList[firstChar].strength > characterList[secondChar].strength) {
            document.getElementById('left-strength').innerHTML = "\u2713"
            wonByOne += 1
        } else {
            document.getElementById('right-strength').innerHTML = "\u2713"
            wonByTwo += 1
        }
        
        if (characterList[firstChar].speed > characterList[secondChar].speed) {
            document.getElementById('left-speed').innerHTML = "\u2713"
            wonByOne += 1
        } else {
            document.getElementById('right-speed').innerHTML = "\u2713"
            wonByTwo += 1
        }

        if (characterList[firstChar].skill > characterList[secondChar].skill) {
            document.getElementById('left-skill').innerHTML = "\u2713"
            wonByOne += 1
        } else {
            document.getElementById('right-skill').innerHTML = "\u2713"
            wonByTwo += 1
        }

        if (characterList[firstChar].fear_factor > characterList[secondChar].fear_factor) {
            document.getElementById('left-fear_factor').innerHTML = "\u2713"
            wonByOne += 1
        } else {
            document.getElementById('right-fear_factor').innerHTML = "\u2713"
            wonByTwo += 1

        }
        
        if (characterList[firstChar].power > characterList[secondChar].power) {
            wonByOne += 1
            document.getElementById('left-power').innerHTML = "\u2713"
        } else {
            document.getElementById('right-power').innerHTML = "\u2713"
            wonByTwo += 1

        }
        
        if (characterList[firstChar].intelligence > characterList[secondChar].intelligence) {
            document.getElementById('left-intelligence').innerHTML = "\u2713"
            wonByOne += 1
        } else {
            document.getElementById('right-intelligence').innerHTML = "\u2713"
            wonByTwo += 1

        }
        
        if (characterList[firstChar].wealth > characterList[secondChar].wealth) {
            wonByOne += 1
            document.getElementById('left-wealth').innerHTML = "\u2713"
        } else {
            document.getElementById('right-wealth').innerHTML = "\u2713"
            wonByTwo += 1

        }

        if (wonByOne > wonByTwo) {
          document.getElementById('char-card1').style.backgroundColor = "green";
          document.getElementById('char-card2').style.backgroundColor = "red";
        } else {
          document.getElementById('char-card1').style.backgroundColor = "red";
          document.getElementById('char-card2').style.backgroundColor = "green";
        }

        console.log("wonByOne", wonByOne, "wonByTwo", wonByTwo)
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
