import dispatcher from "../dispatcher";

export function changeLevel(level_num) {
  dispatcher.dispatch({
    type: "CHANGE_LEVEL",
    level_num
  });
}
