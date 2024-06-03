const cricketers = [
    { name: "Sachin Tendulkar", runs: 18426, wickets: 154, strikeRate: 86.23, country: "India" },
    { name: "Virat Kohli", runs: 12040, wickets: 4, strikeRate: 93.17, country: "India" },
    { name: "Rohit Sharma", runs: 9205, wickets: 8, strikeRate: 88.90, country: "India" },
    { name: "MS Dhoni", runs: 10773, wickets: 1, strikeRate: 87.56, country: "India" },
    { name: "Shakib Al Hasan", runs: 6764, wickets: 277, strikeRate: 82.15, country: "Bangladesh" },
    { name: "Tamim Iqbal", runs: 7666, wickets: 0, strikeRate: 78.56, country: "Bangladesh" },
    { name: "Mushfiqur Rahim", runs: 6607, wickets: 0, strikeRate: 79.13, country: "Bangladesh" },
    { name: "Mashrafe Mortaza", runs: 1786, wickets: 270, strikeRate: 87.40, country: "Bangladesh" },
    { name: "Imran Khan", runs: 3709, wickets: 182, strikeRate: 72.65, country: "Pakistan" },
    { name: "Wasim Akram", runs: 3717, wickets: 502, strikeRate: 88.33, country: "Pakistan" },
    { name: "Inzamam-ul-Haq", runs: 11739, wickets: 3, strikeRate: 74.24, country: "Pakistan" },
    { name: "Shahid Afridi", runs: 8064, wickets: 395, strikeRate: 117.00, country: "Pakistan" },
    { name: "Brian Lara", runs: 10405, wickets: 4, strikeRate: 79.51, country: "West Indies" },
    { name: "Chris Gayle", runs: 10480, wickets: 167, strikeRate: 87.19, country: "West Indies" },
    { name: "Jacques Kallis", runs: 11579, wickets: 273, strikeRate: 72.89, country: "South Africa" },
    { name: "AB de Villiers", runs: 9577, wickets: 7, strikeRate: 101.09, country: "South Africa" },
    { name: "Ricky Ponting", runs: 13704, wickets: 3, strikeRate: 80.39, country: "Australia" },
    { name: "Steve Smith", runs: 4378, wickets: 28, strikeRate: 88.57, country: "Australia" },
    { name: "Glenn Maxwell", runs: 2877, wickets: 60, strikeRate: 125.43, country: "Australia" },
    { name: "Joe Root", runs: 6207, wickets: 27, strikeRate: 86.91, country: "England" },
    { name: "Ben Stokes", runs: 2871, wickets: 74, strikeRate: 95.08, country: "England" },
    { name: "Eoin Morgan", runs: 7701, wickets: 0, strikeRate: 93.89, country: "England" },
    { name: "Lasith Malinga", runs: 567, wickets: 338, strikeRate: 84.93, country: "Sri Lanka" },
    { name: "Kumar Sangakkara", runs: 14234, wickets: 0, strikeRate: 78.86, country: "Sri Lanka" },
    { name: "Sanath Jayasuriya", runs: 13430, wickets: 323, strikeRate: 91.20, country: "Sri Lanka" },
    { name: "Brendon McCullum", runs: 6083, wickets: 0, strikeRate: 96.37, country: "New Zealand" },
    { name: "Kane Williamson", runs: 6173, wickets: 37, strikeRate: 81.75, country: "New Zealand" },
    { name: "Ross Taylor", runs: 8581, wickets: 3, strikeRate: 83.59, country: "New Zealand" },
    { name: "Hashim Amla", runs: 8113, wickets: 0, strikeRate: 88.39, country: "South Africa" },
    { name: "Faf du Plessis", runs: 5507, wickets: 0, strikeRate: 88.57, country: "South Africa" },
    { name: "David Warner", runs: 5353, wickets: 0, strikeRate: 95.76, country: "Australia" },
    { name: "Marnus Labuschagne", runs: 469, wickets: 2, strikeRate: 92.19, country: "Australia" }
];

let attempts = 0;
let dailyCricketer = getDailyCricketer();

function getDailyCricketer() {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('storedDate');
    if (storedDate !== today) {
        const cricketer = cricketers[Math.floor(Math.random() * cricketers.length)];
        localStorage.setItem('dailyCricketer', JSON.stringify(cricketer));
        localStorage.setItem('storedDate', today);
        return cricketer;
    }
    return JSON.parse(localStorage.getItem('dailyCricketer'));
}

function showSuggestions() {
    const guessInput = document.getElementById('guess').value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    if (guessInput) {
        const suggestions = cricketers
            .filter(cricketer => cricketer.name.toLowerCase().includes(guessInput))
            .map(cricketer => `<div class="collection-item" onclick="selectSuggestion('${cricketer.name}')">${cricketer.name}</div>`)
            .join('');

        suggestionsContainer.innerHTML = suggestions;
    }
}

function selectSuggestion(name) {
    document.getElementById('guess').value = name;
    document.getElementById('suggestions').innerHTML = '';
}

function checkGuess() {
    const guessInput = document.getElementById('guess').value;
    const feedbackList = document.getElementById('feedback-list');
    const resultContainer = document.getElementById('result');
    const restartButton = document.getElementById('restart-button');
    const comeBackMessage = document.getElementById('come-back-message');
    const submitButton = document.getElementById('submit-button');
    const guessInputField = document.getElementById('guess');

    if (attempts < 10) {
        attempts++;
        document.getElementById('attempts').textContent = attempts;

        if (guessInput.toLowerCase() === dailyCricketer.name.toLowerCase()) {
            resultContainer.textContent = 'Congratulations! You guessed the correct cricketer!';
            submitButton.disabled = true;
            guessInputField.disabled = true;
            comeBackMessage.classList.remove('hidden');
            restartButton.style.display = 'block';
            return;
        } else {
            const feedbackItem = document.createElement('li');
            feedbackItem.className = 'collection-item';

            if (guessInput.toLowerCase() < dailyCricketer.name.toLowerCase()) {
                feedbackItem.textContent = `${guessInput} is alphabetically before the correct name.`;
            } else {
                feedbackItem.textContent = `${guessInput} is alphabetically after the correct name.`;
            }

            feedbackList.appendChild(feedbackItem);
        }

        if (attempts === 10) {
            resultContainer.textContent = `Game Over! The correct cricketer was ${dailyCricketer.name}.`;
            submitButton.disabled = true;
            guessInputField.disabled = true;
            comeBackMessage.classList.remove('hidden');
            restartButton.style.display = 'block';
        }
    }
}

function restartGame() {
    location.reload();
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('attempts').textContent = attempts;
    document.getElementById('restart-button').style.display = 'none';
});
