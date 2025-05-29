import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  database?: {
    status: 'connected' | 'disconnected';
    responseTime?: number;
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
  };
}

@Injectable()
export class HealthService {
  private startTime = Date.now();

  async getHealthStatus(): Promise<HealthStatus> {
    const memoryUsage = process.memoryUsage();
    const uptime = Date.now() - this.startTime;

    // Simulate database health check (in a real app, this would check actual database)
    const dbStatus = await this.checkDatabaseHealth();

    return {
      status: dbStatus.status === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: uptime,
      version: process.env.VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: dbStatus,
      memory: {
        used: memoryUsage.heapUsed,
        total: memoryUsage.heapTotal,
        percentage: Math.round(
          (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100,
        ),
      },
      cpu: {
        usage: await this.getCpuUsage(),
      },
    };
  }

  private async checkDatabaseHealth(): Promise<{
    status: 'connected' | 'disconnected';
    responseTime?: number;
  }> {
    // Simulate database health check
    // In a real application, you would check your actual database connection
    const startTime = Date.now();

    try {
      // Simulate async database ping
      await new Promise((resolve) => setTimeout(resolve, 10));

      return {
        status: 'connected',
        responseTime: Date.now() - startTime,
      };
    } catch (error) {
      return {
        status: 'disconnected',
      };
    }
  }

  private async getCpuUsage(): Promise<number> {
    // Simple CPU usage calculation (not production-ready)
    const startUsage = process.cpuUsage();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const endUsage = process.cpuUsage(startUsage);

    const totalUsage = endUsage.user + endUsage.system;
    const percentage = (totalUsage / 1000000 / 100) * 100; // Convert to percentage

    return Math.min(Math.round(percentage), 100);
  }
}
