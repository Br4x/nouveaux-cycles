import type { IncomingMessage, ServerResponse } from "http";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: IncomingMessage, res1: ServerResponse) => {
    const table = "cercle"
    await prisma[table].updateMany({
        where: {
          isSanity: {
            equals: true,
          },
          tags: {
            every: {
              fullname: {
                equals: query.tag.toString(),
              },
            },
          },
        },
        data: {
          statusChrome: "waiting",
          statusSafari: "waiting",
          lastLaunch: null,
          lastVideoPathChrome: null,
          lastVideoPathSafari: null,
        },
      });
};
