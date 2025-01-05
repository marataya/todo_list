import {TodoItem} from "./TodoItem.ts";

export class TodoList {
    constructor(public user: string, private todoItems: TodoItem[]) {}

    get items(): readonly TodoItem[] {
        return this.items;
    }

    addItem(task: string) {
        this.todoItems.push(new TodoItem(task, false));
    }
}