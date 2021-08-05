import { createRouter, createWebHashHistory } from "vue-router";
import Board from "./views/Board";


export default createRouter({
  routes: [
      /*
      FIXME:  add board id as a parameter to Board. When they switch boards then update the id.
      that way you can email someone a link to the board
       */
    {
      path: "/board/:id",
      component: Board
    },
    {
      path: "/",
      redirect: "/board/1"
    }
  ],
  history: createWebHashHistory(),
});
