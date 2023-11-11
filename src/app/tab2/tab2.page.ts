import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  timerSubscription: Subscription | undefined;
  timer: number = 0;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timerService.getTimer().subscribe((time) => {
      const [minutes, seconds] = time.split(':').map(Number);
      this.timer = minutes * 60 + seconds;
    });
  }

  startTimer()  {
    this.timerSubscription?.unsubscribe();

    this.timerSubscription = interval(1000).subscribe(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.timerSubscription?.unsubscribe();
        this.timer = 0;
      }
    });
  }

  stopTimer() {
    this.timerSubscription?.unsubscribe();
  }

  formatTime(seconds: number): string {
    const remMinutes: number = Math.floor(seconds / 60);
    const remSeconds: number = seconds % 60;

    const formattedMinutes: string = String(remMinutes).padStart(2, '0');
    const formattedSeconds: string = String(remSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
