//Les variables
const baliseProduit = document.querySelector("section");

//la fonction
const arrayDisplay = () => {
  baliseProduit.innerHTML = arrayProduits
    // .slice(0,4)
    .map((produit) => {
      // const prixFormat = produit.prix.toLocaleString();
      return `
    <div class="container">
        <div class="img_produit">
            <img src="${produit.url}" alt="${produit.nomProduit}">
        </div>
        <div class="produit">
            <h3>${produit.nomProduit}</h3>
                <ul>
                <li>Nom du produit : ${produit.nomProduit}</li>
                <li>Description : ${produit.description}</li>
                <li>Prix : ${produit.prix.toLocaleString()} $</li>
                </ul>
            <button class="btnCommender" id="${
              produit.id
            }">voir le produit</button>
        </div>
    </div>
    `;
    })
    .join(" ");
};
arrayDisplay();

//l'évènement au click
const btn = document.querySelectorAll("button");
console.log(btn);
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    const idProduit = e.target.id;
    window.location.href = "./pages/produit.html?id=" + idProduit;
  });
});
