<template>
  <th v-if="isHeadColumn">
    <span
      @click="updateSortable()"
      :class="{
        'sort-by': sortable && sortType.length === 0,
        'arrow-up': sortable && sortType === 'asc',
        'arrow-down': sortable && sortType === 'desc',
      }"
    >
      {{ text }}
    </span>
  </th>
  <td v-else>
    {{ text }}
    <slot></slot>
  </td>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    columnKey: {
      type: String,
      default: "",
    },
    isHeadColumn: {
      type: Boolean,
      default: false,
    },
    sortable: {
      type: Boolean,
      default: false,
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
  methods: {
    updateSortable() {
      const sortType =
        this.sortType.length === 0 || this.sortType === "asc" ? "desc" : "asc";
      this.$emit("updateSortable", { sortType, sortKey: this.columnKey });
    },
  },
};
</script>

<style>
</style>