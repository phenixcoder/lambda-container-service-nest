# NestJS Microservice Template

A comprehensive NestJS microservice template with Swagger documentation, templated pages, health monitoring, and Lambda support.

## Features

### 🚀 Core Features
- **NestJS Framework** - Modern, scalable Node.js backend framework
- **Swagger API Documentation** - Auto-generated API docs at `/api`
- **Health Monitoring** - Built-in health checks and status monitoring
- **Template Engine** - Handlebars templates with layouts and partials
- **Static Assets** - CSS, JavaScript, and image support
- **Form Handling** - Both traditional forms and API endpoints
- **Lambda Support** - Ready for AWS Lambda deployment with serverless-http

### 📚 API Endpoints

#### Core Endpoints
- `GET /` - Home page with template overview
- `GET /health` - JSON health status
- `GET /status` - Health status page with UI
- `GET /api` - Swagger API documentation

#### Sample CRUD API
- `GET /api/samples` - Get all sample resources
- `POST /api/samples` - Create a sample resource
- `GET /api/samples/:id` - Retrieve a sample resource by ID
- `PUT /api/samples/:id` - Update a sample resource by ID
- `DELETE /api/samples/:id` - Delete a sample resource by ID

#### Demo Pages
- `GET /demo` - Interactive demo page with forms and API testing
- `POST /demo/submit` - Form submission endpoint

### 🎨 UI Features
- Responsive design with modern CSS
- Interactive JavaScript functionality
- Form validation and submission
- API testing interface
- Health monitoring dashboard
- Dark/light theme toggle

## Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the template**
   ```bash
   git clone <repository-url>
   cd lambda-container-service-nest
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm start
   ```

4. **Access the application**
   - Home page: http://localhost:4100
   - API docs: http://localhost:4100/api
   - Health check: http://localhost:4100/health
   - Status dashboard: http://localhost:4100/status
   - Demo page: http://localhost:4100/demo

## Project Structure

```
├── src/
│   ├── app.controller.ts      # Web pages controller  
│   ├── api.controller.ts      # REST API controller
│   ├── app.service.ts         # Business logic
│   ├── app.module.ts          # NestJS module configuration
│   ├── main.ts               # Application entry point
│   ├── nestApp.ts            # NestJS app configuration
│   ├── lambda.ts             # AWS Lambda handler
│   ├── dto/
│   │   └── sample.dto.ts     # Data transfer objects
│   └── health/
│       └── health.service.ts # Health monitoring service
├── views/                    # Handlebars templates
│   ├── index.hbs            # Home page
│   ├── status.hbs           # Health status page
│   ├── demo.hbs             # Demo page
│   ├── demo-result.hbs      # Form result page
│   ├── layouts/
│   │   └── main.hbs         # Main layout
│   └── partials/            # Reusable template parts
├── public/                  # Static assets
│   ├── styles.css           # Main stylesheet
│   ├── form.js              # Client-side JavaScript
│   └── *.png                # Images
└── test/                    # Test files
```

## Customization Guide

### 1. Update Service Information
Edit `package.json`:
```json
{
  "name": "@company/your-service-name",
  "description": "Your service description",
  "version": "1.0.0"
}
```

### 2. Modify API Endpoints
- Edit `src/app.controller.ts` for new endpoints
- Add DTOs in `src/dto/` for request/response validation
- Update `src/app.service.ts` for business logic

### 3. Customize Templates
- Modify views in `views/` directory
- Update CSS in `public/styles.css`
- Add JavaScript in `public/` directory

### 4. Environment Configuration
Create `.env` file:
```env
NODE_ENV=development
VERSION=1.0.0
PORT=4100
```

## Available Scripts

```bash
# Development
pnpm start              # Start with hot-reload
pnpm start:debug        # Start with debugger

# Production
pnpm run build          # Build the application
pnpm start:prod         # Start production server

# Code Quality
pnpm run lint           # Run ESLint
pnpm run format         # Format code with Prettier

# Testing
pnpm test               # Run unit tests
pnpm test:e2e           # Run end-to-end tests
pnpm test:cov           # Run tests with coverage
```

## Deployment

### Docker Deployment
```bash
docker build -t your-service .
docker run -p 4100:4100 your-service
```

### AWS Lambda Deployment
The template includes Lambda support via `src/lambda.ts`. Use with:
- AWS SAM
- Serverless Framework
- AWS CDK

### Traditional Server Deployment
```bash
pnpm run build
pnpm start:prod
```

## API Documentation

Once running, visit `/api` for complete Swagger documentation including:
- Request/response schemas
- Example payloads
- Interactive API testing
- Authentication details (if configured)

## Health Monitoring

The template includes comprehensive health monitoring:

### Health Endpoint (`/health`)
Returns JSON with:
- Service status (healthy/unhealthy)
- Uptime information
- Memory usage
- CPU usage
- Database connectivity (simulated)
- Environment details

### Status Dashboard (`/status`)
Web interface showing:
- Visual health indicators
- Real-time metrics
- System information
- Refresh capabilities

## Dependencies

### Core Dependencies
- `@nestjs/common` - NestJS core functionality
- `@nestjs/swagger` - API documentation
- `express-handlebars` - Template engine
- `class-validator` - Request validation
- `uuid` - ID generation

### Development Dependencies
- `@nestjs/cli` - NestJS CLI tools
- `typescript` - TypeScript support
- `prettier` - Code formatting
- `eslint` - Code linting
- `jest` - Testing framework

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## Template Usage

This template is designed to be:
- **Cloned** for new microservices
- **Customized** for specific business needs
- **Extended** with additional features
- **Deployed** to various platforms

### Recommended Workflow
1. Clone template for new service
2. Update service name and description
3. Implement business-specific endpoints
4. Customize UI templates as needed
5. Add environment-specific configuration
6. Deploy to target platform

## License

[Your License Here]

## Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review existing issues and PRs
