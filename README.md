# Microservice Starter Template

<p align="center">
  <img src="public/bulb.png" width="100" alt="Microservice Starter" />
</p>

<p align="center">
  A production-ready <strong>NestJS</strong> microservice template with built-in web UI, REST API, health monitoring, and AWS deployment support.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18+-green.svg" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-v10+-red.svg" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-v5+-blue.svg" alt="TypeScript" />
  <img src="https://img.shields.io/badge/AWS-Lambda%20Ready-orange.svg" alt="AWS Lambda" />
</p>

---

## 🚀 Quick Start

**Get your microservice running in 3 minutes:**

```bash
# 1. Clone or copy this template
git clone <your-repo-url> my-microservice
cd my-microservice

# 2. Install dependencies
npm install

# 3. Start development server
npm run start:dev
```

**🎉 Your microservice is ready!**
- **Web UI**: http://localhost:4100
- **API Docs**: http://localhost:4100/api-docs
- **Health Check**: http://localhost:4100/health

---

## 📋 What's Included

✅ **NestJS Framework** - Enterprise-grade Node.js framework  
✅ **REST API** - Full CRUD operations with validation  
✅ **Swagger Documentation** - Auto-generated API docs  
✅ **Web UI** - Responsive web pages with Handlebars templates  
✅ **Health Monitoring** - Memory, CPU, and uptime tracking  
✅ **AWS Deployment** - Ready-to-deploy Lambda container  
✅ **TypeScript** - Full type safety and modern JavaScript  
✅ **Input Validation** - Request validation with class-validator  
✅ **Environment Config** - Environment-based configuration  

---

## 🏗️ Project Structure

```
src/
├── dto/                 # Data Transfer Objects
├── health/             # Health monitoring service
├── app.controller.ts   # Web pages controller
├── api.controller.ts   # REST API controller (/api/*)
├── app.service.ts      # Business logic service
└── nestApp.ts         # Application bootstrap

views/                  # Handlebars templates
├── layouts/           # Page layouts
├── partials/          # Reusable components
└── *.hbs             # Page templates

public/                # Static assets (CSS, JS, images)
deployment/            # AWS deployment scripts
```

---

## 🔧 Development

### Running the Application

```bash
# Development with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

### Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Environment Configuration

Create a `.env` file for local development:

```env
PORT=4100
NODE_ENV=development
API_VERSION=v1
SERVICE_NAME=my-microservice
```

---

## 📚 API Documentation

### REST Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/samples` | Get all samples |
| `POST` | `/api/samples` | Create new sample |
| `GET` | `/api/samples/:id` | Get sample by ID |
| `PUT` | `/api/samples/:id` | Update sample |
| `DELETE` | `/api/samples/:id` | Delete sample |
| `GET` | `/health` | Health check |

### Web Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/status` | System status page |
| `/demo` | API demo page |

**📖 Full API documentation available at**: http://localhost:4100/api-docs

---

## ☁️ AWS Deployment

### Prerequisites

1. **AWS CLI configured** with appropriate permissions
2. **Docker installed** for container builds
3. **Update deployment configuration** in `.deployrc`

### Deployment Steps

```bash
# 1. Configure your AWS settings
cp .deployrc.example .deployrc
# Edit .deployrc with your AWS account details

# 2. Build and push Docker image
./push-image.sh

# 3. Deploy to AWS Lambda
./deploy-image.sh

# 4. View deployment logs
./see-logs.sh
```

### Deployment Configuration

Update `.deployrc` with your settings:

```bash
AWS_ACCOUNT_ID="123456789012"
AWS_REGION="us-east-1"
SERVICE_NAME="my-microservice"
LAMBDA_FUNCTION_NAME="my-microservice-lambda"
```

---

## 🛠️ Customization Guide

### 1. Update Branding

Replace "Microservice Starter" with your service name:

- **Templates**: `views/layouts/main.hbs`, `views/partials/header.hbs`
- **Package**: `package.json` name and description
- **Config**: `.deployrc` service name

### 2. Modify Data Model

Update the sample resource in:

- **DTOs**: `src/dto/sample.dto.ts`
- **Service**: `src/app.service.ts`
- **Controller**: `src/api.controller.ts`

### 3. Add New Endpoints

```typescript
// src/api.controller.ts
@Get('new-endpoint')
@ApiOperation({ summary: 'New endpoint' })
newEndpoint() {
  return this.appService.newMethod();
}
```

### 4. Database Integration

Replace in-memory storage with your database:

```bash
# Example: Add PostgreSQL
npm install @nestjs/typeorm typeorm pg @types/pg

# Example: Add MongoDB
npm install @nestjs/mongoose mongoose @types/mongoose
```

---

## 📈 Health Monitoring

The built-in health service provides:

- **Memory Usage** - Current memory consumption
- **CPU Usage** - System CPU metrics
- **Uptime** - Service uptime tracking
- **Status Checks** - Service health validation

Access health data:
- **Web**: http://localhost:4100/status
- **API**: http://localhost:4100/health

---

## 🔍 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in .env or kill process
lsof -ti:4100 | xargs kill -9
```

**TypeScript compilation errors:**
```bash
# Clean build
rm -rf dist/
npm run build
```

**AWS deployment fails:**
```bash
# Check AWS credentials
aws sts get-caller-identity

# Verify Docker is running
docker --version
```

### Getting Help

1. **Check TODO.md** - Step-by-step setup guide
2. **Review logs** - Application logs for errors
3. **Validate config** - Environment variables and AWS settings

---

## 📄 Additional Documentation

- **[TODO.md](TODO.md)** - Complete setup checklist
- **[TEMPLATE_README.md](TEMPLATE_README.md)** - Detailed template documentation
- **[TEMPLATE_SUMMARY.md](TEMPLATE_SUMMARY.md)** - Template features overview

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[NestJS](https://nestjs.com/)** - The progressive Node.js framework
- **[AWS Lambda](https://aws.amazon.com/lambda/)** - Serverless compute platform
- **[Swagger](https://swagger.io/)** - API documentation tools

---

<p align="center">
  <strong>🚀 Happy coding! Build amazing microservices! 🚀</strong>
</p>
