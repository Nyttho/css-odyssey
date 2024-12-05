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
  "justify-content": ["center", "end"],
  opacity: ["0", "1"],
  "align-items": ["start", "baseline"],
  "flex-direction": ["row", "row-reverse", "column-reverse"],
  "text-align": ["right", "justify"],
  scale: ["none", "2"],
  rotate: ["30deg", "1.57rad"],
  "font-weight": ["bold", "lighter"],
  "text-transform": ["capitalize", "lowercase"],
  visibility: ["hidden", "visible"],
};

let suggestionsBox;

submitBtn.addEventListener("click", handleClick);
displayRulesBtn.addEventListener("click", toggleRules);
closeRulesBtn.addEventListener("click", toggleRules);

propertyInput.addEventListener("input", filterProperties);
valueInput.addEventListener("input", filterValues);

function createSuggestionBox() {
  suggestionsBox = document.createElement("div");
  suggestionsBox.classList.add("suggestion-box");
  suggestionsBox.style.position = "absolute";
  suggestionsBox.style.bottom = "100%";
  suggestionsBox.style.width = "100%";
  suggestionsBox.style.display = "none";
  suggestionsBox.style.marginBottom = "-10px";

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

  if (properties[propertyQuery]) {
    const filteredValues = properties[propertyQuery].filter((value) =>
      value.toLowerCase().includes(valueQuery)
    );
    updateSuggestions(filteredValues, true);
  }
}

function updateSuggestions(items, isValues = false) {
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

  suggestionsBox.style.display = "none";
}

function checkPropertyValue(property, value) {
  const testElement = document.createElement("div");
  const previewBox = document.querySelector(".preview-box");
  const alreadyGotMsg = document.querySelector(".already-got-msg");
  const errorMsg = document.querySelector(".error-msg");
  const testTxt = document.querySelector(".test");

  alreadyGotMsg.style.display = "none";
  errorMsg.style.display = "none";

  try {
    testElement.style[property] = value;
    if (testElement.style[property] === value) {
      if (previewBox.style[property] === value) {
        alreadyGotMsg.style.display = "block";
        return;
      }

      reset();

      setTimeout(() => {
        if (property === "text-align") {
          testTxt.style[property] = value;
        } else {
          previewBox.style[property] = value;
        }
      }, 1000);
    } else {
      errorMsg.style.display = "block";
    }
  } catch (e) {
    console.error("Erreur lors de l'application de la propriété :", e);
    errorMsg.style.display = "block";
  }
}

function reset() {
  const previewBox = document.querySelector(".preview-box");
  const testTxt = document.querySelector(".test");

  testTxt.style.textAlign = "center";

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
  previewBox.style.textTransform = "capitalize";

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

document.addEventListener("click", function (event) {
  const suggestionBox = document.querySelector(".suggestion-box");
  const isClickInsideSuggestionBox = suggestionBox.contains(event.target);
  const isClickInsideInput =
    propertyInput.contains(event.target) || valueInput.contains(event.target);

  if (!isClickInsideSuggestionBox && !isClickInsideInput) {
    suggestionsBox.style.display = "none";
  }
});

createSuggestionBox();

//random neon glowing

const preview = document.querySelector(".preview-container");

function randomInterval(min, max) {
  return Math.random() * (max - min) + min;
}

function simulateNeonFatigue() {
  const fatigueDuration = randomInterval(100, 500);
  const fatigueInterval = randomInterval(5000, 20000);

  preview.style.boxShadow = "none";

  setTimeout(() => {
    preview.style.boxShadow = "";
    preview.style.animation = "neon-glow 3s infinite ease-in-out";
  }, fatigueDuration);

  setTimeout(simulateNeonFatigue, fatigueInterval);
}

setTimeout(simulateNeonFatigue, randomInterval(3000, 10000)); // Délai initial : entre 3 et 10 secondes
