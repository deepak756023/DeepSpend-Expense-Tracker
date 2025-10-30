import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserMngmntService } from '../service/user-mngmnt.service';
import { NgImportsModule } from '../../../ngimports';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';


export interface User {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  createdAt?: Date | string;
  firstName?: string;
  lastName?: string;
  zipCode?: string;
  profession?: string;
  agreeTOS?: boolean;
  phone?: string;
  expenses?: any[];
  isActive?: boolean;
}

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-user-management',
  imports: [NgImportsModule],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  userDialog = false;
  users: User[] = [];
  user: User = {};
  selectedUsers: User[] = [];
  submitted = false;
  cols: Column[] = [];
  exportColumns: ExportColumn[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(
    private userMngmntService: UserMngmntService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.users = (this.route.snapshot.data['users'] || []).map((u: any) => ({
      ...u,
      createdAt: u.createdAt ? new Date(u.createdAt) : undefined
    }));

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'username', header: 'Email' },
      { field: 'phone', header: 'Contact No.' },
      { field: 'role', header: 'Role' },
      { field: 'profession', header: 'Profession' },
      { field: 'createdAt', header: 'Created At' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }


  onFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  openNew(): void {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }

  editUser(user: User): void {
    this.user = { ...user };
    this.userDialog = true;
  }

  hideDialog(): void {
    this.userDialog = false;
    this.submitted = false;
  }

  saveUser(): void {
    this.submitted = true;

    if (!this.user.username?.trim()) return;

    if (this.user.id) {
      const index = this.findIndexById(this.user.id);

      this.userMngmntService.updateUser(this.user).subscribe({
        next: (updatedUser) => {
          if (this.user.id == Number(localStorage.getItem("user_id"))) {
            this.refreshAccountInfo(updatedUser);
          }

          if (index >= 0) this.users[index] = {
            ...updatedUser,
            createdAt: updatedUser.createdAt ? new Date(updatedUser.createdAt) : undefined
          };
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'User Updated',
            life: 3000
          });
          this.users = [...this.users];
          this.userDialog = false;
          this.user = {};
        },
        error: (error) => {
          console.error('Update error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update user',
            life: 3000
          });
        }
      });
    }
  }

  findIndexById(id: number): number {
    return this.users.findIndex(u => u.id === id);
  }

  /** Delete selected users */
  deleteSelectedUsers(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.userMngmntService.deleteSelectedUsers(this.selectedUsers).subscribe({
          next: () => {
            this.users = this.users.filter(u => !this.selectedUsers.includes(u));
            this.selectedUsers = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Users Deleted',
              life: 3000
            });
          },
          error: (error) => {
            console.error('Delete error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete users',
              life: 3000
            });
          }
        });
      }
    });
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.username}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.userMngmntService.delete(user).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.username !== user.username);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Deleted',
              life: 3000
            });
          },
          error: (error) => {
            console.error('Delete error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete user',
              life: 3000
            });
          }
        });
      }
    });
  }

  exportCSV(): void {
    this.dt.exportFilename = 'user-list-' + new Date().toString().slice(0, 24);
    this.dt.exportCSV();
  }

  createId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }

  refreshAccountInfo(updatedUser: User): void {
    localStorage.setItem("firstName", updatedUser.firstName || '');
    localStorage.setItem("lastName", updatedUser.lastName || '');
    localStorage.setItem("user_id", (updatedUser.id || '').toString());
    localStorage.setItem("user_role", updatedUser.role || '');

    if (updatedUser.role !== "ADMIN") {
      this.router.navigate(['/layout/home']).then(() => {
        location.reload();
      });
      return;
    }
    location.reload();
  }

}
