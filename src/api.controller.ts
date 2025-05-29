import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import { CreateSampleDto, SampleResponseDto } from 'src/dto/sample.dto';

@ApiTags('samples')
@Controller('api')
export class ApiController {
  constructor(private readonly appService: AppService) {}

  @Get('samples')
  @ApiOperation({ summary: 'Get all sample resources' })
  @ApiResponse({
    status: 200,
    description: 'List of sample resources retrieved successfully',
    type: [SampleResponseDto],
  })
  async getAllSamples(): Promise<SampleResponseDto[]> {
    return this.appService.getAllSamples();
  }

  @Post('samples')
  @ApiOperation({ summary: 'Create a sample resource' })
  @ApiBody({ type: CreateSampleDto })
  @ApiResponse({
    status: 201,
    description: 'Sample resource created successfully',
    type: SampleResponseDto,
  })
  async createSample(
    @Body() createSampleDto: CreateSampleDto,
  ): Promise<SampleResponseDto> {
    return this.appService.createSample(createSampleDto);
  }

  @Get('samples/:id')
  @ApiOperation({ summary: 'Get a sample resource by ID' })
  @ApiParam({ name: 'id', description: 'Sample resource ID' })
  @ApiResponse({
    status: 200,
    description: 'Sample resource retrieved successfully',
    type: SampleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sample resource not found' })
  async getSample(@Param('id') id: string): Promise<SampleResponseDto> {
    return this.appService.getSample(id);
  }

  @Put('samples/:id')
  @ApiOperation({ summary: 'Update a sample resource by ID' })
  @ApiParam({ name: 'id', description: 'Sample resource ID' })
  @ApiBody({ type: CreateSampleDto })
  @ApiResponse({
    status: 200,
    description: 'Sample resource updated successfully',
    type: SampleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Sample resource not found' })
  async updateSample(
    @Param('id') id: string,
    @Body() updateSampleDto: CreateSampleDto,
  ): Promise<SampleResponseDto> {
    return this.appService.updateSample(id, updateSampleDto);
  }

  @Delete('samples/:id')
  @ApiOperation({ summary: 'Delete a sample resource by ID' })
  @ApiParam({ name: 'id', description: 'Sample resource ID' })
  @ApiResponse({
    status: 200,
    description: 'Sample resource deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Sample resource not found' })
  async deleteSample(@Param('id') id: string): Promise<{ message: string }> {
    return this.appService.deleteSample(id);
  }
}
