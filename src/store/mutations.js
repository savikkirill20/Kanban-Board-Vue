
export default {
  getBoardMutation(state, data) {
    state.board = data;
  },
  getBoardStatusMutation(state, data) {
    state.boardStatus = data;
    state.boardStatus.sort((a, b) => (a.order > b.order) ? 1 : (a.order < b.order) ? -1 : 0);
  },
  getTaskMutation(state, data) {
    state.tasks = data;
    state.tasks.sort((b, a) => (a.task_order > b.task_order) ? 1 : (a.task_order < b.task_order) ? -1 : 0);
    state.currentBoard = state.currentBoard === 0 && state.board.length > 0 ? state.board[0].id : state.currentBoard;
  },
  getTasklogMutation(state, data) {
    state.tasklog = data;
  },
  changeOrderMutation(state, newStatus) {
    const tempStatus = state.boardStatus.filter(val => (!newStatus.some(value => value.id === val.id)));
    state.boardStatus = tempStatus.concat(newStatus);
    
  },
  changeBoardMutation(state, val) {
    state.currentBoard = (val === 0 || val === undefined) && state.board.length > 0 ? state.board[0].id : state.board.length ===0 ? 0 : val;
  },
  addBoardMutation(state, newBoard) {
    state.board.push(newBoard);
  },
  deleteBoardMutation(state, key) {
    delete state.items[key];
  },
  addBoardStatusMutation(state, newStatus) {
    state.boardStatus.push(newStatus);
    state.boardStatus.sort((a, b) => (a.order > b.order) ? 1 : (a.order < b.order) ? -1 : 0);
  },
  deleteBoardStatusMutation(state, id) {
    state.boardStatus = state.boardStatus.filter(val => val.id !== id);
  },
  addTaskMutation(state, task) {
    state.tasks.push(task);
  },
  editTaskMutation(state, task) {
    state.tasks = state.tasks.filter(val => val.id !== task.id).concat(task);
    state.tasks.sort((b, a) => (a.task_order > b.task_order) ? 1 : (a.task_order < b.task_order) ? -1 : 0);
  },
  updateTasksMutation(state, { value, id, movedIndex }) {
    if(movedIndex > -1)
      state.tasks.map((val) => (val.id === value[movedIndex].id ? val.status = id : ''));
    value.map(async (val, index) => {
      value[index].task_order = value.length - index;
    });
    const tempTasks = state.tasks.filter((val) => (!value.some(value => value.id === val.id)));
    state.tasks = tempTasks.concat(value);
    state.tasks.sort((b, a) => (a.task_order > b.task_order) ? 1 : (a.task_order < b.task_order) ? -1 : 0);
  },
  deleteTaskMutation(state, id) {
    state.tasks = state.tasks.filter(val => val.id !== id);
  },
  addTasklogMutation(state, tasklog) {
    state.tasklog.push(tasklog);
  },
  editTaskLogMutation(state, tasklog) {
    state.tasklog = state.tasklog.filter(val => val.id !== tasklog.id).concat(tasklog);
  },
  deleteTasklogMutation(state, id) {
    state.tasklog = state.tasklog.filter(val => val.id !== id);
  },
  resetToggleMutation(state, val) {
    state.isToggle = val;
  },
  resetTimerMutation(state) {
    state.isTimer = !state.isTimer;
  },
  resetMenuTimerMutation(state, id) {
    state.isMenuTimer = id === 0 ? false : true;
    state.timerTaskID = id;
  },
  resetTimerTaskIDMutation(state, id) {
    state.timerTaskID = id;
  },
  changeWorkCountMutation(state, val) {
    state.workCount = val;
  },
  changeBreakCountMutation(state, val) {
    state.breakCount = val;
  },
  setWorkRunMutation(state, val) {
    state.isWorkCount = val;
  },
  setBreakRunMutation(state, val) {
    state.isBreakCount = val;
  },
};