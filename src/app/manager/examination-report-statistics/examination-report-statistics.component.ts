import { Component, OnInit } from '@angular/core';
import { ChartData, ElementChartOptions } from 'chart.js';
import { SuccessfulUnsuccessfulDTO } from './dtos/succ-unsucc.dto';
import { ReportStatisticsService } from './services/report-statistics.service';

@Component({
  selector: 'app-examination-report-statistics',
  templateUrl: './examination-report-statistics.component.html',
  styleUrls: ['./examination-report-statistics.component.css']
})
export class ExaminationReportStatisticsComponent implements OnInit {

  succUnsuccData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  succUnsuccSpecData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  avgMinMaxData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  stepStatsData: ChartData<"bar", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }
  hourStatsData: ChartData<"line", (number | [number, number] | null)[], unknown> = { datasets: [], labels: [] }

  succUnsuccLoading = true
  succUnsuccSpecLoading = true
  avgMinMaxLoading = true
  stepStatsLoading = true
  hourStatsLoading = true

  succUnsuccSpecOptions: any = {
    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Successful/Unsuccessful per Specialty'
      }
    }
  }

  hourStatsOptions: any = {
    borderColor:"#1f4d78",
    pointBackgroundColor:"#f5a30a",
    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        possition: 'top',
        text: 'Average successful examinations per hour'
      }
    }
  }

  succUnsuccOptions: any = {
    maintainAspectRatio: false,
    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Successful/Unsuccessful examination reports'
      }
    }
  }

  avgMinMaxOptions: any = {
    maintainAspectRatio: false,
    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Minimum/Average/Maximum examination reports'
      }
    }
  }

  stepStatsOptions: any = {
    maintainAspectRatio: false,
    backgroundColor: ["#b1d0e0", "#f5a30a","#1f4d78","#0871a6","#4891b8","#5fa3c7"],
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        position: 'top',
        text: 'Average time per step(minutes)'
      }
    }
  }

  constructor(
    private readonly reportStatisticsService: ReportStatisticsService
  ) { }

  ngOnInit(): void {
    this.reportStatisticsService.getSuccUnsuccStats().subscribe(res => {
      const data = [res.successful, res.unsuccessful]
      const labels = ['Successful', 'Unsucessful']
      this.succUnsuccData = { datasets: [{ data }], labels }
      this.succUnsuccLoading = false
    })


    this.reportStatisticsService.getSpecialtySuccUnsuccStats().subscribe(res => {
      const data = res.map(el => [el.successful, el.unsuccessful]).reduce((el, res) => {
        res = [...res, ...el]
        return res
      }, [])

      const labels = res.map(el => [el.specialty + "(+)", el.specialty + "(-)"]).reduce((el, res) => {
        res = [...res, ...el]
        return res
      })
      this.succUnsuccSpecData = { datasets: [{ data }], labels }
      this.succUnsuccSpecLoading = false
    })

    this.reportStatisticsService.getHourStats().subscribe(res => {
      const keys = Object.keys(res).map(key => +key).sort((a, b) => a - b)
      const data = keys.map(key => res[key])
      const labels = keys.map(key => key + "hr")
      this.hourStatsData = { datasets: [{ data, fill: true }], labels }
      this.hourStatsLoading = false
    })

    this.reportStatisticsService.getAvgMinMaxTimeStats().subscribe(res => {
      const labels = ['Minimum', 'Average', 'Maximum']
      const data = [res.min, res.avg, res.max]
      this.avgMinMaxData = { datasets: [{ data }], labels }
      this.avgMinMaxLoading = false
    })

    this.reportStatisticsService.getStepsStats().subscribe(res => {
      const data = [res.symptomAverage, res.reportAverage, res.symptomAverage]
      const labels = ['Symptoms', 'Report', 'Prescriptions']
      this.stepStatsData = { datasets: [{ data }], labels }
      this.stepStatsLoading = false
    })
  }

}
