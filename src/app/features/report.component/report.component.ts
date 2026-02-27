import { Component, computed, signal, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { InsuranceService } from '../../core/services/insurance.service';
import { ChartModule } from 'primeng/chart';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-report.component',
  imports: [
    CardModule,
    ButtonModule,
    ProgressSpinnerModule,
    CommonModule,
    ChartModule,
    DialogModule,
    TableModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  lastUpdated = signal<string>('');
  report = signal<any>(null);
  loading = signal(false);
  showError = signal(false);
  showResult = signal(false);
  displayList = signal(false);
  insurances = signal<any[]>([]);
  loadingList = signal(false);
  totalRecords = signal(0);

  @ViewChild('dt') table!: Table;

  barData = computed(() => {
    const data = this.report();
    if (!data) return null;

    return {
      labels: ['Risco', 'Comercial'],
      datasets: [
        {
          label: 'Prêmios Médios',
          data: [data.averageRiskPremium, data.averageCommercialPremium],
          backgroundColor: ['#22D3EE', '#F59E0B'],
          borderRadius: 8,
          barPercentage: 0.6,
        },
      ],
    };
  });

  barOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { cornerRadius: 8 },
    },
    scales: {
      y: {
        grid: { color: '#262626', drawTicks: false },
        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#94a3b8', font: { family: 'Inter' } },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit() {
    this.loadReport();
  }

  loadReport(): void {
    this.loading.set(true);
    this.showResult.set(false);
    this.showError.set(false);

    this.insuranceService.getReport().subscribe({
      next: (data) => {
        this.report.set(data);
        this.updateTimestamp();
        this.loading.set(false);
        this.showError.set(false);
        this.showResult.set(true);
      },
      error: () => {
        this.showError.set(true);
        this.showResult.set(false);
        this.loading.set(false);
      },
    });
  }

  viewAllInsurances() {
    this.displayList.set(true);
  }

  onDialogShow() {
    this.insurances.set([]);
    this.totalRecords.set(0);

    if (this.table) {
      this.table.reset();
    }
  }

  loadPage(event: any) {
    this.loadingList.set(true);

    const page = event.first / event.rows + 1;
    const size = event.rows;

    this.insuranceService.getPagedInsurances(page, size).subscribe({
      next: (response: any) => {
        const data = response?.content || response || [];
        const total = this.report()?.totalPolicies || 0;

        this.insurances.set([...data]);
        this.totalRecords.set(total);
        setTimeout(() => {
          this.loadingList.set(false);
        }, 0);
      },
      error: (err) => {
        console.error('Erro na API:', err);
        this.loadingList.set(false);
      },
    });
  }

  private updateTimestamp(): void {
    const now = new Date();

    const formattedTime = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(now);

    this.lastUpdated.set(formattedTime);
  }
}
