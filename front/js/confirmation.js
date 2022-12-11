// RECUPERATION DE L'ID ET AFFICHAGE DU NUM DE COMMANDE //
function confirmation() {
    let orderId = document.querySelector("#orderId");
    let UrlParam = new URL(location.href).searchParams.get("id");
    orderId.textContent = UrlParam;
}confirmation()