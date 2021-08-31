<template>
  <div class="modal-container" :class="{ 'fade-in': show }">
    <div class="modal-overlay modal-exit"></div>
    <div class="modal">
      <div>
        <span>Title</span>
      </div>
      <div class="mt-4">
        <input type="text" class="w-full" v-model="toDo.title" />
      </div>
      <div class="mt-4">
          <input type="checkbox" name="chxCompleted" id="chxCompleted" v-model="toDo.completed"/>
          <label for="chxCompleted">Completed</label>
      </div>
      <div class="actions">
          <button class="btn btn-primary" @click="save()">Save</button>
          <button class="btn btn-danger" @click="$emit('closeModal')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    toDo: {
      type: Object,
      required: true,
    }
  },
  methods: {
      save() {
          this.$emit('save', this.toDo);
      }
  }
};
</script>

<style lang="scss">
input[type="text"] {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  border-color:gray;
  outline: none;
  border-style: solid;
  padding: 4px;
}
input[type="checkbox"] {
    margin: 0 5px 0 0;
    vertical-align: middle;
}
label {
    user-select: none;
    cursor: pointer;
}
.mt-4 {
    margin-top: 4px;
}
.actions {
    margin-top: 20px;
    text-align: right;
}
.block {
  display: block;
}
.w-full {
  width: 100%;
}
.modal-container {
  visibility: hidden;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  transition: all 0.2s linear;
  opacity: 0;

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal {
    position: relative;
    width: 300px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
  }

  .modal-exit {
    cursor: pointer;
  }
}

.fade-in {
  visibility: visible !important;
  z-index: 99;
  opacity: 1;
}
</style>