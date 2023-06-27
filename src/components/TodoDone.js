import TodoD from "./TodoD";

export default function TodoDone({ todoList }) {
  return (
    <div className="flex flex-col gap-1 w-[100%] sm:w-[45%]  border-2 border-slate-500 ">
      <div className="flex justify-around  items-center  h-[3rem] text-xl font-semibold bg-slate-300">
        {"COMPLETED(" + todoList.length + ")"}
      </div>{" "}
      {todoList
        .filter((todo) => todo.status == 2)
        .map((todo) => {
          return <TodoD key={todo.id} todo={todo} />;
        })}
    </div>
  );
}
