import { Component } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  selectedTime: string = "00:00";

  pickedTime: string = "00:00:00"

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
        console.log(`${value.hours.text} ${value.minutes.text} ${value.seconds.text}`);
        this.pickedTime = value.hours.text + ":" + value.minutes.text + ":" + value.seconds.text
      },
    },
  ];

  constructor(private timerService: TimerService) {}

  submitTime() {
    console.log("Selected Time:", this.selectedTime);
    // const [hours, minutes] = this.selectedTime.split(':').map(Number);
    // const seconds = hours * 3600 + minutes * 60;

    this.timerService.setTimer(this.selectedTime);

    
  }
}
