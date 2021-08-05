<template>
  <div class="card-block" :style="this.$store.state.priority[item.color - 1].color" :title="item.description ? item.description : ''">
    <div class="card-top">
      <i class="fa fa-trash task-icon" @click="setIsMessage(true)" title="Remove" />
      <i class="fa fa-navicon task-icon" @click="setShowTask(true)" title="Select" />
      <i class="fa fa-clock-o task-icon" @click="onTimer" title="Timer" />
      <h5 class="card-title">
        <span class="card-id">#{{item.id}}</span>
        {{item.title}}
      </h5>
    </div>
    <div v-if="this.$store.state.isToggle" class="card-detail">
      <div class="card-description">
        {{item.description ? item.description : ''}}
      </div>
      <div v-for="(element, index) in getMilestones" :key="index" class="card-milestone">
        {{element.title}}
      </div>
      <div class="card-time">
        <div>{{item.start ? 'Start: ' + item.start : ''}}</div>
        <div>{{item.end ? 'End: ' + item.end : ''}}</div>
      </div>
      <div class="card-time">
        <div>Estimated: {{item.estimate_time ? item.estimate_time : ''}}</div>
        <div>Worktime: {{item.worktime ? item.worktime : '00:00:00'}}</div>
      </div>
    </div>
  </div>
  <add-task :show="showTask" :setShow="setShowTask" :id="item.id" />
  <MessageBox :show="isMessage" :setShow="setIsMessage" comment="Do you delete this task?" type="yesno" draggable="false" :run="deleteItem" />
  <MessageBox :show="isTimerMessage" :setShow="setIsTimerMessage" comment="Work Timer is running. Try again later." type="alert" draggable="false" />
</template>

<script>
import MessageBox from './MessageBox';
import AddTaskPanel from './AddTaskPanel';

export default {
  name: 'TaskLaneItem',
  props: ['item'],
  components: {
    "add-task": AddTaskPanel,
    MessageBox
  },
  data() {
    return {
      isMessage: false,
      isTimerMessage: false,
      showTask: false,
    };
  },
  computed: {
    getMilestones() {
      const subTasks = this.$store.state.tasks.filter(val => val.parent === this.item.id);
      return subTasks;
    },
  },
  methods: {
    deleteItem() {
      this.$store.dispatch('deleteTask', this.item.id);
    },
    setIsMessage(val) { 
      this.isMessage = val; 
    },
    setIsTimerMessage(val) { 
      this.isTimerMessage = val; 
    },
    setShowTask(val) {
      this.showTask = val;
    },
    onTimer() {
      if(!this.$store.state.isWorkCount) {
        const killId = setInterval(() => { for(let i = killId; i > 0; i--) clearInterval(i); }, 0);
        this.$store.dispatch('resetMenuTimer', this.item.id);
      } else this.setIsTimerMessage(true);
    },
  },
};
</script>
