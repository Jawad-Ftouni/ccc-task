import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseClaimService } from '../../services/expense-claim.service';
import { LeaveService } from '../../services/leave.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit{
  chart1: Chart | any;
  chart2: Chart | any;
  
  chartData1: any;
  chartData2: any;

  constructor(private expenseService: ExpenseClaimService,private leaveService: LeaveService) {}

  ngOnInit() {
    // Initialize arrays to hold data for each expense type
    this.chartData1 = {
      labels: [], // Labels for expense types (e.g., "Hotel", "Car Rental", "Food", "Ticket")
      datasets: [
        {
          data: [], // Total expenses for each expense type
          backgroundColor: [] // Background colors for bars
        }
      ]
    };

    this.chartData2 = {
      labels: [], // Labels for expense types (e.g., "Hotel", "Car Rental", "Food", "Ticket")
      datasets: [
        {
          data: [], // Total expenses for each expense type
          backgroundColor: [] // Background colors for bars
        }
      ]
    };

    // Fetch data for each expense type and add it to the chartData
    this.fetchDataAndAddToChart1('hotel', 'Hotel', 'blue');
    this.fetchDataAndAddToChart1('car rental', 'Car Rental', 'green');
    this.fetchDataAndAddToChart1('food', 'Food', 'orange');
    this.fetchDataAndAddToChart1('ticket', 'Ticket', 'purple');

     // Fetch data for each expense type and add it to the chartData
     this.fetchDataAndAddToChart2('Privilege Leave', 'Privilege', 'blue');
     this.fetchDataAndAddToChart2('Earned Leave', 'Earned', 'green');
     this.fetchDataAndAddToChart2('Annual Leave', 'Annual', 'orange');
     this.fetchDataAndAddToChart2('Sick Leave', 'Sick', 'purple');
  }

  ngAfterViewInit() {
    // Create the chart after initializing chartData in ngOnInit
    this.createChart1();
    this.createChart2();
    
  }

  fetchDataAndAddToChart1(expenseType: string, label: string, backgroundColor: string) {
    this.expenseService.totalExpenseByType(expenseType).subscribe((total) => {
      // Add the category label (expense type)
      this.chartData1.labels.push(label);

      // Add the total expense for each expense type to the dataset
      this.chartData1.datasets[0].data.push(total);

      // Add background color for the bar
      this.chartData1.datasets[0].backgroundColor.push(backgroundColor);

      // After fetching the data, create/update the chart
      this.updateChart1();
    });
  }

  createChart1() {
    // Create a horizontal bar chart using Chart.js
    this.chart1 = new Chart('myChart1', {
      type: 'bar',
      data: this.chartData1,
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: any) => `$${value.toFixed(1)}` // Format ticks with dollar sign and two decimal places
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => `$${context.parsed.y.toFixed(1)}` // Format tooltips with dollar sign and two decimal places
            },
            
          },
          legend: {
            display: false,
            position: 'bottom', // Position of the legend
            labels: {
              usePointStyle: true, // Use point-style for legend labels
            }
          }  
          
        }
      }
    });
  }
  updateChart1() {
    // Check if the chart exists and update its data
    if (this.chart1) {
      this.chart1.data = this.chartData1;
      this.chart1.update();
    }
  }

  updateChart2() {
    // Check if the chart exists and update its data
    if (this.chart2) {
      this.chart2.data = this.chartData2;
      this.chart2.update();
    }
  }

  fetchDataAndAddToChart2(leaveType: string, label: string, backgroundColor: string) {
    this.leaveService.totalLeaveByType(leaveType).subscribe((total) => {
      // Add the category label (expense type)
      this.chartData2.labels.push(label);

      // Add the total expense for each expense type to the dataset
      this.chartData2.datasets[0].data.push(total);

      // Add background color for the bar
      this.chartData2.datasets[0].backgroundColor.push(backgroundColor);

      // After fetching the data, create/update the chart
      this.updateChart2();
    });
  }
  createChart2() {
    // Create a horizontal bar chart using Chart.js
    this.chart2 = new Chart('myChart2', {
      type: 'bar',
      data: this.chartData2,
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: any) => `${value.toFixed(1)}` // Format ticks with dollar sign and two decimal places
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context: any) => `${context.parsed.y.toFixed(1)}` // Format tooltips with dollar sign and two decimal places
            },
            
          },
          legend: {
            display: false,
            position: 'bottom', // Position of the legend
            labels: {
              usePointStyle: true, // Use point-style for legend labels
            }
          }  
        }
      }
    });
  }
}
