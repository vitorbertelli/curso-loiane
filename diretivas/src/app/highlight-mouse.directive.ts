import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlightMouse]',
  standalone: true
})
export class HighlightMouseDirective {

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'white';
  }

  @HostBinding("style.backgroundColor") backgroundColor: string = 'white';

  constructor() { }

}
