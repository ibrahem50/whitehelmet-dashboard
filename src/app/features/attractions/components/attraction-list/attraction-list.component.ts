import { ActivatedRoute, Router } from '@angular/router';
import {
  AttractionInterface,
  AttractionResponseInterface,
} from '../../interfaces/attraction';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Component, inject } from '@angular/core';

import { AttractionService } from '../../services/attraction.service';
import { DeleteDialogComponent } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrl: './attraction-list.component.scss',
  standalone: false,
})
export class AttractionListComponent {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private attractionService = inject(AttractionService);

  displayedColumns: string[] = [
    'id',
    'name',
    'detail',
    'coverimage',
    'latitude',
    'longitude',
    'actions',
  ];

  private page$ = new BehaviorSubject<number>(1);
  attractions$!: Observable<AttractionResponseInterface>;

  searchControl = new FormControl('');
  sortByControl = new FormControl('id');
  sortOrderControl = new FormControl<'asc' | 'desc'>('asc');

  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    const search$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      startWith('')
    );

    const sortBy$ = this.sortByControl.valueChanges.pipe(startWith('id'));
    const sortOrder$ = this.sortOrderControl.valueChanges.pipe(
      startWith('asc')
    );
    const page$ = this.page$.asObservable();

    this.attractions$ = combineLatest([
      search$,
      page$,
      sortBy$,
      sortOrder$,
    ]).pipe(
      switchMap(([search, page, sortBy, sortOrder]) =>
        this.attractionService
          .getAttractions(
            search || undefined,
            page,
            this.pageSize,
            sortBy || undefined,
            sortOrder as 'desc' | 'asc'
          )
          .pipe(
            tap((res) => {
              this.pageIndex = res.page - 1;
              this.pageSize = res.per_page;
            })
          )
      )
    );
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.page$.next(event.pageIndex + 1);
  }

  add() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  edit(attraction: AttractionInterface) {
    this.router.navigate([`${attraction.id}`], { relativeTo: this.route });
  }

  delete(attraction: AttractionInterface) {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.attractionService.deleteAttraction(attraction.id))
      )
      .subscribe({
        next: (res) => {
          this.showMessage(res.message);
          this.page$.next(this.pageIndex + 1);
        },
      });
  }

  showMessage(message: string) {
    this.snackBar.open(message, 'Dismiss', {
      duration: 0,
      verticalPosition: 'top',
      panelClass: 'snackbar-success',
    });
  }
}
