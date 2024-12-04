const propertyInput = document.querySelector(".property-input");
const valueInput = document.querySelector(".value-input");
const submitBtn = document.querySelector("#submit-btn");
const displayRulesBtn = document.querySelector(".display-rules-btn");
const closeRulesBtn = document.querySelector(".close-rules-X");
const root = document.documentElement;

submitBtn.addEventListener("click", handleClick);
displayRulesBtn.addEventListener("click", toggleRules);
closeRulesBtn.addEventListener("click", toggleRules);

function checkPropertyValue(property, value) {
  const testElement = document.createElement("div");
  const previewBox = document.querySelector(".preview-box");

  try {
    testElement.style[property] = value;
    if (testElement.style[property] === value) {
      reset();
      setTimeout(() => {
        previewBox.style[property] = value;
      }, 1000);
    } else {
      console.log("Invalid value or property");
    }
  } catch (e) {
    console.error("Error applying style:", e);
  }
}

function reset() {
  const previewBox = document.querySelector(".preview-box");

  const defaultBoxColor = getComputedStyle(root)
    .getPropertyValue("--box-default-color")
    .trim();

  previewBox.style.backgroundColor = defaultBoxColor || "white";
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
  previewBox.style.display = "flex";
  previewBox.style.flexDirection = "column";
  previewBox.style.justifyContent = "flex-start";
}

function handleClick() {
  const propertyInputValue = propertyInput.value.trim().toLowerCase();
  const valueInputValue = valueInput.value.trim().toLowerCase();

  if (!propertyInputValue || !valueInputValue) {
    console.log("Please enter both a CSS property and a value.");
    return;
  }

  checkPropertyValue(propertyInputValue, valueInputValue);
}

function toggleRules() {
  const rules = document.querySelector(".rules");
  rules.classList.toggle("active");
}
