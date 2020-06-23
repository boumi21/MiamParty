/*
  Fichier qui stock toutes les erreurs possibles dans les formulaires
*/

import regex from "@/assistant/Regex.js";
import Regex from "./Regex";

// Affiche l'erreur
function setError(input, err, message) {
  input.classList.add("is-invalid");
  err.classList.add("text-danger");
  err.innerText = message;

  return false;
}

// N'affiche plus l'erreur
function resetError(input, err) {
  input.classList.remove("is-invalid");
  err.classList.remove("text-danger");
  err.innerText = "";
}

//************************************************ */

// Valide le login
function validateSignIn(document, form) {
  let validate = true;

  /** Check email */

  let err = document.getElementById("error-email");
  let input = document.getElementById("input-email");
  let elt = form.email;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexEmail(elt)) {
    validate = setError(
      input,
      err,
      "Le format de l'adresse email n'est pas valide."
    );
  } else {
    resetError(input, err);
  }

  /** Check password */

  err = document.getElementById("error-password");
  input = document.getElementById("input-password");
  elt = form.password;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexPassword(elt)) {
    validate = setError(
      input,
      err,
      "Le mot de passe doit comprendre 6 caractères ou plus."
    );
  } else {
    resetError(input, err);
  }

  return validate;
}

//************************************************ */

// Valide l'inscription particulier
function validateSignUpPart(document, form) {
  let validate = true;

  /** Check firstname */

  let err = document.getElementById("error-firstname");
  let input = document.getElementById("input-firstname");
  let elt = form.firstname;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (elt.charAt(0) != elt.charAt(0).toUpperCase()) {
    validate = setError(
      input,
      err,
      "Le prénom doit commencer par une majuscule."
    );
  } else if (!regex.regexName(elt)) {
    validate = setError(input, err, "Vous devez saisir un prénom valide.");
  } else {
    resetError(input, err);
  }

  /** Check lastname */

  err = document.getElementById("error-lastname");
  input = document.getElementById("input-lastname");
  elt = form.lastname;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (elt.charAt(0) != elt.charAt(0).toUpperCase()) {
    validate = setError(input, err, "Le nom doit commencer par une majuscule.");
  } else if (!regex.regexName(elt)) {
    validate = setError(input, err, "Vous devez saisir un nom valide.");
  } else {
    resetError(input, err);
  }

  /** Check email */

  err = document.getElementById("error-email");
  input = document.getElementById("input-email");
  elt = form.email;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexEmail(elt)) {
    validate = setError(
      input,
      err,
      "Vous devez saisir une adresse email valide."
    );
  } else {
    resetError(input, err);
  }

  /** Check password */

  err = document.getElementById("error-password");
  input = document.getElementById("input-password");
  elt = form.password;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexPassword(elt)) {
    validate = setError(
      input,
      err,
      "Le mot de passe doit comprendre 6 caractères ou plus."
    );
  } else if (form.confirmPassword.length == 0) {
    err = document.getElementById("error-confirm-password");
    input = document.getElementById("input-confirm-password");
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (elt != form.confirmPassword) {
    err = document.getElementById("error-confirm-password");
    input = document.getElementById("input-confirm-password");
    validate = setError(input, err, "Les mots de passe ne correspondent pas.");
  } else {
    err = document.getElementById("error-password");
    input = document.getElementById("input-password");
    resetError(input, err);
    err = document.getElementById("error-confirm-password");
    input = document.getElementById("input-confirm-password");
    resetError(input, err);
  }

  /** Cooking level */

  err = document.getElementById("error-level");
  input = document.getElementById("input-level");
  elt = form.level;

  if (elt == null) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else {
    resetError(input, err);
  }

  /** Check birth */

  err = document.getElementById("error-birth");
  input = document.getElementById("input-birth");
  elt = form.birth;
  let today = new Date();
  let year = today.getFullYear();

  if (elt == null) {
    validate = setError(input, err, "Ce champ est obligatoire");
  } else if (
    parseInt(elt.substring(0, elt.indexOf("-", 1) + 1)) < 1900 ||
    parseInt(elt.substring(0, elt.indexOf("-", 1) + 1)) > year
  ) {
    console.log("date invalide");
    console.log(parseInt(elt.substring(0, elt.indexOf("-", 1) + 1)));
    validate = setError(input, err, "Vous devez saisir une date valide.");
  } else {
    resetError(input, err);
  }

  return validate;
}

