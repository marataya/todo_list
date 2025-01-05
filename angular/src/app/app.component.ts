import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, RippleModule],
  template: `
    <p-button label="Click" />
    <div class="flex justify-center gap-2">
      <div pRipple class="box"
           style="width: 150px; padding: 50px; border: 1px solid rgba(75, 175, 80, 0.3); --p-ripple-background: rgba(75, 175, 80, 0.3)">
        Green
      </div>
      <div pRipple class="box"
           style="width: 150px; padding: 50px; border: 1px solid rgba(255, 193, 6, 0.3); --p-ripple-background: rgba(255, 193, 6, 0.3)">
        Orange
      </div>
      <div pRipple class="box"
           style="width: 150px; padding: 50px; border: 1px solid rgba(156, 39, 176, 0.3); --p-ripple-background: rgba(156, 39, 176, 0.3)">
        Purple
      </div>
    </div>
  `
})
export class AppComponent {}
