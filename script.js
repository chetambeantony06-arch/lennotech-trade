function showLogin() {
document.getElementById("login").style.display = "block";

document.getElementById("login").scrollIntoView({
    behavior: "smooth"
});

}

function registerUser() {
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message");

if (name === "" || email === "") {
    message.textContent = "Please enter your name and email.";
    return;
}

// Save user information
localStorage.setItem("userName", name);
localStorage.setItem("userEmail", email);

// Create starting account data
if (localStorage.getItem("balance") === null) {
    localStorage.setItem("balance", "0");
}

if (localStorage.getItem("rewards") === null) {
    localStorage.setItem("rewards", "0");
}

if (localStorage.getItem("completedSurveys") === null) {
    localStorage.setItem("completedSurveys", "0");
}

if (localStorage.getItem("activity") === null) {
    localStorage.setItem("activity", JSON.stringify([]));
}

// Show dashboard
document.getElementById("login").style.display = "none";
document.getElementById("home").style.display = "none";
document.getElementById("dashboard").style.display = "block";

loadDashboard();

document.getElementById("dashboard").scrollIntoView({
    behavior: "smooth"
});

}

function loadDashboard() {
const name = localStorage.getItem("userName");

const balance = Number(localStorage.getItem("balance")) || 0;
const rewards = Number(localStorage.getItem("rewards")) || 0;
const completed = Number(localStorage.getItem("completedSurveys")) || 0;

document.getElementById("userName").textContent = name || "User";
document.getElementById("balance").textContent = balance;
document.getElementById("rewards").textContent = rewards;
document.getElementById("completedSurveys").textContent = completed;

// Number of currently available surveys
document.getElementById("surveyCount").textContent = "2";

loadActivity();

}

function completeSurvey(amount) {

const currentBalance =
    Number(localStorage.getItem("balance")) || 0;

const currentRewards =
    Number(localStorage.getItem("rewards")) || 0;

const completed =
    Number(localStorage.getItem("completedSurveys")) || 0;

const newBalance = currentBalance + amount;
const newRewards = currentRewards + amount;
const newCompleted = completed + 1;

localStorage.setItem("balance", newBalance);
localStorage.setItem("rewards", newRewards);
localStorage.setItem("completedSurveys", newCompleted);

// Add activity
let activity =
    JSON.parse(localStorage.getItem("activity")) || [];

const newActivity = {
    text: "Completed a survey",
    amount: amount,
    date: new Date().toLocaleString()
};

activity.unshift(newActivity);

localStorage.setItem(
    "activity",
    JSON.stringify(activity)
);

alert(
    "Survey completed! You earned KSh " +
    amount +
    "."
);

loadDashboard();

}

function loadActivity() {

const activityList =
    document.getElementById("activityList");

let activity =
    JSON.parse(localStorage.getItem("activity")) || [];

if (activity.length === 0) {
    activityList.innerHTML =
        "<p>No activity yet.</p>";
    return;
}

activityList.innerHTML = "";

activity.slice(0, 10).forEach(function(item) {

    const div = document.createElement("div");

    div.className = "activity-item";

    div.innerHTML =
        "<strong>" +
        item.text +
        "</strong>" +
        "<br>" +
        "<span>+ KSh " +
        item.amount +
        "</span>" +
        "<br>" +
        "<small>" +
        item.date +
        "</small>";

    activityList.appendChild(div);
});

}

function showWithdrawal() {

document.getElementById("withdrawal").style.display =
    "block";

document.getElementById("withdrawal").scrollIntoView({
    behavior: "smooth"
});

}

function hideWithdrawal() {

document.getElementById("withdrawal").style.display =
    "none";

}

function requestWithdrawal() {

const number =
    document.getElementById("mpesaNumber").value.trim();

const amount =
    Number(document.getElementById("withdrawAmount").value);

const balance =
    Number(localStorage.getItem("balance")) || 0;

const message =
    document.getElementById("withdrawMessage");


if (number === "" || amount <= 0) {

    message.textContent =
        "Please enter a valid M-Pesa number and amount.";

    return;
}


if (amount > balance) {

    message.textContent =
        "Insufficient balance.";

    return;
}


message.textContent =
    "Withdrawal request received. This is currently a demo.";

// Demo only — no real M-Pesa transaction happens yet.

}

function logoutUser() {

document.getElementById("dashboard").style.display =
    "none";

document.getElementById("home").style.display =
    "block";

window.scrollTo({
    top: 0,
    behavior: "smooth"
});

}

// Automatically open dashboard if user is already registered
window.addEventListener("DOMContentLoaded", function() {

const savedName =
    localStorage.getItem("userName");

if (savedName) {

    document.getElementById("home").style.display =
        "none";

    document.getElementById("login").style.display =
        "none";

    document.getElementById("dashboard").style.display =
        "block";

    loadDashboard();
}

});
