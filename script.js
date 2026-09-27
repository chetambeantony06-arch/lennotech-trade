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

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);

    message.textContent =
        "Account created successfully. Welcome, " + name + "!";

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}
