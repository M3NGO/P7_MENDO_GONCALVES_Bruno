<template>
<div class="border row p-4 justify-content-center mb-4"> <!-- Div Contenu Profil -->
    <form class="input-group d-flex justify-content-center">
      <div class="input-group mb-3">
        <input type="post" class="form-control" name="post" placeholder="Ecrivez ici votre nouveau post">
      </div>
      <div class="input-group">
        <input type="file" class="form-control" id="inputGroupFile01">
        <button type="upload" class="btn btn-outline-secondary rounded-pill ms-3">ENTRER</button>
      </div>
    </form>
</div>
</template>

<script>
export default {
  name: 'Newposts',
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>