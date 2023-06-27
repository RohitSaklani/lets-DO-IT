import { useSelector, useDispatch } from "react-redux";
import TodoAdd from "./TodoAdd";
import TodoDone from "./TodoDone";
import TodoList from "./TodoList";
import { useEffect } from "react";
import { getDataAsync } from "../redux/Slice";

export default function Home() {
  const { user, todoList } = useSelector((state) => state.todo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user != null) {
      dispatch(getDataAsync());
    }
  }, [user]);

  function getList(status) {
    const temp = todoList.filter((todo) => todo.status === status);
    return temp;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <TodoAdd />
      <div className="flex flex-col px-[3%] gap-5 sm:flex-row sm:justify-around items-start w-full  ">
        <TodoList todoList={getList(1)} />
        <TodoDone todoList={getList(2)} />
      </div>
    </div>
  );
}
