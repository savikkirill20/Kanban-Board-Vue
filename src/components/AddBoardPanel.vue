<template>
  <transition name="modal" v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Add new board</h3>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <input class="modal-input" type="text" v-model="title" placeholder="Title *">
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="save">
                Save
              </button>
              <button class="modal-default-button" @click="close">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <MessageBox :show="isMessage" :setShow="setIsMessage" comment="You should input title field!" type="alert" />
</template>

<script>
import MessageBox from './MessageBox';

export default {
  name: 'AddBoardPanel',
  props: ['show', 'setShow'],
  components: {
    MessageBox
  },
  data() {
    return {
      title: '',
      isMessage: false,
    };
  },
  methods: {
    close() {
      this.title = '';
      this.setShow(false);
    },
    save() {
      if (this.title) {
        this.$store.dispatch('addBoard', { board_title: this.title });
        this.close();
      } else this.setIsMessage(true);
    },
    setIsMessage(val) { 
      this.isMessage = val; 
    }
  },
};
</script>
