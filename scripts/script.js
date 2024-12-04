const propertyInput = document.querySelector(".property-input");
const valueInput = document.querySelector(".value-input");
const submitBtn = document.querySelector("#submit-btn");
const displayRulesBtn = document.querySelector(".display-rules-btn");
const closeRulesBtn = document.querySelector(".close-rules-X");
const root = document.documentElement;

const properties = {
  color: ["red", "#ff0000"],
  "background-color": ["rgb(255, 0, 0)", "transparent"],
  "font-size": ["12px", "smaller"],
  padding: ["10px", "2em"],
  "padding-right": ["20px", "5%"],
  "border-radius": ["5px", "50%"],
  margin: ["5em", "auto"],
  "margin-left": ["10%", "1rem"],
  width: ["100px", "min-content"],
  height: ["50vh", "max-content"],
};

let suggestionsBox;

submitBtn.addEventListener("click", handleClick);
displayRulesBtn.addEventListener("click", toggleRules);
closeRulesBtn.addEventListener("click", toggleRules);

propertyInput.addEventListener("input", filterProperties);
valueInput.addEventListener("input", filterValues);

// Créer la boîte de suggestions dynamiquement
function createSuggestionBox() {
  suggestionsBox = document.createElement("div");
  suggestionsBox.classList.add("suggestion-box");
  suggestionsBox.style.position = "absolute";
  suggestionsBox.style.bottom = "100%"; // Le bas de la suggestion box sera au-dessus de l'input
  suggestionsBox.style.width = "80%"; // Prendre 80% de la largeur de l'input
  suggestionsBox.style.display = "none"; // Initialement cachée
  suggestionsBox.style.marginBottom = "-10px"; // Ajuster la distance avec l'input

  const inputContainer = document.querySelector(".input-container");
  inputContainer.appendChild(suggestionsBox);
}

function filterProperties() {
  const query = propertyInput.value.toLowerCase();
  const filteredProperties = Object.keys(properties).filter((property) =>
    property.includes(query)
  );

  updateSuggestions(filteredProperties);
}

function filterValues() {
  const propertyQuery = propertyInput.value.toLowerCase();
  const valueQuery = valueInput.value.toLowerCase();

  // Vérifier si une propriété valide est entrée avant de filtrer les valeurs
  if (properties[propertyQuery]) {
    const filteredValues = properties[propertyQuery].filter((value) =>
      value.toLowerCase().includes(valueQuery)
    );
    updateSuggestions(filteredValues, true);
  }
}

function updateSuggestions(items, isValues = false) {
  // Vider les suggestions existantes à chaque nouvelle entrée
  suggestionsBox.innerHTML = "";

  if (items.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  items.forEach((item) => {
    const suggestion = document.createElement("div");
    suggestion.classList.add("suggestion");
    suggestion.textContent = item;
    suggestion.addEventListener("click", () =>
      selectSuggestion(item, isValues)
    );
    suggestionsBox.appendChild(suggestion);
  });

  suggestionsBox.style.display = "block";
}

function selectSuggestion(item, isValues) {
  if (isValues) {
    valueInput.value = item;
  } else {
    propertyInput.value = item;
  }

  suggestionsBox.style.display = "none"; // Cacher les suggestions une fois qu'un élément est sélectionné
}

function checkPropertyValue(property, value) {
  const testElement = document.createElement("div");
  const previewBox = document.querySelector(".preview-box");

  try {
    testElement.style[property] = value;
    if (testElement.style[property] === value) {
      reset();

      // Appliquer un délai avant de modifier la propriété
      setTimeout(() => {
        previewBox.style[property] = value;
      }, 1000);
    } else {
      console.log("Valeur ou propriété non valide");
    }
  } catch (e) {
    console.error("Erreur lors de l'application de la propriété :", e);
  }
}

function reset() {
  const previewBox = document.querySelector(".preview-box");

  const defaultGradient = getComputedStyle(root)
    .getPropertyValue("--box-default-gradient")
    .trim();

  previewBox.style.background = defaultGradient;
  previewBox.style.margin = "0";
  previewBox.style.borderRadius = "0";
  previewBox.style.width = "200px";
  previewBox.style.height = "200px";
  previewBox.style.display = "flex";
  previewBox.style.fontSize = "1rem";
  previewBox.style.rotate = "0deg";
  previewBox.style.padding = "1rem";
  previewBox.style.color = "black";
  previewBox.style.fontWeight = "normal";
  previewBox.style.gap = "5px";
  previewBox.style.flexDirection = "column";
  previewBox.style.justifyContent = "flex-start";
  previewBox.style.fontWeight = "bold";

  // Cacher les messages d'erreur et de déjà fait lors du reset
  document.querySelector(".already-got-msg").style.display = "none";
  document.querySelector(".error-msg").style.display = "none";
}

function handleClick() {
  const propertyInputValue = propertyInput.value.trim().toLowerCase();
  const valueInputValue = valueInput.value.trim().toLowerCase();

  if (!propertyInputValue || !valueInputValue) {
    console.log("Veuillez entrer à la fois une propriété CSS et une valeur.");
    return;
  }

  checkPropertyValue(propertyInputValue, valueInputValue);
}

function toggleRules() {
  const rules = document.querySelector(".rules");
  rules.classList.toggle("active");
}

// Masquer la suggestion box si l'utilisateur clique en dehors de celle-ci
document.addEventListener("click", function (event) {
  const suggestionBox = document.querySelector(".suggestion-box");
  const isClickInsideSuggestionBox = suggestionBox.contains(event.target);
  const isClickInsideInput =
    propertyInput.contains(event.target) || valueInput.contains(event.target);

  if (!isClickInsideSuggestionBox && !isClickInsideInput) {
    suggestionsBox.style.display = "none"; // Masquer la suggestion box
  }
});

// Initialisation
createSuggestionBox(); // Créer la suggestion box une seule fois lors du chargement
