import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoTask } from 'src/app/models/task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  taskList: TodoTask[] = [];

  todoListForm = new FormGroup({
    task: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor() { }

  taskStorage = localStorage.getItem('tasks');

  get task() {
    return this.todoListForm.get('task')!;
  }

  get description() {
    return this.todoListForm.get('description')!;
  }

  ngOnInit(): void {

    if (this.taskStorage == null || this.taskStorage == undefined) {
      localStorage.setItem('tasks', JSON.stringify([]));
    } else {
      let tasks = JSON.parse(this.taskStorage);
      this.taskList = tasks;
    }
  }

  addTask(data: any) {

    this.taskList.push(data);

    localStorage.setItem('tasks', JSON.stringify(this.taskList));

    this.todoListForm.reset();
  }

  removeTask(task: TodoTask) {
    
    const index = this.taskList.indexOf(task);

    if (index > -1) {
      this.taskList.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(this.taskList));
    }
  }

}
