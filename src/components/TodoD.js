import { ImBin } from "react-icons/im";
import { useDispatch } from "react-redux";
import { deleteDataAsync } from "../redux/Slice";
import { completedIn } from "../utility/other";

export default function TodoD({ todo }) {
  const dispatch = useDispatch();
  function deleteTodo(todo) {
    dispatch(deleteDataAsync({ todo }));
  }

  return (
    <div className="flex justify-between  items-center text-xl h-[3rem] bg-slate-300 px-2">
      <div className="w-[45%]  truncate ">{todo.task}</div>

      <div className="flex items-center  gap-4">
        <div className="flex flex-col text-xs items-center">
          <span className="font-semibold">completed in </span>
          <span>
            {" "}
            {completedIn(todo.created_at, todo.done_at) + " min"}
          </span>{" "}
        </div>

        <div className="flex flex-col text-xs">
          <span className="font-semibold">created at </span>
          <span>{todo.created_at}</span>{" "}
        </div>
        <div className="flex flex-col text-xs">
          <span className="font-semibold">done at </span>
          <span>{todo.done_at}</span>{" "}
        </div>
        <ImBin
          className="cursor-pointer hover:animate-bounce"
          onClick={() => deleteTodo(todo)}
        />
      </div>
    </div>
  );
}
