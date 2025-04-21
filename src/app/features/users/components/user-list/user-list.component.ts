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
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserInterface, UserResponse } from '../../interface/user';

import { DeleteDialogComponent } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private userService = inject(UserService);

  displayedColumns: string[] = [
    'id',
    'avatar',
    'fname',
    'lname',
    'username',
    'actions',
  ];

  private page$ = new BehaviorSubject<number>(1);
  users$!: Observable<UserResponse>;

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

    this.users$ = combineLatest([search$, page$, sortBy$, sortOrder$]).pipe(
      switchMap(([search, page, sortBy, sortOrder]) =>
        this.userService
          .getUsers(
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

  add() {}

  edit(user: UserInterface) {
    console.log('Edit:', user);
  }

  delete(user: UserInterface) {
    this.dialog
      .open(DeleteDialogComponent)
      .afterClosed()
      .pipe(
        filter((confirmed) => confirmed),
        switchMap(() => this.userService.deleteUser(user.id))
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
