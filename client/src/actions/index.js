import axios from "axios";
import { FETCH_USER } from "./types";
//action creator, return a function, make a req, and after the req is
//completed, do the dispatch action
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};
