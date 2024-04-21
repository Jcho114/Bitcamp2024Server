import { eq, desc } from "drizzle-orm";
import db from "../../drizzle/db";
import { AppointmentRequestTable, CreateAppointmentRequest, UserTable } from "../../drizzle/schema";

async function createAppointmentRequest(appointmentRequest: CreateAppointmentRequest) {
  const data = await db.insert(AppointmentRequestTable)
    .values(appointmentRequest)
    .returning({ id: AppointmentRequestTable.id });
  return data[0];
}

async function resolveAppointmentRequest(id: string) {
  const data = await db.update(AppointmentRequestTable)
    .set({ resolved: true })
    .where(eq(AppointmentRequestTable.id, id))
    .returning({ updatedId: AppointmentRequestTable.id });
  return data[0];
}

async function getAppointmentRequests() {
  const data = await db.select({
    id: AppointmentRequestTable.id,
    studentId: AppointmentRequestTable.studentId,
    date: AppointmentRequestTable.date,
    request: AppointmentRequestTable.request,
    tags: AppointmentRequestTable.tags,
    studentName: UserTable.name,
  })
    .from(AppointmentRequestTable)
    .innerJoin(UserTable, eq(UserTable.id, AppointmentRequestTable.studentId))
    .where(eq(AppointmentRequestTable.resolved, false))
    .orderBy(desc(AppointmentRequestTable.date));
  return data;
}

const appointmentService = {
  createAppointmentRequest,
  getAppointmentRequests,
  resolveAppointmentRequest,
}

export default appointmentService;
