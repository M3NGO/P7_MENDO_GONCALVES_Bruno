<template>
    <form class="input-group d-flex justify-content-center p-4 border rounded-3">
      <div class="input-group mb-3">
        <input type="post" class="form-control" name="post" placeholder="Ecrivez ici votre nouveau post">
      </div>
      <div class="input-group">
        <input type="file" class="form-control" id="inputGroupFile01">
        <button type="upload" class="btn btn-outline-secondary rounded-pill ms-3">ENTRER</button>
      </div>
    </form>
</template>

<script>
export default {
  name: 'Newposts',
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>