//************************************************ */

// Valide l'inscription pro
function validateSignUpPro(document, form) {
  let validate = true;

  /** Check firstname */

  let err = document.getElementById("error-name");
  let input = document.getElementById("input-name");
  let elt = form.name;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else {
    resetError(input, err);
  }

  /** Check email */

  err = document.getElementById("error-email");
  input = document.getElementById("input-email");
  elt = form.email;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexEmail(elt)) {
    validate = setError(
      input,
      err,
      "Vous devez saisir une adresse email valide."
    );
  } else {
    resetError(input, err);
  }

  /** Check password */

  err = document.getElementById("error-password");
  input = document.getElementById("input-password");
  elt = form.password;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexPassword(elt)) {
    validate = setError(
      input,
      err,
      "Le mot de passe doit comprendre 6 caractères ou plus."
    );
  } else if (form.confirmPassword.length == 0) {
    err = document.getElementById("error-confirm-password");
    input = document.getElementById("input-confirm-password");
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (elt != form.confirmPassword) {
    err = document.getElementById("error-confirm-password");
    input = document.getElementById("input-confirm-password");
    validate = setError(input, err, "Les mots de passe ne correspondent pas.");
  } else {
    err = document.getElementById("error-password");
    input = document.getElementById("input-password");
    resetError(input, err);
    err = document.getElementById("error-confirm-password");
    input = document.getElementById("input-confirm-password");
    resetError(input, err);
  }

  return validate;
}

/************************************************************************* */

// Valide la création d'une soirée
function validateCreatePart(document, form) {
  let validate = true;

  /** Check party name */

  let err = document.getElementById("error-name");
  let input = document.getElementById("input-name");
  let elt = form.name;

  if (elt.trim().length <= 4) {
    validate = setError(
      input,
      err,
      "Votre nom de soirée doit faire plus de 4 caractères."
    );
  } else {
    validate = resetError(input, err);
  }

  /** Check date */

  err = document.getElementById("error-date");
  input = document.getElementById("input-date");
  elt = form.date;

  if (elt.length == 0 || elt == null) {
    validate = setError(
      input,
      err,
      "Veuillez choisir une date pour votre soirée."
    );
  } else {
    validate = resetError(input, err);
  }

  /** Check price */

  err = document.getElementById("error-price");
  input = document.getElementById("input-price");
  elt = form.price;

  if (elt === null || elt === "") {
    console.log("ah bon");
    validate = setError(
      input,
      err,
      "Veuillez choisir un prix pour votre soirée."
    );
  } else {
    validate = resetError(input, err);
  }

  /** Check nb address */

  err = document.getElementById("error-nbAddress");
  input = document.getElementById("input-nbAddress");
  elt = form.nbAddress;

  if (elt == null) {
    validate = setError(input, err, "Veuillez choisir un numméro de rue.");
  } else {
    validate = resetError(input, err);
  }

  /** Check street */

  err = document.getElementById("error-street");
  input = document.getElementById("input-street");
  elt = form.street;

  if (elt == null || elt.trim() == "") {
    validate = setError(input, err, "Veuillez choisir une rue.");
  } else {
    validate = resetError(input, err);
  }

  /** Check city */

  err = document.getElementById("error-city");
  input = document.getElementById("input-city");
  elt = form.city;

  if (elt == null || elt.trim() == "") {
    validate = setError(input, err, "Veuillez choisir une ville.");
  } else {
    validate = resetError(input, err);
  }

  /** Check postal code */

  err = document.getElementById("error-postCode");
  input = document.getElementById("input-postCode");
  elt = form.postCode;

  if (elt == null) {
    validate = setError(input, err, "Veuillez choisir un code postal.");
  } else {
    validate = resetError(input, err);
  }

  return validate;
}

