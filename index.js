let previousValue = "";
let currentValue = "";
let operator = "";

document.addEventListener("DOMContentLoaded", function (e) {
  let clear = document.querySelector(".reset");
  let equal = document.querySelector(".equal");
  let dot = document.querySelector(".dot");
  let numbers = document.querySelectorAll(".number");
  let operators = document.querySelectorAll(".operator");
  let previousScreen = document.querySelector(".previous");
  let currentScreen = document.querySelector(".current");
  let delet = document.querySelector(".del");

  document.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key >= 0 && key <= 9) {
      currentValue += key;
      currentScreen.innerText = currentValue;
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      e.preventDefault();
      previousValue = operate(previousValue, currentValue, operator);
      operator = key;
      currentValue = "";
      previousScreen.innerText = previousValue + " " + operator;
      currentScreen.innerText = "";
    } else if (key === ".") {
      if (currentValue.includes(".")) return;
      currentValue += ".";
      currentScreen.innerText = currentValue;
    } else if (key === "Backspace") {
      currentValue = currentValue.split("");
      currentValue.pop();
      currentValue = currentValue.join("");
      currentScreen.innerText = currentValue;
    } else if (key === "Enter") {
      if (!currentValue) {
        return;
      }
      previousValue = operate(previousValue, currentValue, operator);
      currentScreen.innerText = previousValue;
      previousScreen.innerText = "";
      currentValue = previousValue;
      previousValue = "";
      operator = "";
    } else if (key === "Escape") {
      currentScreen.innerText = "";
      previousScreen.innerText = "";
      currentValue = "";
      previousValue = "";
      operator = "";
    }
  });
  numbers.forEach((number) =>
    number.addEventListener("click", function (e) {
      currentValue += e.target.textContent;
      currentScreen.innerText = currentValue;
    })
  );
  dot.addEventListener("click", function (e) {
    if (currentValue.includes(".")) return;
    currentValue += ".";
    currentScreen.innerText = currentValue;
  });

  operators.forEach((op) =>
    op.addEventListener("click", function (e) {
      previousValue = operate(previousValue, currentValue, operator);
      operator = e.target.textContent;
      currentValue = "";
      previousScreen.innerText = previousValue + " " + operator;
      currentScreen.innerText = "";
    })
  );

  delet.addEventListener("click", function (e) {
    currentValue = currentValue.split("");
    currentValue.pop();
    currentValue = currentValue.join("");
    console.log(currentValue);
    currentScreen.innerText = currentValue;
  });

  clear.addEventListener("click", function (e) {
    currentScreen.innerText = "";
    previousScreen.innerText = "";
    currentValue = "";
    previousValue = "";
    operator = "";
  });
  equal.addEventListener("click", function (e) {
    if (!currentValue) {
      return;
    }
    previousValue = operate(previousValue, currentValue, operator);
    currentScreen.innerText = previousValue;
    previousScreen.innerText = "";
    currentValue = previousValue;
    operator = "";
  });
});

function operate(firstValue, secondValue, operator) {
  firstValue = Number(firstValue);
  secondValue = Number(secondValue);

  if (operator === "+") {
    return firstValue + secondValue;
  } else if (operator === "-") {
    return firstValue - secondValue;
  } else if (operator === "*") {
    return firstValue * secondValue;
  } else if (operator === "/") {
    if (firstValue !== 0) {
      return firstValue / secondValue;
    }
  } else {
    return secondValue;
  }
}
