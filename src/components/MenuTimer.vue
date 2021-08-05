<template>
  <div class="menu-timer">
    <p>{{getTitle}}</p>
    <button class="modal-step-button" @click="onPlay" :title="getPlayTitle">
      <i class="fa fa-play" />
    </button>
    <button class="modal-step-button" @click="onStop" title="Stop">
      <i class="fa fa-stop" />
    </button>
    <button class="modal-step-button" @click="this.$store.dispatch('resetTimer')" title="Show timer">
      <i class="fa fa-navicon" />
    </button>
  </div>
  <Timer v-if="this.$store.state.isTimer"/>
</template>

<script>
import Timer from './Timer';

export default {
  name: 'MenuTimer',
  components: {
    Timer,
  },
  data() {
    return {
      count: null,
      startTime: null,
    };
  },
  created() {
    window.addEventListener('beforeunload', this.onBeforeClose);
  },
  computed: {
    getTitle() {
      let title = this.$store.state.isWorkCount ? 'Work on' : this.$store.state.isBreakCount ? 'Break on' : 'Task';
      title += ' #' + this.$store.state.timerTaskID;
      title += this.count === null ? '' : ' - ' + this.formatCount;
      return title;
    },
    getPlayTitle() {
      const title = this.$store.state.isWorkCount ? 'Start break' : 'Play';
      return title;
    },
    formatCount() {
      let minutes = Math.floor(parseInt(this.count, 10) / 60);
      let seconds = parseInt(this.count, 10) - minutes * 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return `${minutes}:${seconds}`
    },
  },
  methods: {
    onPlay() {
      if(this.getPlayTitle === 'Play') {
        this.$store.dispatch('setWorkRun', true);
        this.count = this.$store.state.workCount * 60;
        const nowDate = new Date();
        this.startTime = nowDate.toISOString().slice(0, 11) + nowDate.toTimeString().slice(0, 5);
        const killId = setInterval(() => { for(let i = killId; i > 0; i--) clearInterval(i); }, 0);
        setInterval(() => {
          this.count -= 1;
          if(this.count === 0) {
            this.count = this.$store.state.workCount * 60;
            const bellSound = new Audio(require('../assets/bell.mp3'));
            bellSound.play();
          }
          document.title = 'Kanban Board ( Work: ' + this.formatCount + ' )';
        }, 1000);
      } else {
        this.onSave();
        this.$store.dispatch('setWorkRun', false);
        this.$store.dispatch('setBreakRun', true);
        this.count = this.$store.state.breakCount * 60;
        this.startTime = null;
        const killId = setInterval(() => { for(let i = killId; i > 0; i--) clearInterval(i); }, 0);
        setInterval(() => {
          this.count -= 1;
          if(this.count === 0) {
            this.count = this.$store.state.breakCount * 60;
            const breakSound = new Audio(require('../assets/break.mp3'));
            breakSound.play();
          }
          document.title = 'Kanban Board ( Break: ' + this.formatCount + ' )';
        }, 1000);
      }
    },
    onStop() {
      this.onSave();
      this.$store.dispatch('setWorkRun', false);
      this.$store.dispatch('setBreakRun', false);
      const killId = setInterval(() => { for(let i = killId; i > 0; i--) clearInterval(i); }, 0);
      this.count = null;
      this.startTime = null;
      document.title = 'Kanban Board';
    },
    onSave() {
      const start_time = this.startTime;
      const nowDate = new Date();
      const end_time = nowDate.toISOString().slice(0, 11) + nowDate.toTimeString().slice(0, 5);
      const task = this.$store.state.timerTaskID;
      //console.log(start_time, end_time, task);
      if(start_time) {
        this.$store.dispatch('addTasklog', {
          start_time,
          end_time,
          task,
        });
      }
    },
    onBeforeClose(event) {
      this.onSave();
      event.preventDefault();
      return 'alert';
    },
  },
};
</script>
