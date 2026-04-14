const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]',
);

// Initialisation des variables pour le contrôle final
let pseudo, email, password, confirmPass;

const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};

const nameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("name", "Le nom doit faire entre 3 et 20 caractères");
    pseudo = null; // Changé de name à pseudo
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("name", "Le nom ne doit pas contenir de caractères spéciaux");
    pseudo = null;
  } else {
    errorDisplay("name", "", true);
    pseudo = value;
  }
};

const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "Le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const passwordChecker = (value) => {
  // Retrait de la ligne progressBar
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
    )
  ) {
    errorDisplay(
      "password",
      "Minimum 8 caractères, une majuscule, un chiffre et un spécial",
    );
    password = null;
  } else {
    errorDisplay("password", "", true);
    password = value;
  }
  if (confirmPass) confirmChecker(confirmPass);
};

const confirmChecker = (value) => {
  if (value !== password || value === "") {
    errorDisplay("confirm", "Les mots de passe ne correspondent pas");
    confirmPass = false;
  } else {
    errorDisplay("confirm", "", true);
    confirmPass = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "name":
        nameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      case "confirm":
        confirmChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pseudo && email && password && confirmPass) {
    const data = { pseudo, email, password };
    console.log(data);

    inputs.forEach((input) => (input.value = ""));

    pseudo = null;
    email = null;
    password = null;
    confirmPass = null;
    alert("Inscription validée !");
  } else {
    alert("Veuillez remplir correctement les champs");
  }
});
