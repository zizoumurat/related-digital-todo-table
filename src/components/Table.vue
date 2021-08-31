<template>
  <div>
    <table class="table">
      <thead>
        <Row
          :is-head-row="true"
          :columns="columns"
          :show-edit-button="showEditButton"
          :show-delete-button="showDeleteButton"
          :sort-key="sortKey"
          :sort-type="sortType"
          @updateSortable="updateSortable"
        />
      </thead>
      <tbody>
        <Row
          v-for="(row, index) in paginationData"
          :key="`row-${index}`"
          :show-edit-button="showEditButton"
          :show-delete-button="showDeleteButton"
          :row-data="row"
          :columns="columns"
          @edit="edit"
          @delete="deleteRow"
        />
      </tbody>
    </table>
    <Pagination
      :data-length="dataLength"
      :pagination="pagination"
      @setPage="setPage"
    />
  </div>
</template>

<script>
import Row from "@/components/Row.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  components: {
    Row,
    Pagination,
  },
  props: {
    showEditButton: {
      type: Boolean,
      default: false,
    },
    showDeleteButton: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    sortKey: {
      type: String,
      default: "",
    },
    sortType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      pagination: {
        perPage: 10,
        activePage: 1,
      },
    };
  },
  computed: {
    paginationData() {
      return this.data
        .slice(
          (this.pagination.activePage - 1) * this.pagination.perPage,
          this.pagination.perPage * this.pagination.activePage
        )
        .map((item) => {
          return item;
        });
    },
    dataLength() {
      return this.data.length;
    },
  },
  methods: {
    setPage(page) {
      this.pagination.activePage = page;
    },
    edit(id) {
      this.$emit("edit", id);
    },
    deleteRow(id) {
      this.$emit("deleteRow", id);
    },
    updateSortable(sortable) {
      this.$emit("updateSortable", sortable);
    },
  },
};
</script>