<script lang="ts">
  import { validateEmailFormData } from "../util/validateEmailFormData";
  import Spinner from "./Spinner.svelte";

  let name = "";
  let email = "";
  let message = "";

  let errors = { name: "", email: "", message: "" };
  let valid = false;
  let submitted = false;
  let busy = false;

  async function submitForm(event: Event) {
    event.preventDefault();

    // Get the form data
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const validationResult = validateEmailFormData(data);
    errors = validationResult.errors;
    valid = validationResult.valid;

    if (!valid) return;
    busy = true;

    try {
      const response = await fetch("/email-request", {
        method: form.method,
        body: data,
      });
      if (!response.ok) {
        console.error("Error submitting form", response);
        return;
      }
      submitted = true;
    } catch (err) {
      console.error("Error making request", err);
    }
    busy = false;
  }
</script>

<form class="flex flex-col gap-4 relative" method="post" on:submit={submitForm}>
  <div class={submitted ? "overlay" : "hidden"}>
    <div
      class="h-32 w-32 dark:text-purple-200 text-purple-400 rounded-full dark:bg-purple-700 bg-purple-100 mx-auto mb-4"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="m10 13.6l5.9-5.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-6.6 6.6q-.3.3-.7.3t-.7-.3l-2.6-2.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l1.9 1.9Z"
        />
      </svg>
    </div>
    <span class="text-slate-600 dark:text-slate-300 montserrat font-semibold"
      >Message received!</span
    >
    <span class="text-slate-500 dark:text-slate-400 text-sm"
      >We'll get back to you as soon as we can.</span
    >
  </div>
  <label class={errors.name ? "invalid" : ""}>
    <span class="montserrat label-content">Your Name</span>
    <input
      required
      disabled={busy}
      placeholder="e.g. Biggus Diggus"
      type="text"
      id="name"
      name="name"
      value={name}
    />
    {#if errors.name}
      <div class="error-message">{errors.name}</div>
    {/if}
  </label>

  <label class={errors.email ? "invalid" : ""}>
    <span class="montserrat label-content"> Your Email Address</span>
    <input
      required
      disabled={busy}
      placeholder="e.g. biggus@romanempire.example"
      type="email"
      id="email"
      name="email"
      value={email}
    />
    {#if errors.email}
      <div class="error-message">{errors.email}</div>
    {/if}
  </label>

  <label class={errors.message ? "invalid" : ""}>
    <textarea
      required
      maxlength="500"
      disabled={busy}
      placeholder="Start typing..."
      id="message"
      name="message"
      rows="5"
      class="resize-none">{message}</textarea
    >
    {#if errors.message}
      <div class="error-message">{errors.message}</div>
    {/if}
  </label>

  <div class="flex gap-4 justify-end">
    {#if busy}
      <Spinner />
    {/if}
    <button disabled={busy} class="submit" type="submit">Send it!</button>
  </div>
</form>

<style lang="postcss">
  .overlay {
    @apply absolute top-0 left-0 w-full h-full flex z-10 bg-white justify-center flex-col text-center border dark:border-slate-700 rounded-xl dark:bg-slate-800;
  }

  input,
  textarea {
    @apply px-6 pt-4 pb-1 border border-slate-400 focus:bg-purple-50 focus:shadow-lg shadow-black rounded-3xl transition-all w-full outline-purple-400
      dark:border-slate-700 focus:dark:bg-slate-700 dark:outline-purple-700 dark:bg-slate-800
      disabled:dark:bg-slate-500 disabled:cursor-not-allowed disabled:text-slate-300;
  }

  .invalid input,
  .invalid textarea {
    @apply border border-purple-800 dark:border-purple-600;
  }

  .error-message {
    @apply text-purple-800 dark:text-purple-400 px-6;
  }

  label {
    @apply relative;
  }

  .label-content {
    @apply font-bold dark:text-slate-300 text-slate-700 text-sm pl-6 absolute top-1 left-0;
  }

  .submit {
    @apply inline-block px-10 py-2 border border-purple-100 hover:shadow bg-purple-500 hover:bg-purple-600 transition-all rounded-3xl text-white 
      dark:bg-purple-700 dark:border-purple-900 dark:hover:bg-purple-600 disabled:bg-purple-400 disabled:cursor-not-allowed;
  }
</style>
