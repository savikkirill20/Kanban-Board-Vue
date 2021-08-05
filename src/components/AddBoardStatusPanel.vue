<template>
  <transition name="modal" v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>Add new board status</h3>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <input class="modal-input" type="text" v-model="title" placeholder="Title *">
              <select class="modal-select" v-model="board">
                <option value="0" class="select-placeholder">Select a board *</option>
                <option v-for="value in this.$store.state.board" :key="value.id" :value="value.id">
                  {{value.board_title}}
                </option>
              </select>
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
  <MessageBox :show="isMessage" :setShow="setIsMessage" comment="You should input all fields!" type="alert" />
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
      board: 0,
    };
  },
  methods: {
    close() {
      this.title = '';
      this.board = 0;
      this.setShow(false);
    },
    save() {
      if(this.title !== '' && this.board > 0) {
        this.$store.dispatch('addBoardStatus', {title: this.title, board: this.board})
        this.close();
      } else this.setIsMessage(true);
    },
    setIsMessage(val) { 
      this.isMessage = val; 
    }
  },
};
</script>
