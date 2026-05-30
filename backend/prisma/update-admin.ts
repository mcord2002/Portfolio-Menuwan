import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const newEmail = process.env.ADMIN_EMAIL;
  const newPassword = process.env.ADMIN_PASSWORD;
  const oldEmail = process.env.ADMIN_OLD_EMAIL ?? 'admin@menuwan.dev';

  if (!newEmail || !newPassword) {
    throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env');
  }

  if (newPassword.length < 6) {
    throw new Error('ADMIN_PASSWORD must be at least 6 characters');
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  const existing = await prisma.user.findUnique({ where: { email: oldEmail } });

  if (existing) {
    if (oldEmail !== newEmail) {
      const taken = await prisma.user.findUnique({ where: { email: newEmail } });
      if (taken && taken.id !== existing.id) {
        throw new Error(`Email already in use: ${newEmail}`);
      }
    }

    await prisma.user.update({
      where: { id: existing.id },
      data: { email: newEmail, password: hashed },
    });
    console.log('Admin credentials updated successfully.');
    console.log(`Email: ${newEmail}`);
    return;
  }

  const byNewEmail = await prisma.user.findUnique({ where: { email: newEmail } });

  if (byNewEmail) {
    await prisma.user.update({
      where: { id: byNewEmail.id },
      data: { password: hashed },
    });
    console.log('Admin password updated successfully.');
    console.log(`Email: ${newEmail}`);
    return;
  }

  await prisma.user.create({
    data: {
      email: newEmail,
      password: hashed,
      name: 'Menuwan Kalhara',
    },
  });
  console.log('Admin user created successfully.');
  console.log(`Email: ${newEmail}`);
}

main()
  .catch((err) => {
    console.error(err.message ?? err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
