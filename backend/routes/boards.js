import express from 'express'
import { protect } from '../middlewares/authMiddleware.js'
const router = express.Router()

import {
  getBoards,
  getBoard,
  createBoard,
  updateBoard,
} from '../controllers/boards.js'

router.get('/', protect, getBoards)
router.get('/:id', protect, getBoard)
router.post('/', protect, createBoard)
router.patch('/:id', protect, updateBoard)
// router.get('/',getBoards)
// router.get('/:id', getBoard)
// router.post('/', createBoard)
// router.patch('/:id', updateBoard)

export default router
