import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgImportsModule } from '../../../ngimports';
import { Table } from 'primeng/table';
import { User } from '../../user-management/user-management/user-management.component';
import { ExpenseMgmtService } from '../expense-mgmt.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from "../../landing-page/topbar/topbar.component";
import { FooterComponent } from "../../landing-page/footer/footer.component";
import { TruncatePipe } from '../../../pipes/string-pipe/truncate.pipe';

export interface Expense {
  id?: number;
  user?: User;
  category?: string;
  amount?: number;
  description?: string;
  expenseDate?: string;
  createdAt?: string;
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
  selector: 'app-expense-mgmt',
  imports: [NgImportsModule, FormsModule, ReactiveFormsModule, CommonModule, TopbarComponent, FooterComponent, TruncatePipe],
  providers: [MessageService, ConfirmationService],
  templateUrl: './expense-mgmt.component.html',
  styleUrl: './expense-mgmt.component.css'
})
export class ExpenseMgmtComponent implements OnInit {

  expenses: Expense[] = [];
  expense: Expense = {};
  selectedExpenses: Expense[] = [];
  submitted = false;
  statuses: { label: string; value: string }[] = [];
  cols: Column[] = [];
  exportColumns: ExportColumn[] = [];
  isEditMode: boolean = false;
  editingExpenseId?: number;
  userId: number = Number(localStorage.getItem('user_id'));

  useForm: FormGroup = new FormGroup({
    user: new FormGroup({
      id: new FormControl(this.userId)
    }),
    category: new FormControl("", [Validators.required]),
    amount: new FormControl(null, [Validators.required]),
    description: new FormControl(""),
    expenseDate: new FormControl("", [Validators.required]),
  });

  @ViewChild('dt') dt!: Table;

  constructor(
    private expenseMgmtService: ExpenseMgmtService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDemoData();
  }

  editExpense(expense: Expense) {
    this.isEditMode = true;
    this.editingExpenseId = expense.id;

    this.useForm.patchValue({
      user: { id: expense.user?.id },
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      expenseDate: expense.expenseDate
    });
  }

  onSubmit() {
    if (this.useForm.valid) {
      const payload = {
        ...this.useForm.value,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };

      if (this.isEditMode && this.editingExpenseId) {
        this.expenseMgmtService.updateExpense(this.editingExpenseId, payload).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: res.message || 'Expense Updated!',
              life: 3000
            });
            this.useForm.reset({ user: { id: this.userId } });
            this.isEditMode = false;
            this.editingExpenseId = undefined;
            this.loadDemoData();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to update expense',
              life: 3000
            });
          }
        });
      } else {
        this.expenseMgmtService.addExpense(payload).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: res.message || 'Expense Saved!',
              life: 3000
            });
            this.useForm.reset({ user: { id: this.userId } });

            if (res.data) {
              this.expenses.unshift(res.data);
            }
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to add expense',
              life: 3000
            });
          }
        });
      }
    }
  }

  loadDemoData(): void {
    this.expenseMgmtService.getExpenses(this.userId).subscribe((data) => {
      this.expenses = data;
      this.cd.markForCheck();
    });

    this.cols = [
      { field: 'expenseDate', header: 'Expense Date' },
      { field: 'category', header: 'Category' },
      { field: 'amount', header: 'Amount' },
      { field: 'description', header: 'Description' },
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
  }

  exportCSV(): void {
    this.dt.exportFilename = 'expense-manage-' + new Date().toString().slice(0, 24);
    this.dt.exportCSV();
  }

  deleteSelectedExpenses(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenseMgmtService.deleteSelectedUsers(this.selectedExpenses).subscribe({
          next: () => {
            this.expenses = this.expenses.filter(p => !this.selectedExpenses.includes(p));
            this.selectedExpenses = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Products Deleted',
              life: 3000
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete expense',
              life: 3000
            });
          }
        });
      }
    });
  }

  deleteExpense(expense: Expense): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenseMgmtService.delete(expense).subscribe({
          next: () => {
            this.expenses = this.expenses.filter(e => e.id !== expense.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Expense Deleted',
              life: 3000
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete expense',
              life: 3000
            });
          }
        });
      }
    });
  }
}
