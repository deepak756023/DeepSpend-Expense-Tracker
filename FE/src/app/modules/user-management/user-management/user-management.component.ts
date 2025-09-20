import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserMngmntService } from '../service/user-mngmnt.service';
import { NgImportsModule } from '../../../ngimports';
import { Table } from 'primeng/table';
import { TopbarComponent } from "../../landing-page/topbar/topbar.component";
import { FooterComponent } from "../../landing-page/footer/footer.component";

export interface User {
  id?: number;
  username?: string;
  password?: string;
  role?: string;
  createdAt?: String;
  firstName?: String;
  lastName?: string;
  zipCode?: string;
  profession?: string;
  agreeTOS?: boolean;
  phone?: string;
  expenses?: any[];
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
  imports: [NgImportsModule, TopbarComponent, FooterComponent],
  providers: [MessageService, ConfirmationService, UserMngmntService],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {

  userDialog = false;
  users: User[] = [];
  user: User = {};
  selectedUsers: User[] = [];
  submitted = false;
  statuses: { label: string; value: string }[] = [];
  cols: Column[] = [];
  exportColumns: ExportColumn[] = [];

  @ViewChild('dt') dt!: Table;

  constructor(
    private userMngmntService: UserMngmntService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDemoData();
  }

  loadDemoData(): void {
    this.userMngmntService.getUsers().subscribe({
      next: (data) => {
        this.users = data || [];
        this.cd.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });


    this.cols = [
      { field: 'firstName', header: 'FirstName' },
      { field: 'lastName', header: 'LastName' },
      { field: 'username', header: 'Email' },
      { field: 'phone', header: 'Contact No.' },
      { field: 'role', header: 'Role' },
      { field: 'profession', header: 'Profession' },
      { field: 'createdAt', header: 'Created At' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  exportCSV(): void {
    this.dt.exportCSV();
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

    if (this.user.username?.trim()) {
      if (this.user.id) {
        const index = this.findIndexById(this.user.id!);

        this.userMngmntService.updateUser(this.user).subscribe({
          next: (updatedUser) => {
            if (index >= 0) {
              this.users[index] = updatedUser;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Updated',
              life: 3000,
            });
          },
          error: (error) => {
            console.error('Update error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update user',
              life: 3000,
            });
          },
        });
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
    }
  }

  findIndexById(id: number): number {
    return this.users.findIndex(u => u.id === id);
  }



  deleteSelectedUsers(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userMngmntService.deleteSelectedUsers(this.selectedUsers).subscribe({
          next: () => {
            this.users = this.users.filter(
              (p) => !this.selectedUsers.includes(p)
            );
            this.selectedUsers = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Users Deleted',
              life: 3000,
            });
          },
          error: (error) => {
            console.error('Delete error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete users',
              life: 3000,
            });
          },
        });
      },
    });
  }

  onFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(value, 'contains');
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.username}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userMngmntService.delete(user).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.username !== user.username);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User Deleted',
              life: 3000,
            });
          },
          error: (error) => {
            console.error('Delete error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete user',
              life: 3000,
            });
          },
        });
      },
    });
  }



  createId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }


}
