import { Component } from '@angular/core';
import { NgImportsModule } from '../../../ngimports';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { ChartService } from '../chart.service';


@Component({
  selector: 'app-charts',
  imports: [NgImportsModule, CommonModule, FluidModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {
  pieData: any;
  pieOptions: any;
  barData: any;
  barOptions: any;
  private chartValues: number[] = [];
  private barValues: number[] = [];
  isDataAvailable: boolean = false;
  isYearlyDataAvailable: boolean = false;
  private allCategories: string[] = [];
  allCategoryInSelectedMonth: string[] = [];

  private allMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  date1: Date | undefined;
  date2: Date | undefined;
  today = new Date();

  constructor(private chartService: ChartService) {
    this.chartService.getAllCategories(Number(localStorage.getItem('user_id'))).subscribe(res => {
      this.allCategories = res.data;
    });
  }

  ngOnInit() {



    this.loadChartData(Number(localStorage.getItem('user_id')), this.today.getMonth() + 1, this.today.getFullYear());

    this.loadYearlyChartData(Number(localStorage.getItem('user_id')), this.today.getFullYear());
  }

  loadChartData(userId: number, month: number, year: number) {
    this.chartService.getMonthlyExpensesChart(
      userId,
      month,
      year
    ).subscribe(res => {
      const data = res.data;
      this.isDataAvailable = Object.keys(data).length > 0;
      this.allCategoryInSelectedMonth = this.allCategories.filter(cat => data[cat] > 0);
      this.chartValues = this.allCategoryInSelectedMonth.map(cat => Number(data[cat].toFixed(0)) ?? 0);

      this.buildPieChart();
    });
  }

  onMonthYearChange() {
    if (this.date1) {
      const month = this.date1.getMonth() + 1;
      const year = this.date1.getFullYear();
      this.loadChartData(Number(localStorage.getItem('user_id')), month, year);
    }
  }



  loadYearlyChartData(userId: number, year: number) {
    this.chartService.getYearlyExpensesChart(userId, year).subscribe(res => {
      const data = res.data;
      this.barValues = Array.from({ length: 12 }, (_, i) => {

        const month = (i + 1).toString();
        return data[month] ?? 0;
      });
      this.sumupTheYearlyData();
      this.buildBarChart();
    });
  }

  sumupTheYearlyData(): number {
    const total = this.barValues.reduce((acc, val) => acc + val, 0);
    this.isYearlyDataAvailable = total > 0;
    return total;
  }

  onYearChange() {
    if (this.date2) {
      const year = this.date2.getFullYear();
      this.loadYearlyChartData(Number(localStorage.getItem('user_id')), year);
    }
  }


  private buildPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieData = {
      labels: this.allCategoryInSelectedMonth,
      datasets: [
        {
          data: this.chartValues,
          backgroundColor: [
            documentStyle.getPropertyValue('--p-indigo-500'),
            documentStyle.getPropertyValue('--p-purple-500'),
            documentStyle.getPropertyValue('--p-teal-500'),
            documentStyle.getPropertyValue('--p-orange-500'),
            documentStyle.getPropertyValue('--p-cyan-500'),
            documentStyle.getPropertyValue('--p-pink-500'),
            documentStyle.getPropertyValue('--p-green-500'),
            documentStyle.getPropertyValue('--p-blue-500'),
            documentStyle.getPropertyValue('--p-yellow-500'),
            documentStyle.getPropertyValue('--p-gray-500')

          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-indigo-400'),
            documentStyle.getPropertyValue('--p-purple-400'),
            documentStyle.getPropertyValue('--p-teal-400'),
            documentStyle.getPropertyValue('--p-orange-400'),
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-pink-400'),
            documentStyle.getPropertyValue('--p-green-400'),
            documentStyle.getPropertyValue('--p-blue-400'),
            documentStyle.getPropertyValue('--p-yellow-400'),
            documentStyle.getPropertyValue('--p-gray-400')
          ]
        }
      ]
    };

    this.pieOptions = {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  buildBarChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: this.allMonths,
      datasets: [
        {
          label: "Expense",
          backgroundColor: documentStyle.getPropertyValue('--p-primary-500'),
          borderColor: documentStyle.getPropertyValue('--p-primary-500'),
          data: this.barValues
        }
      ]
    };

    this.barOptions = {

      maintainAspectRatio: false,
      aspectRatio: .6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };



  }
}

