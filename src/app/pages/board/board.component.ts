import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Dialog } from '@angular/cdk/dialog';
import { toDo, Column } from '../../models/todo.model';
import { TodoDialogComponent } from '../../components/todo-dialog/todo-dialog.component';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
    `
    /* Animate items as they're being sorted. */
    .cdk-drop-list-dragging .cdk-drag {
    transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    /* Animate an item that has been dropped. */
    .cdk-drag-animating {
    transition: transform 300ms cubic-bezier(0, 0, 0.2, 1);
    }
    `
  ]
})
export class BoardComponent {

  columns: Column[] = [
    {
      title: 'ToDo',
      todos: [
        {
      id: '1',
      title: 'Empezando estadia'
        },
        {
      id: '2',
      title: 'Proceso estadia'
        }
      ]
    },
    {
      title: 'Doing',
      todos: [
        {
      id: '3',
      title: 'Termiando estadia'
        }
      ]
    },
    {
      title: 'Done',
      todos: [
        {
      id: '4',
      title: 'Titulación'
        }
      ]
    }
  ];
  todos: toDo[] = [];
  doing: toDo[] = [];
  done: toDo[] = [];

  constructor(
    private dialog: Dialog
  ) { }

  drop(event: CdkDragDrop<toDo[]>) {
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  addColumn() {
    this.columns.push({
      title: 'New Column',
      todos: [],
    });
  }

  openDialog(todo: toDo){
    const dialogRef = this.dialog.open(TodoDialogComponent, {
      minWidth: '300px',
      maxWidth: '50%',
      autoFocus: false,
      data: {
        todo: todo,
      }
    });
    dialogRef.closed.subscribe(output => {
      console.log(output);
    })
  }
}
