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
import { ChartService } from '../../dashboard/chart.service';

export interface Expense {
  id?: number;
  user?: User;
  category?: string;
  amount?: number;
  description?: string;
  expenseDate?: Date | string; // <-- changed type
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
  imports: [
    NgImportsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TopbarComponent,
    FooterComponent,
    TruncatePipe
  ],
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
  charCount: number = 0;
  allCategories: string[] = [];
  defaultCategory: string[] = ['FOOD', 'HEALTH', 'TRAVEL', 'EDUCATION', 'GIFT', 'BILLS', 'INVEST'];
  isAddNewCategory: boolean = false;
  isDuplicateCategory: boolean = false;

  useForm: FormGroup = new FormGroup({
    user: new FormGroup({
      id: new FormControl(this.userId)
    }),
    category: new FormControl("", [Validators.required]),
    newCategory: new FormControl(""),
    amount: new FormControl(null, [Validators.required, Validators.min(0.000000001)]),
    description: new FormControl(""),
    expenseDate: new FormControl("", [Validators.required]),
  });


  @ViewChild('dt') dt!: Table;

  constructor(
    private expenseMgmtService: ExpenseMgmtService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef,
    private chartService: ChartService
  ) {
    this.getAllCategories();
  }

  ngOnInit(): void {
    this.loadDemoData();
  }

  getAllCategories() {
    this.chartService.getAllCategories(Number(localStorage.getItem('user_id'))).subscribe(res => {
      this.allCategories = res.data;
      this.allCategories = Array.from(new Set(this.allCategories.concat(this.defaultCategory)));
    });

  }



  onCategoryChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.isAddNewCategory = selectedValue === 'OTHERS';

    const newCategoryControl = this.useForm.get('newCategory');

    if (this.isAddNewCategory) {
      newCategoryControl?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      newCategoryControl?.clearValidators();
      newCategoryControl?.reset();
      this.isDuplicateCategory = false;
    }

    newCategoryControl?.updateValueAndValidity();
  }

  checkDuplicateCategory() {
    const newCat = this.useForm.get('newCategory')?.value?.trim().toLowerCase();
    this.isDuplicateCategory = this.allCategories
      .map(c => c.toLowerCase())
      .includes(newCat);

    if (this.isDuplicateCategory) {
      this.useForm.get('newCategory')?.setErrors({ duplicate: true });
    } else {
      const errors = this.useForm.get('newCategory')?.errors;
      if (errors) delete errors['duplicate'];
      if (Object.keys(errors || {}).length === 0) {
        this.useForm.get('newCategory')?.setErrors(null);
      }
    }
  }



  updateCharCount() {
    const descriptionControl = this.useForm.get('description');
    this.charCount = descriptionControl?.value ? descriptionControl.value.length : 0;
  }

  onClear() {
    this.useForm.reset({ user: { id: this.userId } });
    this.isEditMode = false;
    this.isAddNewCategory = false;
  }

  editExpense(expense: Expense) {
    this.isEditMode = true;
    this.editingExpenseId = expense.id;

    this.useForm.patchValue({
      user: { id: expense.user?.id },
      category: expense.category,
      amount: expense.amount,
      description: expense.description,
      expenseDate: this.formatDateForInput(expense.expenseDate)
    });
  }

  onSubmit() {
    if (this.useForm.valid) {
      const payload = {
        ...this.useForm.value,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        category: this.isAddNewCategory
          ? this.useForm.value.newCategory.toUpperCase()
          : this.useForm.value.category,
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
        delete payload.newCategory;
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
              res.data.expenseDate = new Date(res.data.expenseDate);
              this.expenses.unshift(res.data);
            }
            this.isAddNewCategory = false;
            this.getAllCategories();
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

  /** convert expenseDate to Date objects for filteration purpose */
  loadDemoData(): void {
    this.expenseMgmtService.getExpenses(this.userId).subscribe((data) => {
      this.expenses = data.map((e: any) => ({
        ...e,
        expenseDate: e.expenseDate ? new Date(e.expenseDate) : null
      }));
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

  formatDateForInput(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  exportCSV(): void {
    this.dt.exportFilename = 'expense-manage-' + new Date().toString().slice(0, 24);
    this.dt.exportCSV();
  }

  deleteSelectedExpenses(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected expenses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.expenseMgmtService.deleteSelectedUsers(this.selectedExpenses).subscribe({
          next: () => {
            this.expenses = this.expenses.filter(p => !this.selectedExpenses.includes(p));
            this.selectedExpenses = [];
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Expenses Deleted',
              life: 3000
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to delete expenses',
              life: 3000
            });
          }
        });
      }
    });
  }

  deleteExpense(expense: Expense): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this expense?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger',
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
