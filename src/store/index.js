import { createStore } from 'vuex';
import actions from "./actions";
import mutations from "./mutations";

const state = {
  board: [],
  boardStatus: [],
  tasks: [],
  tasklog: [],
  currentBoard: 0,
  isToggle: false,
  isTimer: false,
  isMenuTimer: false,
  timerTaskID: 0,
  workCount: 30,
  breakCount: 10,
  isWorkCount: false,
  isBreakCount: false,
  priority: [
    {name: 'Easy', color: 'background-color: #50c4f2'},
    {name: 'Medium', color: 'background-color: #8ff580'},
    {name: 'High', color: 'background-color: #f2e641'},
    {name: 'Very-High', color: 'background-color: #f29057'},
    {name: 'Priority', color: 'background-color: #D94E41'},
  ],
};

export default createStore({
  state,
  actions,
  mutations,
});
