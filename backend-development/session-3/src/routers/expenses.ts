import Router, { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import authMiddleware from '../middlewares/auth';
import { ERROR_RESOURCE_NOT_FOUND, ERROR_INCORRECT_INPUT_FORMAT } from '../constants/errorCodes';
import { getData, getNextId, updateData } from '../utils/dataStore';
import { Expense } from '../types/models';
import { INCOME_TYPE, EXPENSE_TYPE } from '../constants/expenses';

const router = Router();

/**
 * middleware for auth
 */
router.use(authMiddleware);

/**
 * routes for expenses api
 */

// get list of expenses
router.get('/', (req, res) => {
  const data = getData<Expense[]>('expenses');

  // reading from query param
  const { start, end, category }: { start?: string; end?: string; category?: string } = req.query;

  let filteredData = data;

  // filtering expenses between `start` and `end`
  if (start && end) {
    filteredData = (filteredData ?? []).filter(({ created }) => {
      return moment(created).isBetween(start, end, 'millisecond', '[]');
    });
  }

  // filtering expenses based on `category`
  if (category) {
    filteredData = (filteredData ?? []).filter(({ category: dataCategory }) => {
      return dataCategory.toLowerCase() === category.toLowerCase();
    });
  }

  // return filtered expenses
  res.status(200).json({ data: filteredData });
});

// get single expense
router.get('/:expenseId', (req, res, next) => {
  const data = getData<Expense[]>('expenses');
  const expenseId = parseInt(req.params.expenseId);

  const singleExpenseData = data?.find(({ id }) => id === expenseId) ?? null;

  res.status(200).json({ data: singleExpenseData });
});

// create single expense
router.post('/', (req, res, next) => {
  const { data: input } = req.body;

  // if improper body format
  if (!input) {
    next(new Error(ERROR_INCORRECT_INPUT_FORMAT));
    return;
  }

  // mapping user inputs, you might want to do some validation here
  const title = input.title;
  const type =
    input.type === INCOME_TYPE || input.type === EXPENSE_TYPE ? input.type : EXPENSE_TYPE; // set a random type if user didn't provide one
  const category = input.category;
  const nominal = input.nominal;

  const newExpenseData: Expense = {
    id: getNextId('expenses'),
    title,
    type,
    category,
    nominal,
    created: moment().toISOString(),
    updated: null,
  };

  // update expenses json
  updateData('expenses', [...(getData<Expense[]>('expenses') ?? []), newExpenseData] as Expense[]);

  res.status(200).json({ success: true, data: newExpenseData });
});

// update single expense
router.patch('/:expenseId', (req, res, next) => {
  const data = getData<Expense[]>('expenses');
  const { data: input } = req.body;
  const expenseId = parseInt(req.params.expenseId);

  // if improper body format
  if (!data) {
    next(new Error(ERROR_INCORRECT_INPUT_FORMAT));
    return;
  }

  const expenseToBeUpdated = data.find(({ id }) => id === expenseId);

  if (!expenseToBeUpdated) {
    next(new Error(ERROR_RESOURCE_NOT_FOUND));
    return;
  }

  // mapping user inputs, you might want to do some validation here
  const title = input.title;
  const type = input.type;
  const category = input.category;
  const nominal = input.nominal;

  const updatedExpenseData: Expense = {
    id: expenseToBeUpdated.id,
    title: title !== undefined ? title : expenseToBeUpdated.title,
    type: type !== undefined ? type : expenseToBeUpdated.type,
    category: category !== undefined ? category : expenseToBeUpdated.category,
    nominal: nominal !== undefined ? nominal : expenseToBeUpdated.nominal,
    created: expenseToBeUpdated.created,
    updated: moment().toISOString(),
  };

  const updatedExpenses = data.reduce<Expense[]>((acc, curr) => {
    if (curr.id === expenseId) {
      return [...acc, updatedExpenseData];
    }
    return [...acc, curr];
  }, []);

  updateData('expenses', updatedExpenses);

  res.status(200).json({ success: true, data: updatedExpenseData });
});

export default router;
