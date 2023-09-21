console.log("fichier js confirm");
const section = document.querySelector("section");
const backMenu = document.getElementById("back");
const apiStore = JSON.parse(localStorage.getItem("idProduit"));
console.log(apiStore);

section.innerHTML = `
    <h3>Numéro de confirmation : ${apiStore._id}</h3>
    <ul>
        <li>Le prix total : ${apiStore.dataPrixTotal} $</li>
        <li>La date : ${apiStore.createdAt}</li>
        <li></li>
    </ul>

`;

//event click
backMenu.addEventListener("click", () => {
  console.log("test");
  localStorage.removeItem("idProduit");
  localStorage.clear();
  section.innerHTML = "";
  location.href = "../index.html";
});
