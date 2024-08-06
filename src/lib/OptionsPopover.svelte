<script>
  import { onDestroy, onMount } from "svelte";
  import { save } from "@tauri-apps/api/dialog";
  import { writeTextFile, BaseDirectory } from "@tauri-apps/api/fs";
  import { fs } from "@tauri-apps/api";
  import { dialog } from "@tauri-apps/api";
  import { tagData, taskData } from "../stores/tasks";

  $: position = {
    top: "auto",
    left: "auto",
  };

  function calculatePosition() {
    const optionsBtn = document.getElementById("options-button");
    if (optionsBtn) {
      const btnRect = optionsBtn.getBoundingClientRect();
      position.top = `${btnRect.y + btnRect.height + 10}px`;
      position.left = `${btnRect.x}px`;
    }
  }

  async function importData() {
    try {
      // Open a file dialog to select the file to import
      const selectedFilePath = await dialog.open({
        filters: [
          {
            name: "JSON Files",
            extensions: ["json"],
          },
        ],
      });

      // If the user canceled the open dialog, selectedFilePath will be null
      if (selectedFilePath && typeof selectedFilePath === "string") {
        // Read the file contents
        const fileContents = await fs.readTextFile(selectedFilePath);

        // Parse the JSON data
        const data = JSON.parse(fileContents);

        // Check if data contains tasks and tags
        if (data.tasks && data.tags) {
          // Save tasks and tags to local storage
          taskData.set(data.tasks);
          tagData.set(data.tags);
          alert("Data imported successfully!");
        } else {
          alert("Invalid data format!");
        }
      }
    } catch (error) {
      alert("Error importing data!");
      console.error(error);
    }
  }

  async function exportData() {
    const tags = JSON.parse(localStorage.getItem("tags"));
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const dataToExport = { tasks, tags };
    const jsonData = JSON.stringify(dataToExport);
    try {
      const filePath = await save({
        defaultPath: "data.json",
        filters: [
          {
            name: "JSON Files",
            extensions: ["json"],
          },
        ],
      });

      // If the user canceled the save dialog, filePath will be null
      if (filePath) {
        // Write the data to the selected file
        await writeTextFile(filePath, jsonData, {
          dir: BaseDirectory.Document,
        });
        alert("Data exported successfully!");
      } else {
        alert("Export canceled!");
      }
    } catch (error) {
      alert("Error exporting data!");
      console.error(error);
    }
  }

  // Window functions
  onMount(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);
  });

  onDestroy(() => {
    window.removeEventListener("resize", calculatePosition);
  });
</script>

<div
  id="options-popover"
  popover="auto"
  class="m-0 p-2 bg-zinc-700 bg-opacity-50 shadow-xl rounded-md overflow-hidden"
  style="top: {position.top}; left: {position.left}"
>
  <ul class="overflow-y-auto flex flex-col gap-1">
    <button on:click={importData} class="func-button text-zinc-300"
      >Import Data</button
    >
    <button on:click={exportData} class="func-button text-zinc-300"
      >Export Data</button
    >
  </ul>
</div>

<style>
  div[popover] {
    backdrop-filter: blur(5px);
  }

  .func-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
