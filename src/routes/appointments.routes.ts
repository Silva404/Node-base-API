import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentReposity';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

const appointmentReposity = new AppointmentsRepository();

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentReposity.all();

  return response.json(appointments);
});

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentReposity);

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentRouter;
