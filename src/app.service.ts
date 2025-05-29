import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSampleDto, SampleResponseDto } from 'src/dto/sample.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AppService {
  private samples: Map<string, SampleResponseDto> = new Map();

  getHello(): string {
    return 'Hello World!';
  }

  async createSample(
    createSampleDto: CreateSampleDto,
  ): Promise<SampleResponseDto> {
    const id = uuidv4();
    const now = new Date().toISOString();

    const sample: SampleResponseDto = {
      id,
      name: createSampleDto.name,
      description: createSampleDto.description,
      email: createSampleDto.email,
      createdAt: now,
      updatedAt: now,
    };

    this.samples.set(id, sample);
    return sample;
  }

  async getSample(id: string): Promise<SampleResponseDto> {
    const sample = this.samples.get(id);
    if (!sample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }
    return sample;
  }

  async getAllSamples(): Promise<SampleResponseDto[]> {
    return Array.from(this.samples.values());
  }

  async updateSample(
    id: string,
    updateSampleDto: CreateSampleDto,
  ): Promise<SampleResponseDto> {
    const existingSample = this.samples.get(id);
    if (!existingSample) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }

    const updatedSample: SampleResponseDto = {
      ...existingSample,
      name: updateSampleDto.name,
      description: updateSampleDto.description,
      email: updateSampleDto.email,
      updatedAt: new Date().toISOString(),
    };

    this.samples.set(id, updatedSample);
    return updatedSample;
  }

  async deleteSample(id: string): Promise<{ message: string }> {
    if (!this.samples.has(id)) {
      throw new NotFoundException(`Sample with ID ${id} not found`);
    }
    this.samples.delete(id);
    return { message: `Sample with ID ${id} deleted successfully` };
  }
}