/************************************************************************* */

// Valide la mise à jour des informations d'un particulier
function validateUpdatePart(document, form) {
  let validate = true;

  /** Check firstname */

  let err = document.getElementById("error-firstname");
  let input = document.getElementById("input-firstname");
  let elt = form.firstname;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (elt.charAt(0) != elt.charAt(0).toUpperCase()) {
    validate = setError(
      input,
      err,
      "Le prénom doit commencer par une majuscule."
    );
  } else if (!regex.regexName(elt)) {
    validate = setError(input, err, "Vous devez saisir un prénom valide.");
  } else {
    resetError(input, err);
  }

  /** Check lastname */

  err = document.getElementById("error-lastname");
  input = document.getElementById("input-lastname");
  elt = form.lastname;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (elt.charAt(0) != elt.charAt(0).toUpperCase()) {
    validate = setError(input, err, "Le nom doit commencer par une majuscule.");
  } else if (!regex.regexName(elt)) {
    validate = setError(input, err, "Vous devez saisir un nom valide.");
  } else {
    resetError(input, err);
  }

  /** Check email */

  err = document.getElementById("error-email");
  input = document.getElementById("input-email");
  elt = form.email;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexEmail(elt)) {
    validate = setError(
      input,
      err,
      "Vous devez saisir une adresse email valide."
    );
  } else {
    resetError(input, err);
  }

  /** Check password */
  if (form.password != null) {
    err = document.getElementById("error-password");
    input = document.getElementById("input-password");
    elt = form.password;

    if (!regex.regexPassword(elt)) {
      validate = setError(
        input,
        err,
        "Le mot de passe doit comprendre 6 caractères ou plus."
      );
    } else if (form.confirmPassword.length == 0) {
      err = document.getElementById("error-confirm-password");
      input = document.getElementById("input-confirm-password");
      validate = setError(input, err, "Ce champ est obligatoire.");
    } else if (elt != form.confirmPassword) {
      err = document.getElementById("error-confirm-password");
      input = document.getElementById("input-confirm-password");
      validate = setError(
        input,
        err,
        "Les mots de passe ne correspondent pas."
      );
    } else if (
      form.actualPassword.length == 0 ||
      !regex.regexPassword(form.actualPassword)
    ) {
      err = document.getElementById("error-actual-password");
      input = document.getElementById("input-actual-password");
      validate = setError(input, err, "Le mot de passe actuel est incorrect.");
    } else {
      err = document.getElementById("error-password");
      input = document.getElementById("input-password");
      resetError(input, err);
      err = document.getElementById("error-confirm-password");
      input = document.getElementById("input-confirm-password");
      resetError(input, err);
      err = document.getElementById("error-actual-password");
      input = document.getElementById("input-actual-password");
      resetError(input, err);
    }
  }

  /** Cooking level */

  err = document.getElementById("error-level");
  input = document.getElementById("input-level");
  elt = form.level;

  if (elt == null) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else {
    resetError(input, err);
  }

  /** Check address */

  err = document.getElementById("error-nb-address");
  input = document.getElementById("input-nb-address");
  elt = form.nbAddress;

  if (elt != null && elt <= 0) {
    validate = setError(input, err, "Numéro invalide");
  } else {
    resetError(input, err);
  }

  err = document.getElementById("error-city");
  input = document.getElementById("input-city");
  elt = form.city;

  if (!Regex.regexAddress(elt)) {
    validate = setError("input, err, Vous devez saisir un nom de ville valide");
  } else {
    resetError(input, err);
  }

  err = document.getElementById("error-postal-code");
  input = document.getElementById("input-postal-code");
  elt = form.postalCode;

  if (elt != null && elt.length != 5) {
    validate = setError(input, err, "Vous devez saisir un code postal valide");
  } else if (elt != null && elt <= 0) {
    validate = setError(input, err, "Vous devez saisir un code postal valide");
  } else {
    resetError(input, err);
  }

  err = document.getElementById("error-country");
  input = document.getElementById("input-country");
  elt = form.country;

  if (!Regex.regexAddress(form.country)) {
    validate = setError(input, err, "Vous devez saisir un nom valide");
  } else {
    resetError(input, err);
  }

  return validate;
}

