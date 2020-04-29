import regex from "@/assistant/Regex.js"

function setError(input, err, message) {
  input.classList.add("is-invalid")
  err.classList.add("text-danger")
  err.innerText = message

  return false
}

function resetError(input, err) {
  input.classList.remove("is-invalid")
  err.classList.remove("text-danger")
  err.innerText = ""
}

//************************************************ */

function validateSignIn(document, form) {

  let validate = true

  /** Check email */

  let err = document.getElementById("error-email")
  let input = document.getElementById("input-email")
  let elt = form.email

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (!regex.regexEmail(elt)) {
    validate = setError(input, err, "Le format de l'adresse email n'est pas valide.")
  }
  else {
    resetError(input, err)
  }

  /** Check password */

  err = document.getElementById("error-password")
  input = document.getElementById("input-password")
  elt = form.password

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (!regex.regexPassword(elt)) {
    validate = setError(input, err, "Le mot de passe doit comprendre 6 caractères ou plus.")
  }
  else {
    resetError(input, err)
  }
  
  return validate
}

//************************************************ */

function validateSignUpPart(document, form) {

  let validate = true

  /** Check firstname */

  let err = document.getElementById("error-firstname")
  let input = document.getElementById("input-firstname")
  let elt = form.firstname

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (elt.charAt(0) != elt.charAt(0).toUpperCase()) {
    validate = setError(input, err, "Le prénom doit commencer par une majuscule.")
  }
  else if (!regex.regexName(elt)) {
    validate = setError(input, err, "Vous devez saisir un prénom valide.")
  }
  else {
    resetError(input, err)
  }

  /** Check lastname */

  err = document.getElementById("error-lastname")
  input = document.getElementById("input-lastname")
  elt = form.lastname

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (elt.charAt(0) != elt.charAt(0).toUpperCase()) {
    validate = setError(input, err, "Le nom doit commencer par une majuscule.")
  }
  else if (!regex.regexName(elt)) {
    validate = setError(input, err, "Vous devez saisir un nom valide.")
  }
  else {
    resetError(input, err)
  }

  /** Check email */

  err = document.getElementById("error-email")
  input = document.getElementById("input-email")
  elt = form.email

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (!regex.regexEmail(elt)) {
    validate = setError(input, err, "Vous devez saisir une adresse email valide.")
  }
  else {
    resetError(input, err)
  }
  
  /** Check password */

  err = document.getElementById("error-password")
  input = document.getElementById("input-password")
  elt = form.password

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (!regex.regexPassword(elt)) {
    validate = setError(input, err, "Le mot de passe doit comprendre 6 caractères ou plus.")
  }
  else if (form.confirmPassword.length == 0) {
    err = document.getElementById("error-confirm-password")
    input = document.getElementById("input-confirm-password")
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (elt != form.confirmPassword) {
    err = document.getElementById("error-confirm-password")
    input = document.getElementById("input-confirm-password")
    validate = setError(input, err, "Les mots de passe ne correspondent pas.")
  }
  else {
    err = document.getElementById("error-password")
    input = document.getElementById("input-password")
    resetError(input, err)
    err = document.getElementById("error-confirm-password")
    input = document.getElementById("input-confirm-password")
    resetError(input, err)
  }

  /** Cooking level */

  err = document.getElementById("error-level")
  input = document.getElementById("input-level")
  elt = form.level

  if (elt == null) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else {
    resetError(input, err)
  }

  /** Check birth */
 
  err = document.getElementById("error-birth")
  input = document.getElementById("input-birth")
  elt = form.birth
  let today = new Date()
  let year = today.getFullYear()

  if (elt == null) {
    validate = setError(input, err, "Ce champ est obligatoire")
  }
  else if (parseInt(elt.substring(0, elt.indexOf("-", 1) + 1)) < 1900 || parseInt(elt.substring(0, elt.indexOf("-", 1) + 1)) > year) {
    console.log("date invalide")
    console.log(parseInt(elt.substring(0, elt.indexOf("-", 1) + 1)))
    validate = setError(input, err, "Vous devez saisir une date valide.")
  }
  else {
    resetError(input, err)
  }
  
  return validate
}

//************************************************ */

function validateSignUpPro(document, form) {

  let validate = true

  /** Check firstname */

  let err = document.getElementById("error-name")
  let input = document.getElementById("input-name")
  let elt = form.name

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }

  else {
    resetError(input, err)
  }

  /** Check email */

  err = document.getElementById("error-email")
  input = document.getElementById("input-email")
  elt = form.email

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (!regex.regexEmail(elt)) {
    validate = setError(input, err, "Vous devez saisir une adresse email valide.")
  }
  else {
    resetError(input, err)
  }
  
  /** Check password */

  err = document.getElementById("error-password")
  input = document.getElementById("input-password")
  elt = form.password

  if (elt.length == 0) {
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (!regex.regexPassword(elt)) {
    validate = setError(input, err, "Le mot de passe doit comprendre 6 caractères ou plus.")
  }
  else if (form.confirmPassword.length == 0) {
    err = document.getElementById("error-confirm-password")
    input = document.getElementById("input-confirm-password")
    validate = setError(input, err, "Ce champ est obligatoire.")
  }
  else if (elt != form.confirmPassword) {
    err = document.getElementById("error-confirm-password")
    input = document.getElementById("input-confirm-password")
    validate = setError(input, err, "Les mots de passe ne correspondent pas.")
  }
  else {
    err = document.getElementById("error-password")
    input = document.getElementById("input-password")
    resetError(input, err)
    err = document.getElementById("error-confirm-password")
    input = document.getElementById("input-confirm-password")
    resetError(input, err)
  }
  
  return validate
}

export default {
  setError,
  resetError,
  validateSignIn,
  validateSignUpPart,
  validateSignUpPro
}