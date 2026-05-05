import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'otto-spinner',
  imports: [ProgressSpinnerModule],
  templateUrl: './otto-spinner.component.html',
  styleUrl: './otto-spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OttoSpinnerComponent {
  readonly ariaLabel = input<string>('loading');
  readonly size = input<string>('50px');
}
