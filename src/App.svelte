<style>
  h1 {
    color: brown;
  }
</style>

<script lang="typescript">
  import { onMount } from 'svelte'

  import Spinner from 'svelte-spinner'

  import './App.scss'

  let header: string

  const setHeader = (input: string) => {
    header = input
  }

  console.log(Spinner)

  onMount(() => setTimeout(() => setHeader('Hello world'), 2000))
</script>

<div class="container">
  {#if header && header.length > 0}
    <h1 class="container-header">{header}</h1>
  {:else}
    <Spinner size="50" speed="750" color="#A82124" thickness="2" gap="40" />
  {/if}
</div>
