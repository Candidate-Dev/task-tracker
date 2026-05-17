import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksDashboardComponent } from './pages/tasks-dashboard/tasks-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-tracker-frontend';
}
