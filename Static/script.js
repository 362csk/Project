document.getElementById("login-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  // Clear error
  errorBox.textContent = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });

    const data = await response.json();

    if (data.status === "success") {
      // Hide login form, show dashboard
      document.querySelector(".form-panel").hidden = true;
      document.getElementById("dashboard").hidden = false;

      document.getElementById("greeting").textContent = "Hello, " + data.user.name;
      document.getElementById("user-email").textContent = data.user.email;

    } else {
      errorBox.textContent = data.message;
    }

  } catch (error) {
    errorBox.textContent = "Server error. Backend not running.";
  }
});

// LOGOUT
document.getElementById("signout").addEventListener("click", () => {
  document.getElementById("dashboard").hidden = true;
  document.querySelector(".form-panel").hidden = false;
});
