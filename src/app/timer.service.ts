import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerSubject = new BehaviorSubject<number>(0);

  setTimer(seconds: number) {
    this.timerSubject.next(seconds);
  }

  getTimer(): Observable<number> {
    return this.timerSubject.asObservable();
  }

  constructor() { }
}
