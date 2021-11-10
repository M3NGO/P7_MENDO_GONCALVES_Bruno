<!-- Composant login Groupomania -->

<!-- HTML -->
<template>  
<div class="d-flex h-100 align-items-center">
    <div class="container-fluid">
        <div class="row justify-content-center">
            <form class="w-25 p-3 border border-danger border-3 rounded-3">
                <div class="input-group mb-3 d-flex justify-content-center">
                    <img class="logo_site" src="../assets/Logo_Groupomania.png" alt="logo Groupomania">
                </div>
                <div class="input-group mb-3 d-flex justify-content-center">
                    <input type="email" class="form-control rounded-pill" name="email" placeholder="email">
                </div>
                <div class="input-group mb-3 d-flex justify-content-center">
                    <input type="password" class="form-control rounded-pill" name="password" placeholder="Mot de passe">
                </div>
                <div class="input-group mb-3 d-flex justify-content-center">
                    <button type="submit" class="btn btn-outline-secondary rounded-pill">ENTRER</button>
                </div>
                <div class="input-group mb-3 d-flex justify-content-end">
                    <span><a href="#/inscription">Pas encore inscrit?</a></span>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<!-- HTML -->

<!-- JAVASCRIPT -->
<script>

export default {
  name: 'Login',

}

</script>
<!-- JAVASCRIPT -->

<!-- CSS -->
<style>

.logo_site{
height: 10em;
}

</style>
<!-- CSS -->
