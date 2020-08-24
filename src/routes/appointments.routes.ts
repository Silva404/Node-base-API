import { Router } from 'express';
import { parseISO } from 'date-fns';

const appointmentRouter = Router();

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    

    return response.json();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRouter;
