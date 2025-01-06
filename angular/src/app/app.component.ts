import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ToolbarModule} from 'primeng/toolbar';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {TodoList} from './TodoList';
import {TodoItem} from './TodoItem';
import {
  MatCell,
  MatCellDef,
  MatColumnDef, MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow,
  MatHeaderRowDef, MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RippleModule, ToolbarModule, OverlayBadgeModule, InputTextModule, FormsModule, MatIcon, MatTable, MatCheckbox, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatColumnDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow],
  template: `
    <div>
      <p-toolbar>
        <!--    Toolbar -->
        <div class="flex flex-row w-full justify-between items-center mx-3">
          <div class="m-auto text-center flex-1">
            <div class="text-5xl font-bold">Todo List</div>
          </div>
          <p-overlay-badge [value]="itemsCount">
            <mat-icon class="scale-150">receipt</mat-icon>
          </p-overlay-badge>
        </div>
      </p-toolbar>
      <!--    Add Todo panel -->
      <div class="flex flex-row justify-between w-[100%] py-[15px] px-[5px] border-2 border-green-500">
        <input type="text" pInputText [(ngModel)]="newTodoInput" class="flex-1 m-1"/>
        <p-button label="Add" [rounded]="true" [raised]="true" size="large" class="min-w-[150px]" fluid
                  (click)="addItem(newTodoInput); newTodoInput='';"
        />
      </div>
      <div class="flex flex-col items-center gap-2">
      </div>

      <div class="tableContainer">
        <table mat-table [dataSource]="items" class="mat-elevation-z3 w-full">
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>#</th>
            <td mat-cell *matCellDef="let i = index">{{ i + 1 }}</td>
          </ng-container>
          <ng-container matColumnDef="task">
            <th mat-header-cell *matHeaderCellDef>Task</th>
            <td mat-cell *matCellDef="let item"> {{ item.task }}</td>
          </ng-container>

          <ng-container matColumnDef="done">
            <th mat-header-cell *matHeaderCellDef>Done</th>
            <td mat-cell *matCellDef="let item">
              <mat-checkbox [(ngModel)]="item.complete" color="primary">
                <!-- {{ item.complete }} -->
              </mat-checkbox>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="['id', 'task', 'done']"></tr>
          <tr mat-row *matRowDef="let row; columns: ['id', 'task', 'done'];"></tr>
        </table>
      </div>

    </div>
  `
})
export class AppComponent {
  newTodoInput: string;

  private list = new TodoList("Bob", [
    new TodoItem("Go for run", true),
    new TodoItem("Get flowers"),
    new TodoItem("Collect tickets"),
  ])

  get username(): string {
    return this.list.name;
  }

  get itemsCount(): number {
    return this.list.items.filter(item => !item.complete).length;
  }

  get items(): readonly TodoItem[] {
    return this.list.items;
  }

  addItem(newItem: string):void {
    if (newItem != "") {
      this.list.addItem(newItem);
    }
    console.log(this.items);
  }

  showAlert(value: any) {
    alert(value);
  }
}
