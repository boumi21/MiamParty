import regex from "@/assistant/Regex.js"

function validateSignIn(document, form) {

  /** Check login */

  let err = document.getElementById("error-login")
  let input = document.getElementById("input-login")
  let elt = form.login

  if (elt.length == 0) {
    err.innerText = "Ce champ est obligatoire."
    err.classList.add("text-danger")
    input.classList.add("is-invalid")
    return false
  }
  if (!regex.regexLogin(elt)) {
    err.innerText = "Le format de l'identifiant n'est pas valide."
    err.classList.add("text-danger")
    input.classList.add("is-invalid")
    return false
  }
  err.innerText = ""
  err.classList.remove("text-danger")
  input.classList.remove("is-invalid")

  /** Check password */

  err = document.getElementById("error-password")
  input = document.getElementById("input-password")
  elt = form.password

  if (elt.length == 0) {
    err.innerText = "Ce champ est obligatoire."
    err.classList.add("text-danger")
    input.classList.add("is-invalid")
    return false
  }
  if (!regex.regexPassword(elt)) {
    err.innerText = "Le mot de passe doit comprendre 8 caractères ou plus, sans espaces."
    err.classList.add("text-danger")
    input.classList.add("is-invalid")
    return false
  }
  err.innerText = ""
  err.classList.remove("text-danger")
  input.classList.remove("is-invalid")

  return true
}

export default {
  validateSignIn
}