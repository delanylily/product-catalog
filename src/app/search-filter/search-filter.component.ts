import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators'
@Component({
  selector: 'search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.less']
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  @Input() value: string;
  @Input() placeholder: string;
  inputSubscription: Subscription;
  inputChanged: Subject<string> = new Subject<string>();
  @Output() changeEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.inputSubscription = this.inputChanged.pipe(
      debounceTime(1000),
      tap((value) => {
        this.changeEvent.emit(value)
      })
    ).subscribe();
  }

  onKeyUp(event): void {
    this.inputChanged.next(event.target.value);
    console.log(event)
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe();
  }

}
