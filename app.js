function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === "dark" ? "" : "dark";
}

function generateRandomPassword() {
    const length = 16;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = Array.from(crypto.getRandomValues(new Uint8Array(length)), x => chars[x % chars.length]).join('');
    document.getElementById("randomPassword").innerText = password;
}

async function generateHash() {
    const password = document.getElementById("passwordInput").value;
    if (!password.trim()) {
        alert("Please enter a password!");
        return;
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashHex = Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
    document.getElementById("hashedPassword").innerText = hashHex;
    localStorage.setItem("savedHash", JSON.stringify({ hash: hashHex, password: password }));
}

function crackHash() {
    const inputHash = document.getElementById("hashInput").value.trim();
    const savedData = JSON.parse(localStorage.getItem("savedHash"));
    if (savedData && inputHash === savedData.hash) {
        document.getElementById("crackedPassword").innerText = "Cracked Password: " + savedData.password;
    } else {
        document.getElementById("crackedPassword").innerText = "Password Not Found in Dictionary";
    }
}

function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard!");
    });
}