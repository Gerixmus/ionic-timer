import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private settingsSubject = new BehaviorSubject<{ timer: number; color: string; backgroundColor: string; sound: boolean;}>({ timer: 0, color: '#000000', backgroundColor: '#f3f3f3', sound: false});
  private isStarted = new BehaviorSubject<boolean>(false);

  setSettings(settings: { timer: number; color: string; backgroundColor: string; sound: boolean;}) {
    this.settingsSubject.next(settings);
  }

  getSettings(): Observable<{ timer: number; color: string; backgroundColor: string; sound: boolean;}> {
    return this.settingsSubject.asObservable();
  }

  setStarted(started: boolean) {
    this.isStarted.next(started);
  }

  getStarted(): Observable<boolean> {
    return this.isStarted.asObservable();
  }

  constructor() { }
}
