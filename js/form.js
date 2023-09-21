//FORMULAIRE DE VALIDATION
const form = document.querySelector("form"); // Sélectionnez le formulaire
const inputs = document.querySelectorAll(
  "input[type= 'text']",
  "input[type='number']"
);
//ANNONCER CHAQUES VARIABLE ID DES INPUTS SANS LEUR VALEURS
// let prenom, nom, ville, codePostal, email;

let formData = {};

//FONCTION POUR CHAQUES ERREURS DE INPUTS
const errorDisplay = (tag, message, valid) => {
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    span.textContent = message;
  } else {
    span.textContent = message;
  }
};

//FONCTION INPUTS INDEPENDANT + AVEC DES MSG DIFFERENT + REGEX DIFFERENT
const inputChecker = (value, tag, regex, errorMessage) => {
  if (!value.match(regex)) {
    errorDisplay(tag, errorMessage);
    return null;
  } else {
    errorDisplay(tag, "", true);
    return value;
  }
};

//FAIRE UN FOREACH POUR CHAQUE INPUTS + UN EVENEMENT + UN SWITCH
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "prenom":
        formData.prenom = inputChecker(
          e.target.value,
          "prenom",
          /^[a-zA-Z_.-]*$/,
          "Le champ ne doit pas contenir de caractères spéciaux"
        );
        break;
      case "nom":
        formData.nom = inputChecker(
          e.target.value,
          "nom",
          /^[a-zA-Z_.-]*$/,
          "Le champ ne doit pas contenir de caractères spéciaux"
        );
        break;
      case "ville":
        formData.ville = inputChecker(
          e.target.value,
          "ville",
          /^[a-zA-Z_.'-]*$/,
          "Le champ ne doit pas contenir de caractères spéciaux"
        );
        break;
      case "email":
        formData.email = inputChecker(
          e.target.value,
          "email",
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
          "Format d'email incorrect"
        );
        break;
      default:
        break;
    }
  });
});

//Event submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Stocker le formulaire dans le localStorage
  localStorage.setItem("formData", JSON.stringify(formData));

  // Vérifier si le formulaire et le panier ne sont pas vides
  formData = JSON.parse(localStorage.getItem("formData"));
  const cartData = JSON.parse(localStorage.getItem("panier"));
  const dataPrixTotal = JSON.parse(localStorage.getItem("total"));

  if (
    !formData ||
    !cartData ||
    Object.keys(formData).length === 0 ||
    cartData.length === 0
  ) {
    // Afficher un message d'erreur
    alert(
      "Le formulaire ou le panier est vide. Veuillez remplir tous les champs et ajouter des articles au panier."
    );
    return; // Arrêter l'exécution de la fonction
  }

  //Récupérer les datas du localStorage lors de l'envoi du formulaire
  const dataEnvoyer = {
    formData,
    cartData,
    dataPrixTotal,
  };

  //FETCH
  // FETCH
  const a = async () => {
    await fetch("https://restapi.fr/api/post", {
      method: "POST",
      body: JSON.stringify(dataEnvoyer),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const b = async () => {
    await a();
    await fetch("https://restapi.fr/api/post") // Utilisation de "/get" au lieu de "/set"
      .then((res) => res.json())
      .then((dataApi) => {
        console.log(dataApi);
        const idProduit = localStorage.setItem(
          "idProduit",
          JSON.stringify(dataApi)
        );
        console.log(idProduit);
      });
    // .then(() => location.load("https://restapi.fr/api/post"));
  };
  b();

  setTimeout(() => {
    alert(
      "Le formulaire a été envoyé avec succès. Vous allez être redirigé vers une page de confirmation."
    );
    //Supprimer
    fetch("https://restapi.fr/api/post", {
      method: "DELETE",
    }).then(() => location.load("https://restapi.fr/api/post"));
    localStorage.removeItem("formData");
    localStorage.removeItem("panier");
    localStorage.removeItem("total");
    location.href = "./confirm.html";
  }, 1000);
});
