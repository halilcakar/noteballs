<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number Of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number Of Characters (of all notes)</td>
          <td>{{ storeNotes.totalCharactersOfAllNotes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useStoreNotes } from '../stores/notes';


const storeNotes = useStoreNotes();
</script>