<template>
  <div class="board">
    <draggable class="board-group" chosen-class="ghost" v-model="boardStatus" :group="{ name: 'board' }" handle=".card-header">
      <div class="col-md" v-for="key in boardStatus" :key="key.title">
        <task-lane :id="key.id" :title="key.title"></task-lane>
      </div>
      <div class="col-md">
        <input v-model="newStatus" placeholder="+ Add Status" @change="onInput">
      </div>
    </draggable>
    
  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import TaskLane from "../components/TaskLane";

export default {
  name: 'Board',
  components: {
    draggable: VueDraggableNext,
    "task-lane": TaskLane
  },
  data() {
    return {
      newStatus: '',
    }
  },
  computed: {
    boardStatus: {
      get() {
        const boardStatus = this.$store.state.boardStatus;
        const currentBoard = Number(this.$route.params.id);
        return boardStatus.filter((val) => (val.board === currentBoard));
      },
      set(value) {
        this.$store.dispatch('changeOrder', value);
      }
    },
  },
  methods: {
    onInput() {
      if(this.newStatus !== '') {
        const boardStatus = this.$store.state.boardStatus.filter((val) => (val.board === this.$store.state.currentBoard));
        const orderArr = boardStatus.map(val => val.order);
        const max = orderArr.length ? Math.max(...orderArr) + 1 : 0;
        this.$store.dispatch('addBoardStatus', {title: this.newStatus, board: this.$store.state.currentBoard, order: max});
        this.newStatus = '';
      }
    },
  }
}
</script>

