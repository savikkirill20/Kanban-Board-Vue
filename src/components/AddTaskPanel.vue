<template>
  <transition name="modal" v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container-wide">
          <div class="modal-header">
            <slot name="header">
              <h3>{{this.id ? 'Edit this task' : 'Add new task'}}</h3>
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              <input class="modal-input" type="text" v-model="title" placeholder="Title *">
              <textarea class="modal-input" v-model="description" placeholder="Description" />
              <div class="modal-input-group">
                <p>Start: </p>
                <input class="modal-input" type="date" v-model="startDate" :max="endDate">
              </div>
              <div class="modal-input-group">
                <p>End: </p>
                <input class="modal-input" type="date" v-model="endDate" :min="startDate">
              </div>
              <div class="modal-input-group">
                <p>Estimated Time(s): </p>
                <input class="modal-input" type="number" v-model="estimated" step="0.5" min="1">
              </div>
              <div class="modal-input-group">
                <p>Priority: </p>
                <select class="modal-select" v-model="priority">
                  <option v-for="(value, index) in this.$store.state.priority" :key="index" :value="index + 1" :style="value.color">
                    {{value.name}}
                  </option>
                </select>
              </div>
              <div class="modal-input-group">
                <p>Status: </p>
                <select class="modal-select" v-model="status">
                  <option v-for="value in getBoardStatus" :key="value.id" :value="value.id">
                    {{value.title}}
                  </option>
                </select>
              </div>
              <div class="milestones-panel">
                <p>Milestones:</p>
                <draggable v-model="milestones" :group="{ name: 'milestone' }" handle=".drag-icon">
                  <div v-for="(element, index) in milestones" :key="index" class="modal-input-group">
                    <i class="fa fa-ellipsis-v drag-icon" />
                    <input type="checkbox" v-model="element.checked">
                    <input class="modal-input" v-model="element.title" @input="(e) => editMilestone(e, element.id)">
                    <i 
                      class="fa fa-trash remove-icon"
                      @click="() => onDelete(element)"
                    />
                  </div>
                </draggable>
                <div class="modal-input-group">
                  <i class="fa fa-ellipsis-v drag-icon" />
                  <input type="checkbox" disabled>
                  <input class="modal-input" @change="(e) => addNewMilestone(e)">
                  <i class="fa fa-trash remove-icon" />
                </div>
              </div>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="save">
                {{buttonTitle}}
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
import { VueDraggableNext } from 'vue-draggable-next';

export default {
  name: 'AddTaskPanel',
  props: ['show', 'setShow', 'id', 'statusId', 'taskTitle'],
  components: {
    MessageBox,
    draggable: VueDraggableNext,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      title: this.taskTitle ? this.taskTitle : '',
      description: '',
      isMessage: false,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      estimated: 0,
      priority: 1,
      status: this.statusId ? this.statusId : 1,
      buttonTitle: this.id ? 'Save' : 'Add',
      parent: null,
    };
  },
  watch: {
    show() {
      this.taskTitle ? this.title = this.taskTitle : '';
    }
  },
  computed: {
    getBoardStatus() {
      return this.$store.state.boardStatus.filter(val => val.board === this.$store.state.currentBoard);
    },
    milestones: {
      get() {
        const subTasks = this.$store.state.tasks.filter(val => val.parent === this.id || val.description === 'unsaved');
        return subTasks.map(val => ({...val, checked: false}));
      },
      set(value) {
        this.$store.dispatch('updateTasks', {value, id: 0});
      }
    },
  },
  methods: {
    initFields() {
      this.title = '';
      this.description = '';
      this.startDate = new Date().toISOString().slice(0, 10);
      this.endDate = new Date().toISOString().slice(0, 10);
      this.estimated = 0;
      this.priority = 1;
      this.status = 1;
      this.setShow(false);
      this.getData();
      this.parent = null;
    },
    close() {
      this.initFields();
      const unsavedMilestones = this.$store.state.tasks.filter(val => val.description === 'unsaved');
      unsavedMilestones.map(val => this.$store.dispatch('deleteTask', val.id));
    },
    save() {
      if (this.title) {
        if(this.id) {
          this.$store.dispatch('editTask', {
            id: this.id,
            title: this.title,
            description: this.description,
            start: this.startDate,
            end: this.endDate,
            estimate_time: this.estimated,
            color: this.priority,
            status: this.status,
            parent: this.parent,
          });
        } else {
          this.$store.dispatch('addTask', {
            title: this.title,
            description: this.description,
            start: this.startDate,
            end: this.endDate,
            estimate_time: this.estimated,
            color: this.priority,
            status: this.status,
            parent: this.parent,
          });
        }
        this.initFields();
      } else this.setIsMessage(true);
    },
    setIsMessage(val) { 
      this.isMessage = val; 
    },
    getData() {
      if(this.id) {
        const taskData = this.$store.state.tasks.filter(val => val.id === this.id);
        this.title = taskData[0].title;
        this.description = taskData[0].description;
        this.startDate = taskData[0].start;
        this.endDate = taskData[0].end;
        this.estimated = taskData[0].estimate_time;
        this.priority = taskData[0].color;
        this.status = taskData[0].status;
      }
    },
    addNewMilestone(e) {
      const title = e.target.value;
      if(title.length > 0) this.$store.dispatch('addMilestone', {title, estimate_time: 3600, description: 'unsaved'});
      e.target.value = '';
    },
    editMilestone(e, id) {
      const title = e.target.value;
      if(title.length === 0) this.$store.dispatch('deleteTask', id);
    },
    onDelete(element) {
      if(element.checked) this.$store.dispatch('deleteTask', element.id);
    },
  },
};
</script>
