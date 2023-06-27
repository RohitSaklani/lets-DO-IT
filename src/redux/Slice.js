import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
import { getCurrentDate } from "../utility/other";

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
);

const initialState = {
  loading: false,
  error: null,
  user: null,

  todoList: [],
};

export const getDataAsync = createAsyncThunk(
  "todo/getData",
  async (payload, { getState }) => {
    const state = getState();

    if (state?.todo.user) {
      let { data: todoList } = await supabase
        .from("todos")
        .select()
        .eq("user_id", state?.todo.user);

      return todoList;
    }
  }
);

export const addDataAsync = createAsyncThunk(
  "todo/addData",
  async (payload, { getState }) => {
    const { user } = getState()?.todo;

    const { data: todo, error } = await supabase
      .from("todos")
      .insert({
        task: payload.todo,
        user_id: user,
        priority: payload.priority,
        status: 1,
        created_at: getCurrentDate(),
      })
      .select();

    return todo[0];
  }
);

export const markDoneAsync = createAsyncThunk(
  "todo/markDone",
  async (payload) => {
    const { data: todo } = await supabase
      .from("todos")
      .update({ status: 2, done_at: getCurrentDate() })
      .eq("id", payload.todo.id)
      .select();
    console.log("mark done ", todo[0]);

    return todo[0];
  }
);

export const deleteDataAsync = createAsyncThunk(
  "todo/deleteData",
  async (payload) => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", payload.todo.id);

    return payload.todo;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,

  reducers: {
    clearTodoList: (state, action) => {
      state.todoList = [];
    },
    setUser: (state, action) => {
      state.user = action.payload?.user.id ? action.payload?.user.id : null;

      return state;
    },
  },
  extraReducers: {
    [addDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [addDataAsync.fulfilled]: (state, action) => {
      state.todoList.push(action.payload);
      state.loading = false;
    },
    [addDataAsync.rejected]: (state, action) => {
      state.loading = false;
    },
    [getDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [getDataAsync.fulfilled]: (state, action) => {
      state.todoList = action.payload;
      state.loading = false;
    },
    [getDataAsync.rejected]: (state, action) => {
      console.log(state, action);
      state.loading = false;
    },
    [markDoneAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [markDoneAsync.fulfilled]: (state, action) => {
      const index = state.todoList.findIndex(
        (ele) => ele.id === action.payload.id
      );
      state.todoList[index].status = 2;
      state.todoList[index].done_at = action.payload.done_at;
      state.loading = false;
    },
    [markDoneAsync.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteDataAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteDataAsync.fulfilled]: (state, action) => {
      const data = state.todoList.filter((ele) => ele.id !== action.payload.id);
      state.todoList = data;
      state.loading = false;
    },
    [deleteDataAsync.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export default todoSlice.reducer;

export const { setUser, clearTodoList } = todoSlice.actions;
