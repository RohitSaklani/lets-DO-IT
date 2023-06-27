import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDataAsync } from "../redux/Slice";
import { useNavigate } from "react-router-dom";

export default function TodoAdd() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState(3);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  function addTodo(e) {
    e.preventDefault();

    if (user !== null) {
      dispatch(addDataAsync({ todo, priority }));
    } else {
      navigate("/signup");
    }
    setTodo("");
  }

  return (
    <div className="w-full h-[3rem] sm:h-[3.5rem]   box-border my-3 sm:m-3">
      <form
        onSubmit={addTodo}
        className="w-full h-full flex  justify-center  gap-5"
      >
        <div className="flex justify-between w-[80%] sm:w-[45%] min-h-full text-xl sm:text-2xl rounded-md border-2 border-slate-400  px-3 text-slate-700 ">
          <input
            className="w-[80%] h-full outline-none"
            type="text"
            placeholder="Add your todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
          ></input>
          <div className="flex flex-col items-center justify-center w-[15%]  border-slate-400">
            <span className="text-xs font-semibold text-rose-400">
              Priority
            </span>
            <select
              className="text-lg outline-none"
              name="priority"
              id="prioritys"
              onClick={(e) => setPriority(e.target.value)}
            >
              <option value="3">Low</option>
              <option value="2">Mid</option>
              <option value="1">High</option>
            </select>
          </div>
        </div>
        <button className="text-3xl sm:text-4xl text-white rounded-lg bg-gradient-to-r from-teal-500 to-teal-200 w-[3rem] sm:w-[4rem] flex justify-center items-center hover:shadow-md hover:shadow-teal-300 ease-out duration-150">
          +
        </button>
      </form>
    </div>
  );
}
