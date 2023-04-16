<script lang="ts">
  export let image: string = '/me-square-2.jpg';
  export let rotation = Math.floor(Math.random() * 20) - 10 + 'deg';
  export let width = '280px';
  export let height = '280px';
  export let link = "#";
</script>
<a href={link} class="image" style="background-image: url('{image}'); width: {width}; height: {height}; rotate: {rotation}">

</a>

<style lang="postcss">
  .image {
    @apply rounded-lg inline-block mx-6 border dark:border-slate-700 border-slate-200 hover:shadow hover:scale-105 transition-all relative;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .image::after {
    position: absolute;
    content: ' ';
    height: 100%;
    width: 100%;
    @apply bg-slate-700 opacity-20 pointer-events-none rounded-lg hover:opacity-0 transition-all;

  }

  .image:hover {
    rotate: 2deg !important;
  }
</style>