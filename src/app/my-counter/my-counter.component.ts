import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { increment, decrement, reset } from "../counter.actions";

@Component({
  selector: "app-my-counter",
  templateUrl: "./my-counter.component.html",
  styleUrls: ["./my-counter.component.css"]
})
export class MyCounterComponent implements OnInit {
  count$: Observable<number>;
  currentTime: string;
  myTimer;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select("count"));

    this.myTimer = setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
    }, 1000);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.myTimer);
  }
}
