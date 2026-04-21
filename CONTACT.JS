//-----DINAMYQUE DU FOMULAIRE-----//

const inputs = document.querySelectorAll(
  'input[type="text"],input[type= "email"], input[type= "tel"]',
);
const messageArea = document.getElementById("mess");
// console.log(inputs);
let namepseudo, surmane, email, tel, mess;

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
    namepseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay("name", "Le nom ne doit pas contenir de caractères spéciaux");
    namepseudo = null;
  } else {
    errorDisplay("name", "", true);
    namepseudo = value;
  }
};

const surnameChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errorDisplay("surname", "Le prénom doit faire entre 3 et 20 caractères");
    surmane = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errorDisplay(
      "surname",
      "Le prénom ne doit pas contenir de caractères spéciaux",
      (surmane = null),
    );
  } else {
    errorDisplay("surname", "", true);
    surmane = value;
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

const telChecker = (value) => {
  if (value.length !== 10 && value.length > 0) {
    errorDisplay("tel", "Le numéro de téléphone doit avoir 10 caractères");
    tel = null;
  } else if (!value.match(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)) {
    errorDisplay("tel", "Le numéro de téléphone doit avoir que des nombres");
    tel = null;
  } else {
    errorDisplay("tel", "", true);
    tel = value;
  }
};

messageArea.addEventListener("input", (e) => {
  mess = e.target.value;
});
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "name":
        nameChecker(e.target.value);
        break;
      case "surname":
        surnameChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "tel":
        telChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

//-----ENVOI DU FORMULAIRE--------//

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (namepseudo && surmane && email && tel && mess) {
    const data = {
      namepseudo,
      surmane,
      email,
      tel,
      mess,
    };

    console.log("Données prêtes :", data);

    try {
      const response = await fetch(e.target.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Votre message à été envoyé avec succès  !");

        inputs.forEach((input) => (input.value = ""));
        namepseudo = null;
        surmane = null;
        email = null;
        tel = null;
      } else {
        alert("Erreur lors de l'envoi au serveur.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Impossible de joindre le serveur.");
    }
  } else {
    alert("Veuillez remplir correctement tous les champs");
  }
});

//-------------------------------------------------------------------//
