<script>
    /**
     * TODO
     * INTEGRAR LIB PARA MOSTRAR EL JSON CORRECTAMENTE
     * OBTENER EL CSV Y GENERAR LA RESPUESTA CORRECTAMENTE
     */

    let count = 0

    function handleClick () {
        console.log("Clicked")
        count = count + 1
    }
</script>

<main class="w-full flex flex-col justify-center items-center">
    <button on:click={handleClick}>
        Clicked {count} {count === 1 ? 'time' : 'times'}
    </button>
    <h2 class="text-xl">Upload file or paste content directly</h2>
    <form class="p-6 md:p-16 w-full max-w-6xl grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="w-full md:max-w-lg">
            <label class="w-full block mt-6 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file">                
            <label for="message" class=" w-full block mt-6 text-sm font-medium text-gray-900 dark:text-white">CSV content</label>
            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Paste csv content..."></textarea>        
            <button on:click={handleClick} type="button" class="text-white mt-6 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none">Default</button>    
        </div>
        <div class="w-full md:max-w-lg">
            <label for="message" class=" w-full block mt-6 text-sm font-medium text-gray-900 dark:text-white">Parsed JSON</label>
            <textarea id="message" rows="4" class="h-5/6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="JSON Content..."></textarea>        
        </div>
        {count}
   </form>
</main>