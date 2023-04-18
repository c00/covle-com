<script lang="ts">
  export let title = "It Was So Amazing!";
  export let subtitle = "A thing somewhere";
  export let link: string | null = null;
  export let linkText: string = "See project";
</script>

{#if link}
  <a href={link} class="relative link-hover z-10 main">
    <div class="subtitle">{subtitle}</div>
    <div class="title">{title}</div>
    <div class="body">
      <slot>Bladiebla some internal stuff that's super important.</slot>
    </div>

    <div class="link flex gap-1 items-center mt-3">
      <span>
        {linkText}
      </span>
      <svg
        class="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="M9.4 18L8 16.6l4.6-4.6L8 7.4L9.4 6l6 6l-6 6Z"
        /></svg
      >
    </div>
  </a>
{:else}
  <div class="main">
    <div class="subtitle">{subtitle}</div>
    <div class="title">{title}</div>
    <div class="body">
      <slot>Bladiebla some internal stuff that's super important.</slot>
    </div>
  </div>
{/if}

<style lang="postcss">
  .main {
    @apply mb-8 block;
  }

  .link-hover::before {
    content: " ";
    @apply absolute top-0 left-0 w-full h-full bg-slate-100 dark:bg-slate-800 pointer-events-none rounded-lg opacity-0 transition-all;
    z-index: -1;
    scale: 1 1;
  }

  .link-hover:hover::before {
    @apply opacity-60;
    z-index: -1;
    scale: 1.05 1.3;
  }

  .subtitle {
    @apply pl-4 text-sm mb-3 border-l-2 border-slate-200  text-slate-400
      dark:border-slate-700  dark:text-slate-500;
  }

  .title {
    @apply font-bold mb-3 text-slate-900 dark:text-slate-200;
  }

  .link {
    @apply text-purple-500 dark:text-purple-400 font-semibold text-sm;
  }

  .body {
    @apply text-slate-600 dark:text-slate-400;
  }
</style>
