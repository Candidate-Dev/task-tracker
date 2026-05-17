import { Component, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { TasksService } from '../../core/services/tasks.service';
@Component({
  selector: 'app-confirm-task-remove',
  standalone: true,
  imports: [],
  templateUrl: './confirm-task-remove.component.html',
  styleUrl: './confirm-task-remove.component.scss'
})
export class ConfirmTaskRemoveComponent {
  private dialogRef = inject(DialogRef);
  private taskData = inject(DIALOG_DATA);
  private tasksService = inject(TasksService);
  
  removeTask(){
    this.tasksService.removeTask(this.taskData.id).subscribe({
      next: (response) => {
        console.log(response.message);
        this.closeDialog(); 
      },
      error: (err) => {
        console.error('Failed to create task:', err);
      }
    })
  }

  closeDialog(){
    this.dialogRef.close(true);
  }
}
