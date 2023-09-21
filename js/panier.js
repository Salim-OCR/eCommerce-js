let dataBasket = JSON.parse(localStorage.getItem("panier")) || [];
console.log(dataBasket);

const displayBasket = document.querySelector("section");

//Afficher le prix total
let arrayPrixUnitaire = [];
const totalPriceBasked = () => {
  for (let i = 0; i < dataBasket.length; i++) {
    const element = dataBasket[i].prix;
    arrayPrixUnitaire.push(element);
  }

  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total = arrayPrixUnitaire.reduce(reducer);
  console.log(total);
  localStorage.setItem("total", JSON.stringify(total)); // Mettre à jour le localStorage
  console.log("data Total : " + JSON.stringify(total) + " $");
  return total;
};
// totalPriceBasked()
// Générer le HTML du panier
const generateBasketHTML = () => {
  const prixTotal = totalPriceBasked();
  return `
    <table border="1" width="50%" cellpadding="10">
        <caption>Panier : Tableau</caption> 
            <thead>
                <tr>
                    <th>Nom de l'article</th>
                    <th>Option choisie</th>
                    <th>Le prix en $</th>
                </tr>
            </thead>
            <tbody>
            ${dataBasket
              .map((data, index) => {
                return `
            <tr>
              <td>${data.nomProduit}</td>
              <td>${data.option}</td>
              <td>${data.prix.toLocaleString()} $</td>
              <td><button class="btn" data-id="${index}">supprimer</button></td>
            </tr>
          `;
              })
              .join("")}
    </tbody>
  </table>
  <br>
  <h3>Total du panier : ${prixTotal.toLocaleString()}  $</h3>
  <button id="clearBtn">Tout supprimer</button>
`;
};

//Condition d'affichafe de la page HTML du panier
if (dataBasket.length == []) {
  displayBasket.innerHTML = `<h3>Le panier est vide</h3>  <br>
  <span id="clearBtn"></span>`;
} else {
  // Afficher le panier initial
  displayBasket.innerHTML = generateBasketHTML();
}

// Gérer l'évènement de suppression d'un article
const btn = document.querySelectorAll(".btn");
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    let id = e.target.dataset.id;
    dataBasket.splice(id, 1); // Supprimer l'article du tableau
    localStorage.setItem("panier", JSON.stringify(dataBasket)); // Mettre à jour le localStorage
    localStorage.setItem("total", JSON.stringify([]));
    location.reload(); // Actualiser la page complète
  });
});
//Event clic clearBtn
clearBtn.addEventListener("click", () => {
  dataBasket = [];
  localStorage.clear();
  displayBasket.innerHTML = `<h3>Le panier est vide</h3>`;
  location.reload(); // Actualiser la page complète
});