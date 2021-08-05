<template>
  <div class="card">
    <h3 class="card-header">{{title}}</h3>
    <div class="button-group">
      <button class="add-button" @click="setShowTask(true)" title="Add Task">+</button>
      <button class="add-button" @click="setIsMessage(true)" title="Remove Board">
        <i class="fa fa-trash remove-list-icon" />
      </button>
    </div>
    <div class="card-body">
      <draggable v-model="list" chosen-class="ghost" :group="{ name: 'card' }" handle=".card-block" @dragStart="onStart" @dragEnd="onEnd">
        <transition-group
          type="transition"
          :name="'card-transition'"
          v-bind:css="false"
        >
          <div v-for="item in list" :key="item.id" class="card-transition-item">
            <item :item="item"></item>
          </div>
        </transition-group>
      </draggable>
      <div class="card-block-add" v-if="showAddTaskPanel">
        <input placeholder="Type task name..." @keydown="(e) => onInput(e)">
        <span class="task-panel-info"><b>&#8629;</b> to save, <b>tab</b> to open</span>
      </div>
    </div>
    <div class="card-footer">
      <button class="add-button" @click="showAddTaskPanel=true" title="Add Task">+ Add Task</button>
    </div>
    <add-task :show="showTask" :setShow="setShowTask" :statusId="id" :taskTitle="task_title" />
    <MessageBox :show="isMessage" :setShow="setIsMessage" comment="Do you delete this board?" type="yesno" @draggable = "false" :run="deleteStatus"/>
  </div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import TaskLaneItem from './TaskLaneItem';
import MessageBox from './MessageBox';
import AddTaskPanel from './AddTaskPanel';

export default {
  name: 'TaskLane',
  props: ['title', 'id'],
  components: {
    item: TaskLaneItem,
    draggable: VueDraggableNext,
    MessageBox,
    "add-task": AddTaskPanel,
  },
  computed: {
    itemCount() {
      const tasks = this.list;
      if (tasks.length === 0) return '';
      if (tasks.length === 1) return '1 task';
      return `${tasks.length} tasks`;
    },
    list: {
      get() {
        const tasks = this.$store.state.tasks;
        return tasks.filter((val) => (val.status === this.id && val.parent === null));
      },
      set(value) {
        this.$store.dispatch('updateTasks', {value, id: this.id});
      },
    },
  },
  data() {
    return {
      task_title: "",
      isMessage: false,
      showTask: false,
      showAddTaskPanel: false,
    };
  },
  methods: {
    deleteStatus() {
      this.$store.dispatch('deleteBoardStatus', this.id);
    },
    setIsMessage(val) { 
      this.isMessage = val; 
    },
    onStart() {
      const html = document.getElementsByTagName('html').item(0);
      html.className = "";
    },
    onEnd() {
      const html = document.getElementsByTagName('html').item(0);
      html.className = "";
    },
    setShowTask(val) {
      this.showTask = val;
    },
    onInput(event) {
      if(event.key === 'Enter') {
        this.$store.dispatch('addTask', {
          title: event.target.value,
          description: '',
          start: new Date().toISOString().slice(0, 10),
          end: new Date().toISOString().slice(0, 10),
          estimate_time: 3600,
          color: 1,
          status: this.id,
        });
        this.showAddTaskPanel = false;
      }
      if(event.key === 'Tab') {
        this.task_title = event.target.value;
        this.setShowTask(true);
        this.showAddTaskPanel = false;
      }
      if(event.key === 'Escape') this.showAddTaskPanel = false;
    },
  }
};
</script>

<style>
  .card-body > * {
    min-height: 50px;
  }
</style>
