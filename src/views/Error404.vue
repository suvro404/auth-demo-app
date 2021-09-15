<template>
  <div>
    <b-container class="d-flex justify-content-center">
      <div class="error-container">
        <div>
          <div style="font-size: 30vh">
            404
          </div>

          <div class="text-h2 mb-4" style="opacity:.7">
            Oops. Nothing here...
          </div>

          <b-button variant="primary" @click="$router.push({path: '/'})">Go Home</b-button>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Error404"
}
</script>

<style scoped>

</style>