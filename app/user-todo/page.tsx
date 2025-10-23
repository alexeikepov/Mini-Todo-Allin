import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainComp from "@/todos/todo";
import { getUserFullData } from "@/todos/action";

export default async function UserTodoPage() {
  const { todos } = await getUserFullData();

  return <MainComp todos={todos} />;
}
