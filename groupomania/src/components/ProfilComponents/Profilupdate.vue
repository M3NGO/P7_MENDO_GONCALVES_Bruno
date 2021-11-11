<template>
    <div class="p-4"> <!-- Div Contenu Profil -->

        <h1>Vous pouvez mettre à jour vos informations ici </h1>
    
        <div class="input-group mb-3 d-flex">
            <input class="form-control" type="text" value="email@email.com" aria-label="Email" disabled readonly>
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="firstname" class="form-control rounded" name="firstname" placeholder="Prénom">
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="lastname" class="form-control rounded" name="lastname" placeholder="Nom">
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="password" class="form-control rounded" name="password" placeholder="Mot de passe">
        </div>
        <div class="input-group mb-3">
            <label class="input-group-text" for="inputGroupFile01">Votre avatar</label>
            <input type="file" class="form-control" id="inputGroupFile01">
        </div>
        <div class="input-group d-flex justify-content-center">
            <button type="submit" class="btn btn-outline-secondary rounded-pill">ENTRER</button>
        </div>
         
    </div><!-- Div Contenu Profil -->
</template>

<script>
export default {
  name: 'ProfilUpdate',

}
</script>

<style>
/* .card-img-top{
    max-height:10em;
    max-width: 10em;
} */
h1{
    text-align: center;
}
</style>