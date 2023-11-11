import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new BehaviorSubject<string>("00:00");

  setTimer(seconds: string) {
    this.timerSubject.next(seconds);
  }

  getTimer(): Observable<string> {
    return this.timerSubject.asObservable();
  }

  constructor() { }
}
