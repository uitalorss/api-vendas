import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({ message: 'tamo aqui também' });
});
