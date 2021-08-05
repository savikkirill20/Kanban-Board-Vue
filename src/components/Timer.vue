<template>
  <transition name="modal">
    <div class="modal-container-timer">
      <div class="modal-body-timer">
        <slot name="body">
          <div class="modal-input-group">
            <p class="p-top"> Todo: </p>
            <select v-model="task_id" @change="this.$store.dispatch('resetTimerTaskID', this.task_id)">
              <option v-for="value in getTasks" :key="value.id" :value="value.id">
                #{{value.id}} - {{value.title}}
              </option>
            </select>
          </div>
          <div class="seperate-line" />
          <div class="modal-input-group">
            <p>Break Duration</p>
            <button class="modal-step-button" @click="onBreak(0)">-</button>
            <input v-model="breakDuration" readonly>
            <button class="modal-step-button" @click="onBreak(1)">+</button>
          </div>
          <div class="seperate-line" />
          <div class="modal-input-group">
            <p>Work Duration</p>
            <button class="modal-step-button" @click="onWork(0)">-</button>
            <input v-model="workDuration" readonly>
            <button class="modal-step-button" @click="onWork(1)">+</button>
          </div>
          <div class="seperate-line" />
          <div class="modal-input-group">
            <button class="modal-step-button-orange" @click="minusNowDate">&lsaquo;</button>
            <input v-model="nowDate" readonly>
            <button class="modal-step-button-orange" @click="plusNowDate">&rsaquo;</button>
          </div>
          <div class="modal-input-group">
            <p class="p-center">Start: </p>
            <input type="time" v-model="startTime">
          </div>
          <div class="modal-input-group">
            <p class="p-center">End: </p>
            <input type="time" v-model="endTime">
          </div>
          <div class="modal-input-group">
            <button class="modal-step-button-full" @click="save">Add time</button>
          </div>
          <div class="seperate-line" />
          <h5>Daily Record</h5>
          <table class="log-detail">
            <tr v-for="log in getTasklog" :key="log.id" :value="log.id">
              <td>{{getTitle(log.task)}}</td>
              <td>{{getTime(log.start_time, log.end_time)}}</td>
              <td><i class="fa fa-trash task-icon" @click="deleteLog(log.id)" title="Remove" /></td>
            </tr>
            <tr v-if="this.getTasklog.length">
              <td />
              <td>Total time : {{getTotalTime()}}</td>
              <td />
            </tr>
          </table>
        </slot>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'Timer',
  components: {
  },
  data() {
    return {
      task_id: this.$store.state.timerTaskID,
      breakDuration: this.$store.state.breakCount,
      workDuration: this.$store.state.workCount,
      startTime: null,
      endTime: null,
      nowDate: new Date().toISOString().slice(0, 10),
    };
  },
  computed: {
    getTasks() {
      const statusArr = this.$store.state.boardStatus.filter(val => val.board === this.$store.state.currentBoard);
      const taskArr = this.$store.state.tasks.filter(val => statusArr.some(value => value.id === val.status));
      taskArr.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0);
      return taskArr;
    },
    getTasklog() {
      const statusArr = this.$store.state.boardStatus.filter(val => val.board === this.$store.state.currentBoard);
      const taskArr = this.$store.state.tasks.filter(val => statusArr.some(value => value.id === val.status));
      const logArr = this.$store.state.tasklog.filter(val => val.start_time.indexOf(this.nowDate) > -1);
      return logArr.filter(val => taskArr.some(value => value.id === val.task));
    },
  },
  methods: {
    getTitle(id) {
      const index = this.$store.state.tasks.findIndex(val => val.id === id);
      return this.$store.state.tasks[index].title;
    },
    getTime(from, to) {
      const strFrom = new Date(from.slice(0, 19));
      const strTo = new Date(to.slice(0, 19));
      const duration = this.getDuration((strTo - strFrom) / 1000);
      return strFrom.toTimeString().slice(0,5) + ' - ' + strTo.toTimeString().slice(0,5) + '\t\t' + duration;
    },
    getDuration(val) {
      let h = Math.trunc(val / 3600);
      let m = Math.trunc((val - h * 3600) / 60);
      m = m === 0 && h === 0 ? 1 : m;
      m = m < 10 ? '0' + m : m;
      h = h < 10 ? '0' + h : h;
      return h + ':' + m + 'h';
    },
    getTotalTime() {
      const duration = this.getTasklog.reduce((total, val) => {
        const strFrom = new Date(val.start_time.slice(0, 19));
        const strTo = new Date(val.end_time.slice(0, 19));
        total += (strTo - strFrom);
        return total;
      }, 0);
      return this.getDuration(duration / 1000);
    },
    onBreak(op) {
      op === 0 ? 
        this.breakDuration = this.breakDuration > 0 ? this.breakDuration - 1 : this.breakDuration :
        this.breakDuration ++;
      this.$store.dispatch('changeBreakCount', this.breakDuration);
    },
    onWork(op) {
      op === 0 ? 
        this.workDuration = this.workDuration > 0 ? this.workDuration - 1 : this.workDuration :
        this.workDuration ++;
      this.$store.dispatch('changeWorkCount', this.workDuration);
    },
    minusNowDate() {
      const newDate = new Date(this.nowDate);
      newDate.setDate(newDate.getDate() - 1);
      this.nowDate = newDate.toISOString().slice(0, 10);
    },
    plusNowDate() {
      const newDate = new Date(this.nowDate);
      newDate.setDate(newDate.getDate() + 1);
      this.nowDate = newDate.toISOString().slice(0, 10);
    },
    deleteLog(id) {
      this.$store.dispatch('deleteTasklog', id);
    },
    close() {
      this.$store.dispatch('resetTimer');
    },
    save() {
      if(this.startTime !== null && this.endTime !== null) {
        if(this.startTime > this.endTime)
          alert("Start time can't be bigger than end time!");
        else{
          const start_time = this.nowDate + 'T' + this.startTime;
          const end_time = this.nowDate + 'T' + this.endTime;
          this.$store.dispatch('addTasklog', {
            start_time,
            end_time,
            task: this.task_id,
          });
        }
      }
      else
        alert('input time');
    },
  },
};
</script>
