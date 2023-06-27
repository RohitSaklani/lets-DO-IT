import Todo from "./Todo";

export default function TodoList({ todoList }) {
  return (
    <div className="flex flex-col gap-1 w-[100%] sm:w-[45%]  border-2 border-slate-500">
      <div className="flex justify-around  items-center  h-[3rem] text-xl font-semibold bg-slate-300">
        {"TODOS(" + todoList.length + ")"}
      </div>{" "}
      {todoList
        .filter((todo) => todo.status === 1)
        .map((todo) => {
          return <Todo key={todo.id} todo={todo} />;
        })}
    </div>
  );
}
