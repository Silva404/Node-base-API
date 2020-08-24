import { Router } from 'express';

const appointmentRouter = Router();

appointmentRouter.post('/', (request, response) => {
  try {
    return;
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRouter;
