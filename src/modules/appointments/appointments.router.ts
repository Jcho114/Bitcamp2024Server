import { Router } from "express";
import { validateBody } from "../../middleware/validation.middleware";
import { AppointmentCreateSchema, AppointmentResolveSchema } from "./appointments.schema";
import appointmentController from "./appointments.controller";
import { getIdFromPayload } from "../../middleware/jwt.middleware";

const appointmentRouter = Router();

appointmentRouter.post("/create", getIdFromPayload, validateBody(AppointmentCreateSchema), appointmentController.makeAppointmentRequest);
appointmentRouter.get("/", getIdFromPayload, appointmentController.getAppointmentRequests);
appointmentRouter.put("/resolve", getIdFromPayload, validateBody(AppointmentResolveSchema), appointmentController.resolveAppointmentRequest);

export default appointmentRouter;
