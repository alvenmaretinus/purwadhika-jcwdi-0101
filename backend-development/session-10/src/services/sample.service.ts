import { SampleRepository } from '../repositories/sample.repositories';

export class SampleService {
  private sampleRepository: SampleRepository;

  constructor() {
    this.sampleRepository = new SampleRepository();
  }

  async getAllSamples() {
    return this.sampleRepository.getAllSamples();
  }

  async getSampleDataById(sampleId: number) {
    const sampleData = await this.sampleRepository.getSampleById(sampleId);

    if (!sampleData) {
      throw new Error('Sample not found');
    }

    return sampleData;
  }

  async createNewSample(name: string, code: string) {
    return this.sampleRepository.createSample(name, code);
  }
}
