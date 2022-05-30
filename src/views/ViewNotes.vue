<template>
  <div class="notes">
    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea class="textarea" placeholder="Add a new note" />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button is-link has-background-success">
            Add New Notes
          </button>
        </div>
      </div>
    </div>

    <div v-for="i in 3" :key="i" class="card mb-4">
      <main class="card-content">
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
          voluptate reiciendis, natus deleniti eius quis, esse eum, magni sit
          minus molestias nemo voluptates dolor? Autem omnis fugiat quaerat!
          Porro, harum!
        </div>
      </main>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
    </div>
  </div>
</template>
