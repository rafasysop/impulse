import { Request, Response } from 'express'
import { CreateMessageService } from '../services/CreateMessageService';

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { message } = req.body
    const service = new CreateMessageService();
    try {
      const result = await service.execute(message)
      return res.json(result)
    } catch (error) {
      res.json({ error: error.message })
    }
  }
}

export { CreateMessageController }
