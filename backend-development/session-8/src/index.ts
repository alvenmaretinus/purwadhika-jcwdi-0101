import express from 'express';
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const PORT = 8000;

const app = express();

const prisma = new PrismaClient();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

/**
 * Articles API
 */

app.get('/api/articles', async (req, res) => {
  try {
    const { search = '', page = 1, pageSize = 10, startDate, endDate } = req.query;

    const [articles, articleCount] = await prisma.$transaction([
      prisma.article.findMany({
        include: {
          author: true,
          _count: {
            select: { comments: true },
          },
        },
        where: {
          title: { contains: search as string, mode: 'insensitive' },
          createdAt: {
            gte: startDate ? new Date(startDate as string) : undefined,
            lte: endDate ? new Date(endDate as string) : undefined,
          },
        },
        skip: (parseInt(page as string) - 1) * parseInt(pageSize as string),
        take: parseInt(pageSize as string),
      }),
      prisma.article.count(),
    ]);

    const mappedArticles = articles.map((article) => ({
      ...article,
      _count: undefined,
      commentCount: article._count.comments,
    }));

    res.status(200).json({
      success: true,
      data: {
        articles: mappedArticles,
      },
      pagination: {
        totalItems: articleCount,
        page: parseInt(page as string),
        pageSize: parseInt(pageSize as string),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await prisma.article.findUnique({
      where: {
        slug,
      },
      include: {
        author: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: {
        article,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const {
      article: { slug, title, content },
      authorId,
    } = req.body;

    const newArticle = await prisma.article.create({
      data: {
        slug,
        title,
        content,
        authorId,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        article: newArticle,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.patch('/api/articles', async (req, res) => {
  try {
    const {
      article: { id, title, content },
    } = req.body;

    const updatedArticle = await prisma.article.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        article: updatedArticle,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

/**
 * Users API
 */

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      success: true,
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const {
      user: { name },
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

/**
 * Comments API
 */

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();

    res.status(200).json({
      success: true,
      data: {
        comments,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    const {
      comment: { articleId, userId, content },
    } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        articleId,
        userId,
        content,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        comment: newComment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.patch('/api/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;
    const {
      comment: { content },
    } = req.body;

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        comment: updatedComment,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong, please try again later.',
      stackTrace: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
