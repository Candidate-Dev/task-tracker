import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../../core/services/tasks.service';
import { Task } from '../../core/models/task';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-create-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-task-form.component.html',
  styleUrl: './create-task-form.component.scss'
})
export class CreateTaskFormComponent {
  private formBuilder = inject(FormBuilder);
  private tasksService = inject(TasksService);
  private dialogRef = inject(DialogRef);
  taskForm = this.formBuilder.group({
    title: ['', Validators.required],

    status: [
      { value: 'PENDING', disabled: true }
    ],

    description: [''],

    due_datetime: ['', Validators.required]
  });

  onSubmit(){
    if(this.taskForm.valid){
      const newTask = this.taskForm.getRawValue() as Task;
      this.tasksService.createTask(newTask).subscribe({
      next: (response) => {
        console.log(response.message);
        this.closeDialog(); 
      },
      error: (err) => {
        console.error('Failed to create task:', err);
      }
    })
    
    }
    
  }

  closeDialog(){
    this.dialogRef.close(true);
  }

}
