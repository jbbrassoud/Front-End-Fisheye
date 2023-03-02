function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// DOM Elements
const formData = document.querySelectorAll(".formData");

// Form
const form = document.getElementById('form')
const firstNameInput = document.querySelector('#first');
const lastNameInput = document.querySelector('#last');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const errorDisplayFirst = document.querySelector('.formErrorFirst');
const errorDisplayLast = document.querySelector('.formErrorLast');
const errorDisplayEmail = document.querySelector('.formErrorEmail');
const errorDisplayMessage = document.querySelector('.formErrorMessage');
const thanksCall = document.querySelector('.thanks');
// Récupération de tous les éléments de formulaire
const inputs = document.querySelectorAll("input");



//Verificateur

function verificator(){
  let ilYaUneErreur = false;

  if (firstNameInput.value.length >= 2){
    first.classList.remove("inputError");
    errorDisplayFirst.style.display = "none";
  } else {
    ilYaUneErreur = true;
    errorDisplayFirst.style.display = "block";
    first.classList.add("inputError");
  }
  if (lastNameInput.value.length >= 2){
    last.classList.remove("inputError");
    errorDisplayLast.style.display = "none";
  } else {
    ilYaUneErreur = true;
    errorDisplayLast.style.display = "block";
    last.classList.add("inputError");
  }
  //email - logique inversée car on cherche une erreur avec le Mismatch
  if (emailInput.validity.typeMismatch != true){
    email.classList.remove("inputError");
    errorDisplayEmail.style.display = "none";
  } else {
    ilYaUneErreur = true;
    errorDisplayEmail.style.display = "block";
    email.classList.add("inputError");
  }

  return ilYaUneErreur
}

// Validateur

function validate() {

  if(verificator()){
    console.log("Erreur validator")
  } else {
    console.log("La validation est bonne");
    return closeModal();
  }
}