/************************************************************************* */

// Valide la mise à jour des informations d'un pro
function validateUpdatePro(document, form) {
  let validate = true;

  /** Check name */

  let err = document.getElementById("error-name");
  let input = document.getElementById("input-name");
  let elt = form.name;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else {
    resetError(input, err);
  }

  /** Check email */

  err = document.getElementById("error-email");
  input = document.getElementById("input-email");
  elt = form.email;

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.");
  } else if (!regex.regexEmail(elt)) {
    validate = setError(
      input,
      err,
      "Vous devez saisir une adresse email valide."
    );
  } else {
    resetError(input, err);
  }

  /** Check password */
  if (form.password != null) {
    err = document.getElementById("error-password");
    input = document.getElementById("input-password");
    elt = form.password;

    if (!regex.regexPassword(elt)) {
      validate = setError(
        input,
        err,
        "Le mot de passe doit comprendre 6 caractères ou plus."
      );
    } else if (form.confirmPassword.length == 0) {
      err = document.getElementById("error-confirm-password");
      input = document.getElementById("input-confirm-password");
      validate = setError(input, err, "Ce champ est obligatoire.");
    } else if (elt != form.confirmPassword) {
      err = document.getElementById("error-confirm-password");
      input = document.getElementById("input-confirm-password");
      validate = setError(
        input,
        err,
        "Les mots de passe ne correspondent pas."
      );
    } else if (
      form.actualPassword.length == 0 ||
      !regex.regexPassword(form.actualPassword)
    ) {
      err = document.getElementById("error-actual-password");
      input = document.getElementById("input-actual-password");
      validate = setError(input, err, "Le mot de passe actuel est incorrect.");
    } else {
      err = document.getElementById("error-password");
      input = document.getElementById("input-password");
      resetError(input, err);
      err = document.getElementById("error-confirm-password");
      input = document.getElementById("input-confirm-password");
      resetError(input, err);
      err = document.getElementById("error-actual-password");
      input = document.getElementById("input-actual-password");
      resetError(input, err);
    }
  }

  /** Check address */

  err = document.getElementById("error-nb-address");
  input = document.getElementById("input-nb-address");
  elt = form.nbAddress;

  if (elt != null && elt <= 0) {
    validate = setError(input, err, "Numéro invalide");
  } else {
    resetError(input, err);
  }

  err = document.getElementById("error-city");
  input = document.getElementById("input-city");
  elt = form.city;

  if (!Regex.regexAddress(elt)) {
    validate = setError("input, err, Vous devez saisir un nom de ville valide");
  } else {
    resetError(input, err);
  }

  err = document.getElementById("error-postal-code");
  input = document.getElementById("input-postal-code");
  elt = form.postalCode;

  if (elt != null && elt.length != 5) {
    validate = setError(input, err, "Vous devez saisir un code postal valide");
  } else if (elt != null && elt <= 0) {
    validate = setError(input, err, "Vous devez saisir un code postal valide");
  } else {
    resetError(input, err);
  }

  err = document.getElementById("error-country");
  input = document.getElementById("input-country");
  elt = form.country;

  if (!Regex.regexAddress(form.country)) {
    validate = setError(input, err, "Vous devez saisir un nom valide");
  } else {
    resetError(input, err);
  }

  return validate;
}

export default {
  setError,
  resetError,
  validateSignIn,
  validateSignUpPart,
  validateSignUpPro,
  validateCreatePart,
  validateUpdatePart,
  validateUpdatePro
};
