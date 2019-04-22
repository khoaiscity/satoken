import { Directive, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[number]',
  providers: [NgModel],
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(blur)': 'onBlur()'
  }
})

export class NumberDirective {

  constructor(private el: ElementRef) {
  }

  value = '';

  onInputChange(value) {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.value = value;
    }
    this.updateValue(this.value);
  }

  onBlur() {
    if (this.value.charAt(this.value.length - 1) === '.' || this.value === '-') {
      this.updateValue(this.value.slice(0, -1));
    }
  }

  private updateValue(value: string) {
    this.el.nativeElement.value = value;
  }
}
