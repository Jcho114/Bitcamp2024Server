import { desc, eq } from "drizzle-orm";
import db from "../../drizzle/db";
import { CreateRootReply, CreateThread, RootReplyTable, ThreadTable, UserTable } from "../../drizzle/schema";

async function createThread(thread: CreateThread) {
  const data = await db.insert(ThreadTable)
    .values(thread)
    .returning({ id: ThreadTable.id });
  return data[0];
}

async function getThreads() {
  const data = await db.select()
    .from(ThreadTable)
    .orderBy(desc(ThreadTable.date));
  return data;
}

async function getThreadById(id: string) {
  const data = await db.query.ThreadTable.findFirst({
    where: eq(ThreadTable.id, id),
    with: {
      author: true,
      rootReplies: {
        orderBy: (rootReplies, { desc }) => [desc(rootReplies.date)],
        with: {
          author: true
        }
      },
    }
  });
  console.log(data);
  return data ? data : null;
}

async function createRootReply(rootReply: CreateRootReply) {
  const data = await db.insert(RootReplyTable)
    .values(rootReply)
    .returning({ id: RootReplyTable.id });
  return data[0];
}

const threadService = {
  createThread,
  getThreads,
  getThreadById,
  createRootReply,
}

export default threadService;
