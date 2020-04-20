<template>
    <div class="container">
        <h1 class="title">
            Bienvenue !
        </h1>
        <h2 class="subtitle">
            Créer un compte pour...
        </h2>
        <div class="form-check">
            <input class="form-check-input" type="radio" id="part" onclick="document.location.href='/part'">
            <label class="form-check-label" for="part">
                Moi
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" id="pro" onclick="document.location.href='/pro'">
            <label class="form-check-label" for="pro">
                Mon entreprise
            </label>
        </div>
    </div>
</template>

<script>

console.log("yes")
if(process.client) {
    console.log("yes2")
 // console.log(document.getElementById("part"))
  //console.log(document.getElementById("part").checked)
  //document.getElementById("part").checked = false
  //console.log(document.getElementById("part").checked)
  //document.getElementById("pro").checked = false
  
}
console.log("yes3")
</script>