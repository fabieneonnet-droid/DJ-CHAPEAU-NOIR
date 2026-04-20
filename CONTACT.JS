//-----DINAMYQUE DU FOMULAIRE-----//

const inputs = document.querySelectorAll(
  'input[type="text"],input[type= "email"], input[type= "tel"]',
);
// console.log(inputs);
let namepseudo, surmane, email, tel;

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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  nameChecker(document.getElementById("name").value);
  surnameChecker(document.getElementById("surname").value);
  emailChecker(document.getElementById("email").value);
  telChecker(document.getElementById("tel").value);

  if (nom && surname && email && tel) {
    const data = new FormData(e.target);

    try {
      const response = await fetch(e.target.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Merci ! Votre message a été envoyé.");
        form.reset();
        nom = surname = email = tel = null;
      } else {
        alert(
          "Erreur serveur : Vérifiez que votre e-mail est confirmé sur Formspree.",
        );
      }
    } catch (error) {
      alert("Oups ! Un problème réseau est survenu.");
    }
  } else {
    alert("Veuillez remplir correctement les champs avant d'envoyer.");
  }
});
const data = {
  name: nom,
  surname: surname,
  email: email,
  tel: tel,
};
//-------------------------------------------------------------------//
