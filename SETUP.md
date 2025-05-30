# Template Setup System

The Lambda Container Service Template includes an automated setup system that configures all templated parts of the project based on a JSON configuration file.

## Quick Start

1. **Copy the example configuration:**
   ```bash
   cp .lcsconf.example.json .lcsconf.json
   ```

2. **Edit your configuration:**
   ```bash
   nano .lcsconf.json
   ```

3. **Run the setup:**
   ```bash
   ./setup.sh
   ```

## Configuration File (.lcsconf.json)

The setup system uses a JSON configuration file with the following structure:

### Project Configuration
```json
{
  "project": {
    "name": "my-microservice",           // Project name (lowercase, hyphens only)
    "displayName": "My Microservice",    // Human-readable name
    "description": "A sample microservice built from the template",
    "version": "1.0.0",                  // Initial version
    "author": "Your Name",               // Project author
    "repository": "https://github.com/yourorg/my-microservice"  // Git repo URL
  }
}
```

### AWS Configuration
```json
{
  "aws": {
    "accountId": "123456789012",         // AWS Account ID (12 digits)
    "region": "us-east-1",               // Primary AWS region
    "lambdaFunctionName": "my-microservice-lambda",  // Lambda function name
    "ecrRepository": "my-microservice",   // ECR repository name
    "environments": {
      "production": "prod-workspace-id",
      "beta": "beta-workspace-id",
      "development": "dev-workspace-id"
    }
  }
}
```

### Branding Configuration
```json
{
  "branding": {
    "serviceName": "My Microservice",    // Service display name
    "companyName": "Your Company Name",  // Company name for copyright
    "logoPath": "/bulb.png",             // Logo image path
    "primaryColor": "#007acc"            // Primary brand color (hex)
  }
}
```

### Server Configuration
```json
{
  "server": {
    "port": 4100,                        // Default server port
    "apiPrefix": "api"                   // API route prefix
  }
}
```

### Feature Toggles
```json
{
  "features": {
    "healthCheck": true,                 // Enable health check endpoints
    "swagger": true,                     // Enable Swagger API docs
    "webUI": true                        // Enable web UI pages
  }
}
```

## What Gets Configured

The setup script automatically updates the following files and configurations:

### Project Files
- **`package.json`** - Name, description, version, author, repository
- **`README.md`** - Service name, repository URLs, company branding
- **`.env.example`** - Environment variables template

### AWS Deployment
- **`.deployrc`** - AWS account, region, ECR repository configuration
- **`deploy-image.sh`** - Deployment script with correct names
- **`push-image.sh`** - Image push script configuration
- **`generate-env.sh`** - Lambda function name configuration
- **`see-logs.sh`** - CloudWatch log group names

### Web Templates
- **`views/layouts/main.hbs`** - Page title and branding
- **`views/partials/header.hbs`** - Service name and logo
- **`views/partials/footer.hbs`** - Company name and copyright

### Development Environment
- **`.vscode/settings.json`** - VS Code project settings
- **Environment variables** - Server port, API configuration

## Command Line Usage

### Basic Setup
```bash
# Use default configuration file (.lcsconf.json)
./setup.sh
```

### Custom Configuration File
```bash
# Use a specific configuration file
./setup.sh my-config.json
```

### Node.js Direct Execution
```bash
# Run setup script directly with Node.js
node setup.js .lcsconf.json
```

## Setup Process

The setup script follows this process:

1. **Load Configuration** - Reads and parses the JSON configuration file
2. **Validate Configuration** - Checks required fields and format validity
3. **Show Summary** - Displays configuration details for review
4. **User Confirmation** - Asks for confirmation before making changes
5. **Update Files** - Replaces all template placeholders with actual values
6. **Create Environment** - Generates `.env.example` with project settings
7. **Completion Summary** - Shows next steps and important information

## Validation Rules

The setup script validates:

- **Project name**: Must contain only lowercase letters, numbers, and hyphens
- **AWS Account ID**: Must be exactly 12 digits
- **Required fields**: All required configuration fields must be present
- **File existence**: All template files must exist before modification

## Example Configuration

Here's a complete example configuration:

```json
{
  "project": {
    "name": "payment-processor",
    "displayName": "Payment Processor Service",
    "description": "Microservice for processing payment transactions",
    "version": "1.0.0",
    "author": "Development Team",
    "repository": "https://github.com/company/payment-processor"
  },
  "aws": {
    "accountId": "123456789012",
    "region": "us-east-1",
    "lambdaFunctionName": "payment-processor-lambda",
    "ecrRepository": "payment-processor",
    "environments": {
      "production": "prod-payment-workspace",
      "beta": "beta-payment-workspace"
    }
  },
  "branding": {
    "serviceName": "Payment Processor",
    "companyName": "Acme Corporation",
    "logoPath": "/payment-logo.png",
    "primaryColor": "#2E8B57"
  },
  "server": {
    "port": 4200,
    "apiPrefix": "api/v1"
  },
  "features": {
    "healthCheck": true,
    "swagger": true,
    "webUI": false
  }
}
```

## After Setup

Once setup is complete:

1. **Install dependencies**: `npm install`
2. **Review generated files**: Check `.env.example` and updated configurations
3. **Start development**: `npm run start:dev`
4. **Test the service**: Visit http://localhost:[PORT]
5. **Review documentation**: Check updated README.md and TODO.md

## Troubleshooting

### Common Issues

**Configuration file not found:**
```bash
cp .lcsconf.example.json .lcsconf.json
nano .lcsconf.json
```

**Invalid project name format:**
- Use only lowercase letters, numbers, and hyphens
- Example: `my-payment-service` ✅, `MyPaymentService` ❌

**Invalid AWS Account ID:**
- Must be exactly 12 digits
- Example: `123456789012` ✅, `12345` ❌

**Permission denied:**
```bash
chmod +x setup.sh
./setup.sh
```

### Reset Template

To reset the template to its original state:
```bash
git checkout -- .
# Or restore from backup if needed
```

## Schema Validation

The configuration file can be validated against the JSON schema:
- **Schema file**: `.lcsconf.schema.json`
- **Example file**: `.lcsconf.example.json`

Many editors (VS Code, IntelliJ) provide automatic validation and autocomplete when the schema is referenced in the configuration file.

## Contributing

To extend the setup system:

1. **Add new template files** to the `templateFiles` array in `setup.js`
2. **Add configuration options** to `.lcsconf.schema.json`
3. **Update example configuration** in `.lcsconf.example.json`
4. **Add replacement logic** in the appropriate update method
5. **Test thoroughly** with different configurations

The setup system is designed to be extensible and maintainable for future template enhancements.
