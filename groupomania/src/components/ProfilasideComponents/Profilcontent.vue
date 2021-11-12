<template>
    <div class=""> <!-- Div Contenu Profil -->
        <div class="input-group mb-3 d-flex ">
            <input class="form-control" type="text" value="email@email.com" aria-label="Email" disabled readonly>
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="firstname" class="form-control rounded" name="firstname" value="Prénom" disabled readonly>
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="lastname" class="form-control rounded" name="lastname" value="Nom" disabled readonly>
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="NombreMessages" class="form-control rounded" name="NombreMessages" value="Mes Messages" disabled readonly>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3<span class="visually-hidden">unread Posts</span>
            </span>
        </div>
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="NombreComments" class="form-control rounded" name="NombreComments" value="Mes Commentaires" disabled readonly>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">10<span class="visually-hidden">unread Comments</span>
            </span>
        </div>
        <div class= "d-flex ">
        <div class="input-group mb-3 d-flex justify-content-center">
            <input type="likes" class="form-control rounded" name="likes" value="Likes" disabled readonly>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">130<span class="visually-hidden">unread Comments</span>
            </span>
        </div>
        <div class="input-group mb-3 ms-4 d-flex justify-content-center">
            <input type="dislikes" class="form-control rounded" name="dislikes" value="Dislikes" disabled readonly>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">1<span class="visually-hidden">unread Comments</span>
            </span>
        </div>
        </div>
    </div><!-- Div Contenu Profil -->
</template>

<script>
export default {
  name: 'Profilcontent',
}

</script>

<style>


</style>