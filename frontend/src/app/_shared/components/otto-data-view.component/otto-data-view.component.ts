import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Pagination } from '@shared/models/pagination.model';

export interface DataViewColumn<T> {
  field: keyof T & string;
  header: string;
  width?: string;
}

@Component({
  selector: 'otto-data-view',
  imports: [TableModule, ButtonModule],
  templateUrl: './otto-data-view.component.html',
  styleUrl: './otto-data-view.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OttoDataViewComponent<T extends object = Record<string, unknown>> {
  readonly data = input<T[]>([]);
  readonly columns = input<DataViewColumn<T>[]>([]);
  readonly pagination = input<Pagination | null>(null);
  readonly rowsPerPageOptions = input<number[]>([4, 8, 12]);
  readonly itemLabel = input<string>('items');
  readonly dataKey = input<string>('id');

  readonly paginationChange = output<Pagination>();

  readonly pageReport = computed(() => {
    const p = this.pagination();
    if (!p || p.total == null) return '';
    const from = p.pageNumber + 1;
    const to = Math.min(p.total, p.pageNumber + p.pageSize);
    return `Showing ${from} to ${to} of ${p.total} ${this.itemLabel()}`;
  });

  onPage(event: TablePageEvent): void {
    this.paginationChange.emit({
      pageNumber: event.first,
      pageSize: event.rows,
      total: this.pagination()?.total,
    });
  }
}
