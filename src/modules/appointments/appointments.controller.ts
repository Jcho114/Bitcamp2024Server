import { Request, Response } from "express";
import appointmentService from "./appointments.service";

async function makeAppointmentRequest(req: Request, res: Response) {
  const studentId = req.payload?.id;
  const appointmentRequest = {
    ...req.body,
    studentId
  }
  const { id } = await appointmentService.createAppointmentRequest(appointmentRequest);
  return res.status(201).json({ id });
}

async function getAppointmentRequests(req: Request, res: Response) {
  const appointmentRequests = await appointmentService.getAppointmentRequests();
  return res.status(200).json(appointmentRequests);
}

async function resolveAppointmentRequest(req: Request, res: Response) {
  const { updatedId } = await appointmentService.resolveAppointmentRequest(req.body.id);
  return res.status(200).json({ updatedId });
}

const appointmentController = {
  makeAppointmentRequest,
  getAppointmentRequests,
  resolveAppointmentRequest,
};

export default appointmentController;