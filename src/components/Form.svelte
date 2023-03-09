<script>
  import Button from "./Button.svelte";
  import ErrorModal from "./ErrorModal.svelte";
  import JsonContent from "./JsonContent.svelte";

  let isCheckedPrettify = true;
  let jsonContent = "";
  let result = null;
  let file = null;
  let error = false;
  let loading = false;

  function handleChecked() {
    isCheckedPrettify = !isCheckedPrettify;
  }

  function handleCloseErrorModal() {
    error = false;
  }

  function handleFileSelect(event) {
    file = event.target.files[0];
  }

  const showError = () => {
    error = true;
    setTimeout(() => {
      error = false;
    }, 5000);
  };

  async function submitForm(e) {
    if (!file) {
      return showError();
    }

    try {
      loading = true;
      const formData = new FormData();
      formData.append("file", file);

      result = await fetch("/api/generate-file", {
        method: "post",
        body: formData,
      }).then((res) => res.json());

      jsonContent = JSON.stringify(result, null, "\t");
    } catch (err) {
      showError();
    } finally {
      loading = false;
    }
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
      <Button type="submit" loading="{loading}" />
      {#if error}
        <ErrorModal handleCloseErrorModal="{handleCloseErrorModal}" />
      {/if}
      <JsonContent result="{result}" jsonContent="{jsonContent}" />
    </div>
  </form>
</main>
