const urlParams = new URLSearchParams(window.location.search);
const selectedProductId = urlParams.get("id");
console.log(selectedProductId);

const produitDisplay = arrayProduits.find(
  (item) => item.id === selectedProductId
);
console.log(produitDisplay);
const section = document.querySelector("section");

const store = (data) => {
  let dataBasket = JSON.parse(localStorage.getItem("panier")) || [];
  dataBasket.push(data);
  localStorage.setItem("panier", JSON.stringify(dataBasket));
};

const generateOptions = () => {
  return produitDisplay.options
    .map((option, index) => {
      return `<option value="${index + 1}">${option}</option>`;
    })
    .join("");
};

section.innerHTML = `
<div class="container">
    <div class="img_produit">
        <img src="${produitDisplay.url}" alt="${produitDisplay.nomProduit}">
    </div>
    <div class="produit">
        <h3>${produitDisplay.nomProduit}</h3>
        <ul>
            <li>Nom du produit: ${produitDisplay.nomProduit}</li>
            <li>Description: ${produitDisplay.description}</li>
            <li>Prix: ${produitDisplay.prix.toLocaleString()} $</li>
        </ul>
        <form>
            <label for="options">Choisis ton option</label>
            <select name="options" id="options">${generateOptions()}</select>
        </form> <br>
        <input type="submit" value="Panier" id="btn">
    </div>
</div>
`;

const btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  const options = document.getElementById("options");
  const selectedOption = options.value;

  const data = {
    id: produitDisplay.id,
    nomProduit: produitDisplay.nomProduit,
    option: selectedOption,
    prix: produitDisplay.prix,
  };

  console.log(data);
  store(data);

  // Affichage d'un message à l'utilisateur avec le choix de continuer ou aller au panier
  const confirmation = confirm(
    "Produit ajouté au panier. Souhaitez-vous ajouter un autre article ?"
  );

  if (confirmation) {
    // Redirection vers la page précédente pour ajouter un autre article
    window.history.back();
  } else {
    // Redirection vers la page du panier
    window.location.href = "panier.html";
  }
});
