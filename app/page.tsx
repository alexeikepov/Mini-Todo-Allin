import { getCategories, getTodos } from "@/todos/action";
import MainComp from "@/todos/todo";

export default async function Home() {
  const todos = await getTodos();
  const categories = await getCategories();

  return (
    <div>
      <MainComp todos={todos} categories={categories} />
    </div>
  );
}
