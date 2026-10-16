
const display = document.getElementById("display");

function addValue(value) {
    if (display.value === "Error") {
        display.value = "";
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const expression = display.value;

    if (!expression) return;

    // Allow only calculator characters
    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = String(
                Number(result.toPrecision(12))
            );
        }
    } catch {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    if (/^[0-9.+\-*/%]$/.test(event.key)) {
        addValue(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
