import express from 'express';
import { PrismaClient } from '@prisma/client';

const PORT = 8000;

const app = express();

const prisma = new PrismaClient();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/api/branch', async (req, res) => {
  try {
    interface FilterQuery {
      id?: number;
      name?: string | Record<string, any>;
      createdAt?: Record<string, any>;
    }

    const { id, name, startDate, endDate, page = 1, itemsPerPage = 10 } = req.query;

    const filter: FilterQuery = {};

    if (id) {
      filter.id = parseInt(id as string);
    }

    if (name) {
      filter.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (startDate) {
      filter.createdAt = {
        gte: startDate ? new Date(startDate as string) : undefined,
        lte: endDate ? new Date(endDate as string) : undefined,
      };
    }

    // get count using aggregate
    // const branchCount = await prisma.branch.aggregate({
    //   _count: {
    //     id: true,
    //   },
    //   where: filter,
    // });
    const [branches, branchCount] = await prisma.$transaction([
      prisma.branch.findMany({
        where: filter,
        skip: (parseInt(page as string) - 1) * parseInt(itemsPerPage as string),
        take: parseInt(itemsPerPage as string),
      }),
      prisma.branch.count(),
    ]);
    
    res.status(200).send({
      rc: 200,
      success: true,
      data: branches,
      pagination: {
        totalItems: branchCount,
        page: parseInt(page as string),
        itemsPerPage: parseInt(itemsPerPage as string),
      },
    });
  } catch (error) {
    console.log(error);
  }
});

app.get('/api/branch/:branchId', async (req, res) => {
  try {
    const branch = await prisma.branch.findUnique({
      where: {
        id: parseInt(req.params.branchId),
      },
      include: {
        manager: true,
        classes: {
          select: {
            id: true,
            name: true,
            startAt: true,
            endAt: true,
          },
        },
      },
    });
    res.status(200).send({
      rc: 200,
      success: true,
      data: branch,
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/api/branch', async (req, res) => {
  try {
    const branch = await prisma.branch.create({
      data: req.body,
    });
    res.status(201).send({
      rc: 201,
      success: true,
      message: 'Successfully created new branch',
      data: branch,
    });
  } catch (error) {
    console.log(error);
  }
});

app.patch('/api/branch/:branchId', async (req, res) => {
  try {
    const updatedBranch = await prisma.branch.update({
      where: { id: parseInt(req.params.branchId) },
      data: {
        name: req.body.name,
        location: req.body.location,
      },
    });
    res.status(201).send({
      rc: 201,
      success: true,
      message: 'Successfully updated branch',
      data: updatedBranch,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/api/branch/:branchId', async (req, res) => {
  try {
    const deletedBranch = await prisma.branch.delete({
      where: { id: parseInt(req.params.branchId) },
    });
    res.status(201).send({
      rc: 201,
      success: true,
      message: 'Successfully deleted branch',
      data: deletedBranch,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
