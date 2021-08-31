<template>
  <tr v-if="isHeadRow">
    <Column
      v-for="(column, index) in columns"
      :key="`column-${index}`"
      :is-head-column="true"
      :column-key="column.key"
      :text="`${column.text}`"
      :sortable="column.sortable"
      :sort-key="sortKey"
      :sort-type="sortType"
      @updateSortable="updateSortable"
    />
    <Column
      v-if="showEditButton || showDeleteButton"
      :is-head-column="true"
      text="Actions"
    />
  </tr>
  <tr v-else>
    <Column
      v-for="(column, index) in columns"
      :key="`column-${index}`"
      :text="`${rowData[column.key]}`"
    />
    <Column
      v-if="showEditButton || showDeleteButton">
      <div>
        <button class="btn btn-primary" v-if="showEditButton" @click="$emit('edit',rowData.Id)">Edit</button>
        <button class="btn btn-danger" v-if="showDeleteButton" @click="$emit('delete',rowData.Id)">Delete</button>
      </div>
    </Column>
  </tr>
</template>

<script>
import Column from "@/components/Column.vue";

export default {
  components: {
    Column,
  },

  props: {
    rowData: {
      type: Object,
      require: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    isHeadRow: {
      type: Boolean,
      default: false,
    },
    showEditButton: {
      type: Boolean,
      default: false,
    },
    showDeleteButton: {
      type: Boolean,
      default: false,
    },
    sortKey: {
      type: String,
      default: '',
    },
    sortType: {
      type: String,
      default: '',
    }
  },

  methods: {
    updateSortable(sortable) {
        this.$emit('updateSortable', sortable);
    }
  }
};
</script>