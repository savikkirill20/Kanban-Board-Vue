<template>
  <div class="menubar">
    <div class="left">
      <div class="dropdown">
        <button class="dropbtn">Board</button>
        <div class="dropdown-content">
          <button 
            v-for="value in this.$store.state.board" 
            :key="value.id" 
            @click="setBoard(value.id)" 
            v-bind:style="[value.id === Number(this.$route.params.id) ? {fontWeight: 'bold'} : {}]"
          >
            {{value.board_title}}
          </button>
        </div>
      </div>
      <ToggleButton v-model="toggle" />
      <MenuTimer v-if="this.$store.state.isMenuTimer" />
    </div>
    <div class="right">
      <button class="menu-button" @click="setShowBoard(true)">+ Add New Board</button>
    </div>
    <add-board :show="showBoard" :setShow="setShowBoard" />
    <MessageBox :show="isTimerMessage" :setShow="setIsTimerMessage" comment="Work Timer is running. Try again later." type="alert" draggable="false" />
  </div>
</template>

<script>
import AddBoardPanel from './AddBoardPanel';
import ToggleButton from './ToggleButton';
import MenuTimer from './MenuTimer';
import MessageBox from './MessageBox';

export default {
  name: 'MenuBar',
  components: {
    "add-board": AddBoardPanel,
    ToggleButton,
    MenuTimer,
    MessageBox,
  },
  data: () => ({
    showBoard: false,
    isToggle: false,
    isTimerMessage: false,
  }),
  computed: {
    toggle: {
      get() {
        return this.isToggle;
      },
      set(value) {
        this.$store.dispatch('resetToggle', value);
        this.isToggle = value;
      }
    }
  },
  methods: {
    setShowBoard(val) {
      this.showBoard = val;
    },
    setBoard(val) {
      if(!this.$store.state.isWorkCount) {
        const killId = setInterval(() => { for(let i = killId; i > 0; i--) clearInterval(i); }, 0);
        document.title = 'Kanban Board';
        this.$store.dispatch('changeBoard', val);
        this.$router.push(`/board/${val}`);
        this.$store.dispatch('resetMenuTimer', 0);
      } else this.setIsTimerMessage(true);
    },
    setIsTimerMessage(val) { 
      this.isTimerMessage = val; 
    },
  },
};
</script>
