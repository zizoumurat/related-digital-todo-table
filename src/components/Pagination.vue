<template>
  <div class="pagination-wrap">
    <ul class="pagination">
      <li @click="prev()">Prev</li>
      <li
        v-for="page in pageCount"
        :key="`page-${page}`"
        :class="{ active: page === pagination.activePage }"
        @click="setPage(page)"
      >
        {{ page }}
      </li>
      <li @click="next()">Next</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    dataLength: {
      require: true,
      type: Number,
    },
    pagination: {
      require: true,
      type: Object,
    },
  },

  methods: {
    setPage(pageNumber) {
      this.$emit("setPage", pageNumber);
    },
    prev() {
      let activePage = this.pagination.activePage;
      activePage--;

      if (activePage === 0) {
        activePage = this.pageCount;
      }

      this.$emit("setPage", activePage);
    },
    next() {
      let activePage = this.pagination.activePage;
      activePage++;

      if (activePage > this.pageCount) {
        activePage = 1;
      }

      this.$emit("setPage", activePage);
    },
  },

  computed: {
    pageCount() {
      return Math.ceil(this.dataLength / this.pagination.perPage);
    },
  },
};
</script>

<style>
</style>