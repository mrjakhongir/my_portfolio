const inputHex = document.getElementById("inputColor");
const sliderText = document.getElementById("sliderText")
const slider = document.getElementById("slider");
const hexColor = document.getElementById("hexColor");
const alteredColor = document.getElementById("alteredColor");
const alteredText = document.getElementById("alteredText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");


toggleBtn.addEventListener("click", ()=> {
    if(toggleBtn.classList.contains("toggled")) {
        toggleBtn.classList.remove("toggled");
        lightenText.classList.remove("unselected");
        darkenText.classList.add("unselected");
    } else {
        toggleBtn.classList.add("toggled");
        lightenText.classList.add("unselected");
        darkenText.classList.remove("unselected");  
    }
})

function isValidHex(hex) {
    if(!hex) return false;

    const color = hex.replace("#", "");
    return color.length === 3 || color.length ===6;
}

inputHex.addEventListener('keyup', () => {
    const hex = inputHex.value
    if(!hex) return;

    const color = hex.replace("#", "");
    return hexColor.style.backgroundColor = "#" + color
})

function convertToRgb(hex) {
    if(!isValidHex(hex)) return null;

    let color = hex.replace("#", "")

    if(color.length === 3) {
        color = color[0] + color[0] +color[1] +
        color[1] + color[2] + color[2]
    }

    const r = parseInt(color.substring(0,2), 16);
    const g = parseInt(color.substring(2,4), 16);
    const b = parseInt(color.substring(4,6), 16);

    return {r, g, b}
}

function convertToHex(r,g,b) {
    const rHex = ("0" + r.toString(16)).slice(-2)
    const gHex = ("0" + g.toString(16)).slice(-2)
    const bHex = ("0" + b.toString(16)).slice(-2)

    const newHex = "#" + rHex + gHex + bHex;

    return newHex;
}

function alterColor(hex, percentage) {
    const {r,g,b} = convertToRgb(hex);

    const amount = Math.floor(( percentage/100 ) * 255);

    const newR = increaseLimit(r, amount);
    const newG = increaseLimit(g, amount);
    const newB = increaseLimit(b, amount);

    return convertToHex(newR, newG, newB);
}

function increaseLimit(hex, amount) {
    return Math.min(255, Math.max(0, hex + amount));
}

slider.addEventListener("input", ()=> {
    if(!isValidHex(inputHex.value)) return;

    sliderText.textContent = slider.value + "%";

    const valueAddition = toggleBtn.classList.contains("toggled") ? -slider.value : slider.value

    const alteredHex = alterColor(inputHex.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredText.textContent = alteredHex;
})