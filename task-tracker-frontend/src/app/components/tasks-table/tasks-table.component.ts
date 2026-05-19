import { Component, inject } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { Task } from '../../core/models/task';
import { TasksService } from '../../core/services/tasks.service';
import { Dialog } from '@angular/cdk/dialog';
import { CreateTaskFormComponent } from '../create-task-form/create-task-form.component';
import { ConfirmTaskRemoveComponent } from '../confirm-task-remove/confirm-task-remove.component';
@Component({
  selector: 'app-tasks-table',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent {
  private tasksService = inject(TasksService); 
  private dialog = inject(Dialog);
  openStatusDropdownTaskId: number | null = null;
  openDescrDropdownTaskId: number | null = null;
  activeFilterButton: string = 'ALL';

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  ngOnInit(){
    this.getTasks();
  }

  openCreateTaskForm(){
    const dialog = this.dialog.open(CreateTaskFormComponent, {
      disableClose: true,
      panelClass: [
        'w-full',
        'overflow-y-auto'
      ]
    });

    dialog.closed.subscribe(result => {
      if(result === true){
        this.getTasks();
      }
    })
  }

  getTasks(){
    this.tasksService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.tasks,
        this.filteredTasks = data.tasks
      },
      error: (err) => {
        console.error('Failed to create task:', err);
      } 
    })
  } 
  
  removeTask(id: number){
    const dialog = this.dialog.open(ConfirmTaskRemoveComponent, {
      data: {id: id}
    })  

    dialog.closed.subscribe(result => {
      if(result === true){
        this.getTasks();
      }
    })
  }

  updateStatus(id: number, task: string){
    this.tasksService.updateStatus(id, task).subscribe({
      next: (response) => {
        console.log(response.message);
        this.getTasks();
        this.openStatusDropdownTaskId = null;
      },
      error: (err) => {
        console.error('Failed to create task:', err);
      }
    })
  }

  toggleStatusDropdown(taskId: number) {
    if(this.openStatusDropdownTaskId === taskId){
      this.openStatusDropdownTaskId = null;
    }else{
      this.openStatusDropdownTaskId = taskId;
    }
  }

  toggleDescriptionDropdown(taskId: number){
    if(this.openDescrDropdownTaskId === taskId){
      this.openDescrDropdownTaskId = null;
    }else{
      this.openDescrDropdownTaskId = taskId;
    }
  }

  setFilterButtonActive(status: string){
    this.activeFilterButton = status;
    if(this.activeFilterButton === 'ALL'){
      this.filteredTasks = this.tasks;
    }else{
      this.filteredTasks = this.tasks.filter(task => task.status === this.activeFilterButton)
    }
  
  }

  console(){
    console.log(this.tasks);
  }
}
