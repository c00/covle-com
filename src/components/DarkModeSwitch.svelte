<script lang="ts">
  import { onMount } from "svelte";

  let darkMode = false;

  $: toggle(darkMode);

  onMount(() => {
    darkMode = document.body.classList.contains("dark");
  });

  function toggle(toDarkMode: boolean) {
    const isDarkMode = document.body.classList.contains("dark");
    if (toDarkMode === isDarkMode) return;

    if (toDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
</script>

<button on:click={() => (darkMode = !darkMode)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    class="dark:block hidden"
    ><path
      fill="currentColor"
      d="M122 40v-8a6 6 0 0 1 12 0v8a6 6 0 0 1-12 0Zm68 88a62 62 0 1 1-62-62a62.07 62.07 0 0 1 62 62Zm-12 0a50 50 0 1 0-50 50a50.06 50.06 0 0 0 50-50ZM59.76 68.24a6 6 0 1 0 8.48-8.48l-8-8a6 6 0 0 0-8.48 8.48Zm0 119.52l-8 8a6 6 0 1 0 8.48 8.48l8-8a6 6 0 1 0-8.48-8.48Zm136-136l-8 8a6 6 0 1 0 8.48 8.48l8-8a6 6 0 0 0-8.48-8.48Zm.48 136a6 6 0 0 0-8.48 8.48l8 8a6 6 0 0 0 8.48-8.48ZM40 122h-8a6 6 0 0 0 0 12h8a6 6 0 0 0 0-12Zm88 88a6 6 0 0 0-6 6v8a6 6 0 0 0 12 0v-8a6 6 0 0 0-6-6Zm96-88h-8a6 6 0 0 0 0 12h8a6 6 0 0 0 0-12Z"
    /></svg
  >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    class="dark:hidden"
    ><path
      fill="currentColor"
      d="M12.741 20.917a9.389 9.389 0 0 1-1.395-.105a9.141 9.141 0 0 1-1.465-17.7a1.177 1.177 0 0 1 1.21.281a1.273 1.273 0 0 1 .325 1.293a8.112 8.112 0 0 0-.353 2.68a8.266 8.266 0 0 0 4.366 6.857a7.628 7.628 0 0 0 3.711.993a1.242 1.242 0 0 1 .994 1.963a9.148 9.148 0 0 1-7.393 3.738ZM10.261 4.05a.211.211 0 0 0-.065.011a8.137 8.137 0 1 0 9.131 12.526a.224.224 0 0 0 .013-.235a.232.232 0 0 0-.206-.136a8.619 8.619 0 0 1-4.188-1.116a9.274 9.274 0 0 1-4.883-7.7a9.123 9.123 0 0 1 .4-3.008a.286.286 0 0 0-.069-.285a.184.184 0 0 0-.133-.057Z"
    /></svg
  >
</button>

<style lang="postcss">
  button {
    @apply flex gap-4 rounded-full border p-2 shadow-lg font-semibold h-12 w-12 transition-all active:shadow-none hover:shadow-md
      hover:bg-slate-200 active:bg-slate-100 text-purple-600 border-slate-300
      dark:hover:bg-slate-600 dark:hover:text-purple-200 dark:active:bg-slate-700 dark:text-purple-600 dark:border-slate-700 dark:bg-slate-800;
  }
</style>
