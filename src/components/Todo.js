import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteDataAsync, markDoneAsync } from "../redux/Slice";

export default function Todo({ todo }) {
  const dispatch = useDispatch();
  function markDone(todo) {
    dispatch(markDoneAsync({ todo }));
  }

  function deleteTodo(todo) {
    dispatch(deleteDataAsync({ todo }));
  }
  function getPriority(x) {
    if (x === 1) {
      return (
        <span className=" animate-pulse flex justify-center items-center text-sm text-white w-[3.5rem]  h-[1.5rem] bg-red-600  rounded-xl">
          {"High"}
        </span>
      );
    } else if (x == 2) {
      return (
        <span className=" flex justify-center items-center text-sm text-white w-[3.5rem] h-[1.5rem] bg-yellow-400  rounded-xl">
          {"Mid"}
        </span>
      );
    } else {
      return (
        <span className=" flex justify-center items-center text-sm text-white w-[3.5rem] h-[1.5rem] bg-green-400  rounded-xl">
          {"Low"}
        </span>
      );
    }
  }

  return (
    <div className="flex justify-between  items-center text-xl h-[3rem] bg-slate-300 px-2">
      <div className="w-[45%]  truncate ">{todo.task}</div>
      <div className="flex items-center  gap-4">
        {getPriority(todo.priority)}

        <div className="flex flex-col text-xs">
          <span className="font-semibold">created at </span>
          <span>{todo.created_at}</span>
        </div>
        <button
          onClick={() => markDone(todo)}
          className="ease-in duration-150 text-base font-medium text-white bg-green-600 rounded-md  px-2 py-1 hover:shadow-md hover:shadow-emerald-700"
        >
          Done
        </button>

        <ImBin
          className="cursor-pointer hover:animate-bounce"
          onClick={() => deleteTodo(todo)}
        />
      </div>
    </div>
  );
}
