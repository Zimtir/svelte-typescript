<style>
  h1 {
    color: brown;
  }
</style>

<script>
  import Spinner from 'svelte-spinner'
  import './App.scss'
</script>

<div class="container">
  <h1 class="container-header">Hello world!</h1>
  <Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />
</div>
