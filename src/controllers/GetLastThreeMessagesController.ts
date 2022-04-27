import { Request, Response } from "express";
import { GetLastThreeMessagesService } from "../services/GetLastThreeMessagesService";


class GetLastThreeMessagesController {
  async handle(req: Request, res: Response) {
    const service = new GetLastThreeMessagesService()
    const result = service.execute()
    
    return res.json(result)
  }
}


export { GetLastThreeMessagesController }
