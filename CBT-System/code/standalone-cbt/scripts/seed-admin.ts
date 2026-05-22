import "dotenv/config";

import { hashSync } from "bcryptjs";
import { db } from "../src/lib/db";
import { admins } from "../src/lib/db/schema";

async function main() {
  const name = process.env.BOOTSTRAP_ADMIN_NAME || "Standalone CBT Admin";
  const email = process.env.BOOTSTRAP_ADMIN_EMAIL || "admin@example.com";
  const password = process.env.BOOTSTRAP_ADMIN_PASSWORD || "ChangeMe123!";

  await db
    .insert(admins)
    .values({
      name,
      email: email.toLowerCase(),
      passwordHash: hashSync(password, 10),
    })
    .onConflictDoNothing();

  console.log(`Admin seed complete for ${email}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
