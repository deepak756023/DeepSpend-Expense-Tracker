import { Component } from '@angular/core';
import { NgImportsModule } from '../../../ngimports';
import { CommonModule } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { Subscription } from 'rxjs';
import { ChartService } from '../chart.service';
import { TopbarComponent } from "../../landing-page/topbar/topbar.component";
import { FooterComponent } from "../../landing-page/footer/footer.component";

@Component({
  selector: 'app-charts',
  imports: [NgImportsModule, CommonModule, FluidModule, TopbarComponent, FooterComponent],
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
  private allCategories = [
    'FOOD', 'HEALTH', 'TRAVEL', 'EDUCATION', 'GIFT', 'BILLS', 'OTHERS'
  ];

  private allMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  date1: Date | undefined;
  date2: Date | undefined;
  today = new Date();

  constructor(private chartService: ChartService) { }

  ngOnInit() {

    this.loadChartData(23, this.today.getMonth() + 1, this.today.getFullYear());
    debugger;
    this.loadYearlyChartData(23, this.today.getFullYear());
  }

  loadChartData(userId: number, month: number, year: number) {
    this.chartService.getMonthlyExpensesChart(
      userId,
      month,
      year
    ).subscribe(res => {
      const data = res.data;
      this.chartValues = this.allCategories.map(cat => data[cat] ?? 0);

      this.buildPieChart();
    });
  }

  onMonthYearChange() {
    if (this.date1) {
      const month = this.date1.getMonth() + 1;
      const year = this.date1.getFullYear();
      this.loadChartData(23, month, year);
    }
  }



  loadYearlyChartData(userId: number, year: number) {
    this.chartService.getYearlyExpensesChart(23, year).subscribe(res => {
      const data = res.data;

      this.barValues = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString(); // "1".."12"
        return data[month] ?? 0;
      });

      this.buildBarChart();
    });
  }

  onYearChange() {
    if (this.date2) {
      const year = this.date2.getFullYear();
      this.loadYearlyChartData(23, year);
    }
  }


  private buildPieChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.pieData = {
      labels: this.allCategories,
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
            documentStyle.getPropertyValue('--p-green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-indigo-400'),
            documentStyle.getPropertyValue('--p-purple-400'),
            documentStyle.getPropertyValue('--p-teal-400'),
            documentStyle.getPropertyValue('--p-orange-400'),
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-pink-400'),
            documentStyle.getPropertyValue('--p-green-400')
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

