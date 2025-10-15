import prisma from '../prisma';

const RESTRICTRED_FIELDS = {
  updatedAt: true,
};

export class SampleRepository {
  async getAllSamples() {
    return await prisma.sample.findMany({
      omit: RESTRICTRED_FIELDS,
    });
  }

  async getSampleById(id: number) {
    return await prisma.sample.findUnique({
      where: {
        id
      },
      omit: RESTRICTRED_FIELDS,
    });
  }

  async createSample(name: string, code: string) {
    return await prisma.sample.create({
      data: {
        name,
        code,
      },
      omit: RESTRICTRED_FIELDS,
    });
  }
}
