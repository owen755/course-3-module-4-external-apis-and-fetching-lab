// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.querySelector("#state-input");
const fetchButton = document.querySelector("#fetch-alerts");
const alertsDisplay = document.querySelector("#alerts-display");
const errorMessage = document.querySelector("#error-message");

fetchButton.addEventListener("click", async () => {
    const state = stateInput.value.trim().toUpperCase();

    // TEST 3: Clear the input field
    stateInput.value = "";

    // TEST 5 FIX: Hide the error message AND completely erase its text content
    errorMessage.classList.add("hidden");
    errorMessage.textContent = ""; 
    
    alertsDisplay.innerHTML = "";

    if (!state) return;

    try {
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);
        
        if (!response.ok) {
            throw new Error("network issue");
        }

        const data = await response.json();
        const alerts = data.features;

        const summary = document.createElement("h2");
        summary.textContent = `Weather Alerts: ${alerts.length}`;
        alertsDisplay.appendChild(summary);

        alerts.forEach(alert => {
            const p = document.createElement("p");
            p.textContent = alert.properties.headline || alert.properties.event || alert.properties.description;
            alertsDisplay.appendChild(p);
        });

    } catch (error) {
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = error.message;
    }
});