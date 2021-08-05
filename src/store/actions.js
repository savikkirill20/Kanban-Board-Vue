import api from "../api";

export default {
  async init({dispatch}) {
    dispatch('getBoard');
    dispatch('getBoardStatus');
    dispatch('getTask');
    dispatch('getTasklog');
  },
  async getBoard({commit}) {
    const data = await api.getBoard();
    commit('getBoardMutation', data);
  },
  async getBoardStatus({commit}) {
    const data = await api.getBoardStatus();
    commit('getBoardStatusMutation', data);
  },
  async getTask({commit}) {
    const data = await api.getTask();
    commit('getTaskMutation', data);
  },
  async getTasklog({commit}) {
    const data = await api.getTasklog();
    commit('getTasklogMutation', data);
  },
  changeOrder({commit}, newStatus) {
    commit('changeOrderMutation', newStatus);
    newStatus.map(async (val, index) => {
      await api.editBoardStatus(val.id, { order: index + 1, board: val.board, title: val.title });
    });
  },
  async addBoard({commit}, newBoard) {
    const data = await api.addBoard(newBoard);
    commit('addBoardMutation', data);
  },
  async addBoardStatus({commit}, newBoardStatus) {
    const data = await api.addBoardStatus(newBoardStatus);
    commit('addBoardStatusMutation', data);
  },
  async deleteBoardStatus({commit}, id) {
    commit('deleteBoardStatusMutation', id);
    await api.deleteBoardStatus(id);
  },
  async addTask({commit}, newTask) {
    const data = await api.addTask(newTask);
    console.log(data);
    commit('addTaskMutation', data);
    const milestones = this.state.tasks.filter(val => val.description === 'unsaved');
    milestones.map(async val => {
      const milestone  = api.editTask(val.id, { title: val.title, parent: data.id, description: '' });
      commit('editTaskMutation', milestone);
    });
  },
  async editTask({commit}, newData) {
    const data = await api.editTask(newData.id, newData);
    commit('editTaskMutation', data);
    const milestones = this.state.tasks.filter(val => val.description === 'unsaved');
    milestones.map(async val => {
      const milestone = api.editTask(val.id, { title: val.title, parent: data.id , description: '' });
      commit('editTaskMutation', milestone);
    });
  },
  async deleteTask({commit}, id) {
    commit('deleteTaskMutation', id);
    await api.deleteTask(id);
  },
  async addMilestone({commit}, milestone) {
    const data = await api.addTask(milestone);
    commit('addTaskMutation', data);
  },
  async updateTasks({commit}, {value, id}) {
    let movedIndex = -1;
    if(id > 0) value.map((val, index) => (val.status !== id ? movedIndex = index : ''));
    commit('updateTasksMutation', {value, id, movedIndex});
    movedIndex > -1 ? await api.editTask(value[movedIndex].id, { status: id, title: value[movedIndex].title }) : '';
    value.map(async (val, index) => {
      await api.editTask(val.id, { task_order: value.length - index, title: val.title });
      value[index].task_order = value.length - index;
    });
    
  },
  async addTasklog({commit}, tasklog) {
    const data = await api.addTasklog(tasklog);
    commit('addTasklogMutation', data);
  },
  async editTasklog({commit}, newData) {
    const data = await api.editTasklog(newData.id, newData);
    commit('editTasklogMutation', data);
  },
  async deleteTasklog({commit}, id) {
    commit('deleteTasklogMutation', id);
    await api.deleteTasklog(id);
  },
  changeBoard({commit}, val) {
    commit('changeBoardMutation', val);
  },
  resetToggle({commit}, val) {
    commit('resetToggleMutation', val);
  },
  resetTimer({commit}) {
    commit('resetTimerMutation');
  },
  resetMenuTimer({commit}, id) {
    commit('resetMenuTimerMutation', id);
  },
  resetTimerTaskID({commit}, id) {
    commit('resetTimerTaskIDMutation', id);
  },
  changeWorkCount({commit}, val) {
    commit('changeWorkCountMutation', val);
  },
  changeBreakCount({commit}, val) {
    commit('changeBreakCountMutation', val);
  },
  setWorkRun({commit}, val) {
    commit('setWorkRunMutation', val);
  },
  setBreakRun({commit}, val) {
    commit('setBreakRunMutation', val);
  },
};