//import axios from 'axios';

/* You can use api with your backend */
// const urls  = {
//   board: "https://.../tasks/board/",
//   boardStatus: "https://.../tasks/boardstatus/",
//   task: "https://.../tasks/task/",
//   tasklog: "https://.../tasks/tasklog/",
// };

// const getBoard = () => (axios.get(urls.board));
// const addBoard = (data) => (axios.post(urls.board, data));
// const editBoard = (id, data) => (axios.put(urls.board + id, data));
// const deleteBoard = (id) => (axios.delete(urls.board + id));

// const getBoardStatus = () => (axios.get(urls.boardStatus));
// const addBoardStatus = (data) => (axios.post(urls.boardStatus, data));
// const editBoardStatus = (id, data) => (axios.put(urls.boardStatus + id, data));
// const deleteBoardStatus = (id) => (axios.delete(urls.boardStatus + id));

// const getTask = () => (axios.get(urls.task));
// const addTask = (data) => (axios.post(urls.task, data));
// const editTask = (id, data) => (axios.put(urls.task + id, data));
// const deleteTask = (id) => (axios.delete(urls.task + id));

// const getTasklog = () => (axios.get(urls.tasklog));
// const addTasklog = (data) => (axios.post(urls.tasklog, data));
// const editTasklog = (id, data) => (axios.put(urls.tasklog + id, data));
// const deleteTasklog = (id) => (axios.delete(urls.tasklog + id));

/* Use local temporary data */
let db = {
  board: [{id: 1, board_title: 'Test Board'}],
  boardStatus: [],
  task: [],
  taskLog: []
};

const newId = list => (list.length > 0 ? Math.max(...list.map(val => val.id)) + 1 : 1);

const getBoard = () => (db.board);
const addBoard = (data) => { db.board = [...db.board, {...data, id: newId(db.board)}]; return {...data, id: newId(db.board)}; };
const editBoard = (id, data) => { deleteBoard(id); db.board = [...db.board, {...data, id: id}]; return {...data, id: id}; };
const deleteBoard = (id) => { db.board = db.board.filter(val => val.id != id)};

const getBoardStatus = () => (db.boardStatus);
const addBoardStatus = (data) => { db.boardStatus = [...db.boardStatus, {...data, id: newId(db.boardStatus)}]; return {...data, id: newId(db.boardStatus)}; };
const editBoardStatus = (id, data) => { deleteBoardStatus(id); db.boardStatus = [...db.boardStatus, {...data, id: id}]; return {...data, id: id}; };
const deleteBoardStatus = (id) => { db.boardStatus = db.boardStatus.filter(val => val.id != id)};

const getTask = () => (db.task);
const addTask = (data) => { db.task = [...db.task, {...data, id: newId(db.task)}]; return {...data, id: newId(db.task)}; };
const editTask = (id, data) => { deleteTask(id); db.task = [...db.task, {...data, id: id}]; return {...data, id: id}; };
const deleteTask = (id) => { db.task = db.task.filter(val => val.id != id)};

const getTasklog = () => (db.taskLog);
const addTasklog = (data) => { db.taskLog = [...db.taskLog, {...data, id: newId(db.taskLog)}]; return {...data, id: newId(db.taskLog)}; };
const editTasklog = (id, data) => { deleteTasklog(id); db.taskLog = [...db.taskLog, {...data, id: id}]; return {...data, id: id}; };
const deleteTasklog = (id) => { db.taskLog = db.taskLog.filter(val => val.id != id)};

export default { 
  getBoard, addBoard, editBoard, deleteBoard,
  getBoardStatus, addBoardStatus, editBoardStatus, deleteBoardStatus,
  getTask, addTask, editTask, deleteTask,
  getTasklog, addTasklog, editTasklog, deleteTasklog
};
