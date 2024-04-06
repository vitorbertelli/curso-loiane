import { Directive, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true
})
export class HighlightDirective {
  
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor;
  }

  @HostBinding("style.backgroundColor") backgroundColor: string = 'white';

  @Input() defaultColor: string = "white";
  @Input('highlight') highlightColor: string = "white";

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  constructor() { }

}
