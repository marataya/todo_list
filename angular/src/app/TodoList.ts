import {TodoItem} from './TodoItem';

export class TodoList {
  constructor(public name: string, public todoItems: TodoItem[] = []) {}

  get items(): readonly TodoItem[] {
    return this.todoItems;
  }

  addItem(task: string): void {
    this.todoItems.push(new TodoItem(task));
  }
}
