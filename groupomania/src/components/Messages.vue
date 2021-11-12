<template>
<div class="border rounded d-flex mt-4 mb-4 ">
    <div class="position-relative top-50 start-50 translate-middle"> 
    <!-- Avatar du créateur du message -->
    <img src="@/assets/logo.png" class="img-thumbnail rounded-pill" alt="...">
    </div>

  <div class="card-body justify-content-center">
      <img src="@/assets/logo.png" class="image card-img-top" alt="...">
    <div class="blockquote mb-0">
      <p>Message content</p>
      
    </div>
    <footer class="blockquote-footer">créé le : <cite title="Source Title">10/01/1900</cite></footer>
  </div>
</div>
    
</template>

<script>
export default {
  name: 'Message',

}
</script>

<style>
.image{
    height: 10em;
    width: 10em;
}

</style>
