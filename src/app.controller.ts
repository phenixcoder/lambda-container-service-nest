import { Controller, Get, Post, Body, Render } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthService } from 'src/health/health.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @Render('index')
  @ApiOperation({ summary: 'Get home page' })
  @ApiResponse({ status: 200, description: 'Home page rendered successfully' })
  root() {
    return {
      title: 'Microservice Template',
      message: 'Welcome to your NestJS Microservice Template!',
      version: process.env.VERSION || '1.0.0',
    };
  }

  @Get('/health')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service health status',
    type: Object,
  })
  async healthCheck() {
    return this.healthService.getHealthStatus();
  }

  @Get('/status')
  @Render('status')
  @ApiOperation({ summary: 'Get status page' })
  @ApiResponse({
    status: 200,
    description: 'Status page rendered successfully',
  })
  async getStatusPage() {
    const health = await this.healthService.getHealthStatus();
    return {
      title: 'Service Status',
      health,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('/demo')
  @Render('demo')
  @ApiOperation({ summary: 'Get demo page with form' })
  @ApiResponse({ status: 200, description: 'Demo page rendered successfully' })
  getDemoPage() {
    return {
      title: 'Demo Page',
      message: 'This is a demo page with form functionality',
    };
  }

  @Post('/demo/submit')
  @Render('demo-result')
  @ApiOperation({ summary: 'Submit demo form' })
  @ApiResponse({ status: 200, description: 'Demo form submitted successfully' })
  submitDemoForm(@Body() formData: any) {
    return {
      title: 'Demo Result',
      formData,
      submittedAt: new Date().toISOString(),
    };
  }
}
