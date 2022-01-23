import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { UserChart } from 'src/app/model/userChart';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  userChart = new UserChart();

  ngOnInit(): void {
    this.usuarioService.loadChart().subscribe(data => {
      this.userChart = data;
      this.barChartLabels = this.userChart.fullName.split(',');

      var salarios = JSON.parse('[' + this.userChart.salario + ']')

      this.barChartData = [
        { data: salarios, label: 'Salário Usuário' }
      ];
    })
  }
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins: any[] = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' }
  ];

}
