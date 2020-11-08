import { parseISO } from 'date-fns';
import { Router } from 'express';
import { container } from 'tsyringe';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutheticated';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentRepository);
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentService = container.resolve(CreateAppointmentService);

    const appointment = await appointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
