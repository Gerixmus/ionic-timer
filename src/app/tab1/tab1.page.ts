import { Component } from '@angular/core';
import { TimerService } from '../timer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedTime: string = "00:00:00"
  soundEnabled: boolean = false;
  backgroundColor: any;
  color: any;

  constructor(private timerService: TimerService, private router: Router) {}

  public pickerColumns = [
    {
      name: 'hours',
      options: Array.from({ length: 24 }, (_, index) => {
      const hours = index;
      return {
        text: hours.toString().padStart(2, '0'),
        value: hours.toString(),
      };
    }),
    },
    {
      name: 'minutes',
      options: Array.from({ length: 60 }, (_, index) => {
      const minutes = index;
      return {
        text: minutes.toString().padStart(2, '0'),
        value: minutes.toString(),
      };
    }),
    },
    {
      name: 'seconds',
      options: Array.from({ length: 60 }, (_, index) => {
      const seconds = index;
      return {
        text: seconds.toString().padStart(2, '0'),
        value: seconds.toString(),
      };
    }),
    },
  ];

  public pickerButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
    },
    {
      text: 'Confirm',
      handler: (value: { hours: { text: any, value: any; }; minutes: { text: any, value: any; }; seconds: { text: any, value: any; }; }) => {
        console.log(`${value.hours.text}:${value.minutes.text}:${value.seconds.text}`);
        this.selectedTime = value.hours.text + ":" + value.minutes.text + ":" + value.seconds.text
      },
    },
  ];

  submitTime() {
    const [hours, minutes, seconds] = this.selectedTime.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      this.timerService.setSettings({timer: totalSeconds, color: this.color, backgroundColor: this.backgroundColor, sound: this.soundEnabled});
      this.timerService.setStarted(false);
      this.router.navigateByUrl('/tabs/tab2');
    }
  }
}
