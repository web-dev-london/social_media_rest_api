import { userSchema, friendshipSchema, messageSchema, validateData } from "@/schema/zod";
import { users, friendships, messages } from "@/data/data-for-seed";
import { Friendship } from "@prisma/client";
import prisma from "./client-orm";


async function main() {
  // Validate data
  await validateData(users, userSchema, "user");
  await validateData(friendships, friendshipSchema, "friendship");
  await validateData(messages, messageSchema, "message");

  // Avoid duplicate insertion
  await prisma.user.createMany({ data: users, skipDuplicates: true });

  // Add friendships and messages
  await prisma.friendship.createMany({
    data: friendships.map(friendship => ({
      ...friendship,
      status: "PENDING" as Friendship["status"],
    })),
    skipDuplicates: true,
  });

  await prisma.message.createMany({ data: messages, skipDuplicates: true });

  console.log("Data seeded successfully!");
}





// async function main() {
//   await validateData(users, userSchema, "user");
//   await validateData(friendships, friendshipSchema, "friendship");
//   await validateData(messages, messageSchema, "message");

//   await prisma.user.createMany({ data: users });
//   await prisma.friendship.createMany({
//     data: friendships.map((friendship) => {
//       return {
//         ...friendship,
//         status: "PENDING" as Friendship["status"],
//       };
//     }),
//   });
//   await prisma.message.createMany({ data: messages });

//   console.log("Data seeded successfully!");
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });