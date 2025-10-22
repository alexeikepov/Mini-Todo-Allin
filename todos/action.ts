"use server";

import { db } from "@/scripts/db_conn";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  return await db("todos")
    .orderBy("categoryId", "asc")
    .orderBy("createdAt", "desc");
}

export async function addTask(data: any) {
  const { text, categoryId } = data;
  await db("todos").insert({
    text,
    categoryId: Number(categoryId),
  });
  revalidatePath("/");
}

export async function deleteTask(taskId: number) {
  await db("todos").where("id", taskId).del();
  revalidatePath("/");
}

export async function toggleComplete(taskId: number, completed: boolean) {
  const updateData = {
    completed: !completed,
    completedAt: !completed ? new Date() : null,
  };
  await db("todos").where("id", taskId).update(updateData);
  revalidatePath("/");
}

export async function getCategories() {
  return await db("categories").select("*").orderBy("name", "asc");
}

export async function addCategory(data: any) {
  await db("categories").insert(data);
  revalidatePath("/");
}

export async function updateTaskCategory(taskId: number, categoryId: number) {
  await db("todos").where("id", taskId).update({ categoryId });
  revalidatePath("/");
}
