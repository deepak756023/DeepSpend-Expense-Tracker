import { Component } from '@angular/core';
import { NgImportsModule } from '../../../ngimports';
import { CommonModule } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { Subscription } from 'rxjs';
import { ChartService } from '../chart.service';
import { TopbarComponent } from "../../landing-page/topbar/topbar.component";

@Component({
  selector: 'app-charts',
  imports: [NgImportsModule, CommonModule, FluidModule, TopbarComponent],
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

  constructor(private chartService: ChartService) {
    this.chartService = chartService;

  }

  ngOnInit() {
    this.loadChartData(23, 9);
    this.loadYearlyChartData(23)
  }
  loadChartData(arg0: number, arg1: number) {
    this.chartService.getMonthlyExpensesChart(23, 9).subscribe(res => {
      const data = res.data;
      this.chartValues = this.allCategories.map(cat => data[cat] ?? 0);

      this.buildPieChart();
    });
  }

  loadYearlyChartData(userId: number) {
    this.chartService.getYearlyExpensesChart(23).subscribe(res => {
      const data = res.data;

      this.barValues = Array.from({ length: 12 }, (_, i) => {
        const month = (i + 1).toString(); // "1".."12"
        return data[month] ?? 0;
      });

      this.buildBarChart();
    });
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

