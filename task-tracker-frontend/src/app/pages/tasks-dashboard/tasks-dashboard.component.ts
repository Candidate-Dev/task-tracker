import { Component } from '@angular/core';
import { TasksTableComponent } from '../../components/tasks-table/tasks-table.component';

@Component({
  selector: 'app-tasks-dashboard',
  standalone: true,
  imports: [TasksTableComponent],
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss'
})
export class TasksDashboardComponent {

}
