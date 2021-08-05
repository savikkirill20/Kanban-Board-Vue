<template>
  <transition name="modal" v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-message">
          <h4>{{comment}}</h4>
          <template v-if="type === 'yesno'">
            <button class="modal-default-button" @click="onOK">
              Yes
            </button>
            <button class="modal-default-button" @click="onClose">
              No
            </button>
          </template>
          <template v-if="type === 'alert'">
            <button class="modal-default-button" @click="onClose">
              OK
            </button>
          </template>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageBox',
  props: ['show', 'setShow', 'comment', 'type', 'run'],
  methods: {
    onClose() {
      this.setShow(false);
    },
    onOK() {
      this.onClose();
      this.run();
    }
  },
};
</script>
