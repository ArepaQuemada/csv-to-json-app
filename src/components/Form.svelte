<script>
  import JSONTree from "svelte-json-tree";
  /**
   * TODO
   * COMPONENTIZAR FORM UI -> RESULT COMPONENT -> CONVERT COMPONENT -> ABSTRACT SERVICES
   * AGREGAR NUEVAMENTE CAMPO DE TEXTO PARA INGRESAR CONTENIDO DIRECTO
   */

  let isCheckedPrettify = true;
  let jsonContent = "";
  let result = null;
  let file = null;
  let error = false;

  function handleChecked() {
    isCheckedPrettify = !isCheckedPrettify;
  }

  function handleCloseErrorModal() {
    error = false;
  }

  function handleFileSelect(event) {
    file = event.target.files[0];
  }

  async function submitForm(e) {
    if (!file) {
      error = true;
      setTimeout(() => {
        error = false;
      }, 5000);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    result = await fetch("/api/generate-file", {
      method: "post",
      body: formData,
    }).then((res) => res.json());

    jsonContent = JSON.stringify(result, null, "\t");
  }
</script>

<main class="w-full flex flex-col justify-center items-center p-4">
  <h2 class="text-xl">Upload the file that you want to convert</h2>
  <form
    on:submit|preventDefault="{submitForm}"
    class="h-full p-6 md:p-16 w-full max-w-6xl grid grid-cols-1 gap-4 md:grid-cols-2 bg-zinc-200 border border-gray-200 rounded-lg shadow"
  >
    <div class="w-full md:max-w-lg">
      <label
        class="w-full block mt-6 text-sm font-medium text-gray-900 dark:text-white"
        for="file_input">Upload file</label
      >
      <input
        on:change="{handleFileSelect}"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />

      <button
        type="submit"
        class="text-white mt-6 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
        >Convert content</button
      >
      {#if error}
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong class="font-bold">Something went wrong!</strong>
          <span class="block sm:inline"
            >Please, upload a CSV file to convert.</span
          >
          <button
            class="absolute top-0 bottom-0 right-0 px-4 py-3"
            on:click="{handleCloseErrorModal}"
          >
            <svg
              class="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              ><title>Close</title><path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
              ></path></svg
            >
          </button>
        </div>
      {/if}
    </div>
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
  </form>
</main>
