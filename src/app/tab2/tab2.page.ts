import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, interval } from 'rxjs';
import { TimerService } from '../timer.service';
import { AlertController } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';

const circleRadius = 80;
const circleDasharray = 2 * Math.PI * circleRadius;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  percent: BehaviorSubject<number> = new BehaviorSubject(100);

  started: boolean = false;
  timerSubscription: Subscription | undefined;
  settingsSubscription: Subscription | undefined;
  startedSubscription: Subscription | undefined;
  timer: number = 0;
  circleRadius = circleRadius;
  circleDasharray = circleDasharray;
  totalTime: number = 0;
  circleColor!: string;
  backgroundColor!: string;
  sound: boolean = false;

  constructor(private timerService: TimerService, private alertController: AlertController) {}

  ngOnInit() {
    this.settingsSubscription = this.timerService.getSettings().subscribe((settings) => {
      this.timer = settings.timer;
      this.totalTime = settings.timer;
      this.circleColor = settings.color;
      this.backgroundColor = settings.backgroundColor;
      this.sound = settings.sound;
      this.percent.next(0);
    })
    this.startedSubscription = this.timerService.getStarted().subscribe((value) => {
      this.started = value;
      if (value == false) {
        this.timerSubscription?.unsubscribe();
      } 
    })
  }

  async presentAlert(sound: boolean) {
    if (sound) {
      LocalNotifications.schedule({
        notifications: [
          {
            title: 'Timer completed',
            body: 'Go back to application to check the result',
            id: 1
          }
        ]
      });
    }
    const alert = await this.alertController.create({
      header: 'Timer completed',
      // message: 'Press ok to continue',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  startTimer()  {
    if (this.timer > 0) {
      this.timerService.setStarted(true);
      this.timerSubscription = interval(1000).subscribe(() => {
        this.timer--;
        const percentage = ((this.totalTime - this.timer) / this.totalTime) * 100;
        this.percent.next(percentage);
        if (this.timer == 0) {
          this.stopTimer();
          this.presentAlert(this.sound);
          return
        }
      });
    }
  }

  stopTimer() {
    this.timerService.setStarted(false);
    this.timerSubscription?.unsubscribe();
  }

  formatTime(seconds: number): string {
    const remHours: number = Math.floor(seconds / 3600);
    const remMinutes: number = Math.floor(seconds % 3600 / 60);
    const remSeconds: number = seconds % 60;

    const formattedHours: string = String(remHours).padStart(2, '0');
    const formattedMinutes: string = String(remMinutes).padStart(2, '0');
    const formattedSeconds: string = String(remSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  percentageOffset(percent: any) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat)
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
    }
    if (this.startedSubscription) {
      this.startedSubscription.unsubscribe();
    }
  }
}
