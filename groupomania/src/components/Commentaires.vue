<template>
<div class="w-75">
    <div class="border bg-light rounded d-flex mt-4 mb-4 ms-4">
        <div class=""> 
        <!-- Avatar du créateur du commentaire -->
            <img src="@/assets/logo.png" class="img-thumbnail rounded-pill position-relative top-50 start-0 translate-middle" alt="...">
        </div>

        <div class="card-body ">
            <div class=" d-flex flex-column ">
                <div class="align-self-center">
                    <img src="@/assets/logo.png" class="card-img-top " alt="...">
                </div>
                
                <div class="card-body align-self-start">
                    <p class="card-text">Contenu du Comentaire ici.</p>
                </div>
            </div>
        </div>
        <div class="align-self-end me-4  mb-4">
            <p class="card-text ">créé le : 15/01/2100</p>
        </div>
    </div>
</div>
    
</template>

<script>
export default {
  name: 'Commentaires',

}
</script>

<style>
.image{
    height: 10em;
    width: 10em;
}

</style>
