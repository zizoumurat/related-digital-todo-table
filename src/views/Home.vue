<template>
  <div class="home">
    <Table
      :columns="columns"
      :show-edit-button="true"
      :show-delete-button="true"
      :data="tableData"
      :sort-key="sortKey"
      :sort-type="sortType"
      @edit="edit"
      @deleteRow="deleteRow"
      @updateSortable="updateSortable"
    />
    <Modal
      :show="showModal"
      :to-do="toDo"
      @closeModal="showModal = false"
      @save="save"
    />
  </div>
</template>

<script>
import ApiService from "@/common/api.service";
import Table from "@/components/Table.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "Home",
  components: {
    Table,
    Modal,
  },

  data() {
    return {
      toDo: {},
      showModal: false,
      sortKey: "",
      sortType: "",
      columns: [
        {
          text: "#",
          key: "Id",
          sortable: false,
        },
        {
          text: "Title",
          key: "title",
          sortable: false,
        },
        {
          text: "Assignee",
          key: "assignee",
          sortable: false,
        },
        {
          text: "Status",
          key: "status",
          sortable: true,
        },
      ],
      users: [],
      toDos: [],
    };
  },

  async beforeMount() {
    await this.fetchUsers();
    await this.fetchToDos();
  },

  methods: {
    async fetchUsers() {
      const { data } = await ApiService.get("users");
      this.users = data;
    },

    async fetchToDos() {
      const { data } = await ApiService.get("todos");
      this.toDos = data;
    },

    edit(id) {
      this.toDo = this.toDos.find((item) => item.id === id);
      this.showModal = true;
    },

    async deleteRow(id) {
      await ApiService.delete(`todos/${id}`);
      const findIndex = this.toDos.findIndex((toDo) => toDo.id === id);
      this.toDos.splice(findIndex, 1);
    },

    async save(toDo) {
      await ApiService.put(`todos/${toDo.id}`, toDo);
      this.showModal = false;
    },

    sortAsc(object1, object2, key) {
      const obj1 = object1[key].toUpperCase();
      const obj2 = object2[key].toUpperCase();
      if (obj1 < obj2) {
        return -1;
      }
      if (obj1 > obj2) {
        return 1;
      }
      return 0;
    },

    sortDesc(object1, object2, key) {
      const obj1 = object1[key].toUpperCase();
      const obj2 = object2[key].toUpperCase();
      if (obj1 > obj2) {
        return -1;
      }
      if (obj1 < obj2) {
        return 1;
      }
      return 0;
    },

    updateSortable({sortType, sortKey}) {
      this.sortType = sortType;
      this.sortKey = sortKey;
    },
  },

  computed: {
    tableData() {
      const data = this.toDos.map((toDo) => ({
        Id: toDo.id,
        title: toDo.title,
        assignee: this.users.find((user) => user.id === toDo.userId).name,
        status: toDo.completed ? "Done" : "In Progress",
      }));

      if (this.sortKey.length === 0) {
        return data;
      }

      if (this.sortType === "asc") {
        return data.sort((item1, item2) => {
          return this.sortAsc(item1, item2, this.sortKey);
        });
      }

      return data.sort((item1, item2) => {
        return this.sortDesc(item1, item2, this.sortKey);
      });
    },
  },
};
</script>
