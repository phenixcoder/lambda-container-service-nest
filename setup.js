#!/usr/bin/env node

/**
 * Lambda Container Service Template Setup Script
 *
 * This script reads a .lcsconf.json configuration file and configures
 * all templated parts of the microservice project.
 */

import fs from 'fs';
import path from 'path';

class MicroserviceSetup {
  constructor(configPath = '.lcsconf.json') {
    this.configPath = configPath;
    this.projectRoot = process.cwd();
    this.config = null;

    // Files that need template replacement
    this.templateFiles = [
      'package.json',
      'README.md',
      '.deployrc',
      'views/layouts/main.hbs',
      'views/partials/header.hbs',
      'views/partials/footer.hbs',
      'deploy-image.sh',
      'push-image.sh',
      'generate-env.sh',
      'see-logs.sh',
      '.vscode/settings.json',
    ];
  }

  /**
   * Main setup process
   */
  async setup() {
    try {
      console.log('🚀 Starting Lambda Container Service Template Setup...\n');

      this.loadConfig();
      this.validateConfig();
      this.showConfigSummary();

      await this.confirmSetup();

      this.updatePackageJson();
      this.updateDeployConfig();
      this.updateTemplateFiles();
      this.updateViewTemplates();
      this.updateDeploymentScripts();
      this.updateVSCodeSettings();
      this.createEnvironmentFile();
      this.updateReadme();

      this.showCompletionSummary();
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Load configuration from .lcsconf.json
   */
  loadConfig() {
    if (!fs.existsSync(this.configPath)) {
      throw new Error(
        `Configuration file ${this.configPath} not found. Please create it using .lcsconf.example.json as a template.`,
      );
    }

    try {
      const configContent = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(configContent);
    } catch (error) {
      throw new Error(`Failed to parse configuration file: ${error.message}`);
    }
  }

  /**
   * Validate required configuration fields
   */
  validateConfig() {
    const required = [
      'project.name',
      'project.description',
      'aws.accountId',
      'aws.region',
      'branding.serviceName',
    ];

    for (const field of required) {
      if (!this.getNestedValue(this.config, field)) {
        throw new Error(`Required configuration field missing: ${field}`);
      }
    }

    // Validate AWS Account ID format
    if (!/^\d{12}$/.test(this.config.aws.accountId)) {
      throw new Error('AWS Account ID must be exactly 12 digits');
    }

    // Validate project name format
    if (!/^[a-z0-9-]+$/.test(this.config.project.name)) {
      throw new Error(
        'Project name must contain only lowercase letters, numbers, and hyphens',
      );
    }
  }

  /**
   * Show configuration summary
   */
  showConfigSummary() {
    console.log('📋 Configuration Summary:');
    console.log('========================');
    console.log(`Project Name: ${this.config.project.name}`);
    console.log(
      `Display Name: ${this.config.project.displayName || this.config.project.name}`,
    );
    console.log(`Description: ${this.config.project.description}`);
    console.log(`AWS Account: ${this.config.aws.accountId}`);
    console.log(`AWS Region: ${this.config.aws.region}`);
    console.log(`Service Name: ${this.config.branding.serviceName}`);
    console.log(
      `Company: ${this.config.branding.companyName || 'Not specified'}`,
    );
    console.log('');
  }

  /**
   * Confirm setup with user
  async confirmSetup() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    });
    return new Promise((resolve) => {
      rl.question(
        '❓ Proceed with setup? This will modify template files. (y/N): ',
        (answer) => {
          rl.close();
          readline.close();
          if (answer.toLowerCase() !== 'y') {
            console.log('Setup cancelled.');
            process.exit(0);
          }
          resolve();
        },
      );
    });
  }

  /**
   * Update package.json with project configuration
   */
  updatePackageJson() {
    console.log('📦 Updating package.json...');

    const packagePath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    packageJson.name = this.config.project.name;
    packageJson.description = this.config.project.description;
    packageJson.version = this.config.project.version || '1.0.0';

    if (this.config.project.author) {
      packageJson.author = this.config.project.author;
    }

    if (this.config.project.repository) {
      packageJson.repository = {
        type: 'git',
        url: this.config.project.repository,
      };
    }

    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
  }

  /**
   * Update .deployrc with AWS configuration
   */
  updateDeployConfig() {
    console.log('☁️  Updating deployment configuration...');

    const deployPath = path.join(this.projectRoot, '.deployrc');
    const deployConfig = {
      name: this.config.project.name,
      type: 'service',
      registry: `${this.config.aws.accountId}.dkr.ecr.${this.config.aws.region}.amazonaws.com`,
      repo: this.config.aws.ecrRepository || this.config.project.name,
      environments: this.config.aws.environments || {},
    };

    fs.writeFileSync(deployPath, JSON.stringify(deployConfig, null, 2));
  }

  /**
   * Update view templates with branding
   */
  updateViewTemplates() {
    console.log('🎨 Updating view templates...');

    // Update main layout
    this.replaceInFile('views/layouts/main.hbs', [
      { from: 'Microservice Starter', to: this.config.branding.serviceName },
    ]);

    // Update header
    this.replaceInFile('views/partials/header.hbs', [
      {
        from: 'Microservice Starter Logo',
        to: `${this.config.branding.serviceName} Logo`,
      },
      { from: 'Microservice Starter', to: this.config.branding.serviceName },
    ]);

    // Update footer
    if (this.config.branding.companyName) {
      this.replaceInFile('views/partials/footer.hbs', [
        { from: 'Your Company Name', to: this.config.branding.companyName },
      ]);
    }
  }

  /**
   * Update deployment scripts
   */
  updateDeploymentScripts() {
    console.log('🚀 Updating deployment scripts...');

    const lambdaFunctionName =
      this.config.aws.lambdaFunctionName ||
      `${this.config.project.name}-lambda`;
    const ecrRepository =
      this.config.aws.ecrRepository || this.config.project.name;

    // Update generate-env.sh
    this.replaceInFile('generate-env.sh', [
      { from: 'your-lambda-function-name', to: lambdaFunctionName },
      { from: 'microservice-starter', to: this.config.project.name },
    ]);

    // Update see-logs.sh
    this.replaceInFile('see-logs.sh', [
      { from: 'your-lambda-function-name', to: lambdaFunctionName },
      {
        from: '/aws/lambda/microservice-starter',
        to: `/aws/lambda/${lambdaFunctionName}`,
      },
    ]);

    // Update push-image.sh
    this.replaceInFile('push-image.sh', [
      { from: 'microservice-starter', to: ecrRepository },
    ]);
  }

  /**
   * Update VS Code settings
   */
  updateVSCodeSettings() {
    console.log('⚙️  Updating VS Code settings...');

    const vscodeSettingsPath = path.join(
      this.projectRoot,
      '.vscode/settings.json',
    );
    if (fs.existsSync(vscodeSettingsPath)) {
      this.replaceInFile('.vscode/settings.json', [
        { from: 'microservice', to: this.config.project.name.toLowerCase() },
      ]);
    }
  }

  /**
   * Create environment file
   */
  createEnvironmentFile() {
    console.log('🌍 Creating environment file...');

    const envContent = `# ${this.config.branding.serviceName} Environment Configuration
PORT=${this.config.server?.port || 4100}
NODE_ENV=development
API_VERSION=v1
SERVICE_NAME=${this.config.project.name}
AWS_REGION=${this.config.aws.region}

# Add your environment-specific variables here
# DATABASE_URL=
# JWT_SECRET=
# API_KEY=
`;

    fs.writeFileSync(path.join(this.projectRoot, '.env.example'), envContent);
  }

  /**
   * Update README.md with project-specific information
   */
  updateReadme() {
    console.log('📖 Updating README.md...');

    const replacements = [
      {
        from: 'Microservice Starter Template',
        to: `${this.config.branding.serviceName} Template`,
      },
      { from: 'Microservice Starter', to: this.config.branding.serviceName },
      {
        from: '<your-repo-url>',
        to: this.config.project.repository || '<your-repo-url>',
      },
      { from: 'my-microservice', to: this.config.project.name },
    ];

    if (this.config.branding.companyName) {
      replacements.push({
        from: 'Your Company Name',
        to: this.config.branding.companyName,
      });
    }

    this.replaceInFile('README.md', replacements);
  }

  /**
   * Replace text in a file
   */
  replaceInFile(filePath, replacements) {
    const fullPath = path.join(this.projectRoot, filePath);

    if (!fs.existsSync(fullPath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    for (const { from, to } of replacements) {
      content = content.replace(new RegExp(this.escapeRegex(from), 'g'), to);
    }

    fs.writeFileSync(fullPath, content);
  }

  /**
   * Escape special regex characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Get nested object value using dot notation
   */
  getNestedValue(obj, path) {
    return path
      .split('.')
      .reduce((current, prop) => current && current[prop], obj);
  }

  /**
   * Show completion summary
   */
  showCompletionSummary() {
    console.log('\n✅ Setup completed successfully!');
    console.log('=================================');
    console.log(`🎯 Project: ${this.config.branding.serviceName}`);
    console.log(`📁 Name: ${this.config.project.name}`);
    console.log(
      `☁️  AWS: ${this.config.aws.accountId} (${this.config.aws.region})`,
    );
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Review the generated .env.example file');
    console.log('2. Install dependencies: npm install');
    console.log('3. Start development: npm run start:dev');
    console.log(
      '4. Visit: http://localhost:' + (this.config.server?.port || 4100),
    );
    console.log('');
    console.log('📚 Documentation:');
    console.log('- README.md - Main project documentation');
    console.log('- TODO.md - Setup checklist');
    console.log('- TEMPLATE_README.md - Template details');
    console.log('');
    console.log('🚀 Happy coding!');
  }
}
// CLI execution
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  const configPath = process.argv[2] || '.lcsconf.json';
  const setup = new MicroserviceSetup(configPath);
  setup.setup().catch(console.error);
}

export default MicroserviceSetup;
