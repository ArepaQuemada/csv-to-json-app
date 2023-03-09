<script>
  import JSONTree from "svelte-json-tree";

  export let result;
  export let jsonContent;
  let isCheckedPrettify = true;

  const handleChecked = () => {
    isCheckedPrettify = !isCheckedPrettify;
  };
</script>

<div>
  <label
    for="message"
    class=" w-full block mt-6 text-sm font-medium text-gray-900 dark:text-white"
    >Parsed JSON</label
  >
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      class="sr-only peer"
      bind:checked="{isCheckedPrettify}"
      on:change="{() => handleChecked}"
    />
    <div
      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
      >Prettify JSON</span
    >
  </label>
  <div
    class="w-full md:max-w-lg  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  >
    {#if isCheckedPrettify}
      <div
        class="h-96 block p-2.5 w-full overflow-y-scroll scrollbar-thumb-rounded"
      >
        <JSONTree value="{{ result }}" />
      </div>
    {:else}
      <textarea
        readonly
        value="{jsonContent}"
        id="message"
        rows="4"
        class="h-96 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="JSON Content..."></textarea>
    {/if}
  </div>
</div>
