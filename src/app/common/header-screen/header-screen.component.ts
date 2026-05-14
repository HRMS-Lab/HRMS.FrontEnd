import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-screen',
  standalone: true,
  imports: [],
  templateUrl: './header-screen.component.html',
  styleUrl: './header-screen.component.scss'
})
export class HeaderScreenComponent {
  @Input() icon: string = '';
  @Input() breadcrumb: string = '';
  @Input() title: string = '';
}
