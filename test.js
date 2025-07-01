const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  const newUser = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob' + Date.now() + '@example.com', 
      password: 'secure123',
      created_at: new Date(),
    },
  });
  console.log('User created:', newUser);


  const allUsers = await prisma.user.findMany();
  console.log('All users:', allUsers);

 
  const userById = await prisma.user.findUnique({
    where: { id: newUser.id },
  });
  console.log('User by ID:', userById);

  
  const updatedUser = await prisma.user.update({
    where: { id: newUser.id },
    data: { name: 'Bob Updated' },
  });
  console.log('User updated:', updatedUser);


  const deletedUser = await prisma.user.delete({
    where: { id: newUser.id },
  });
  console.log('User deleted:', deletedUser);


const c1 = await prisma.user.findUnique({
  where: { id: 8 },
});
console.log(c1);

const c2 = await prisma.user.findUnique({
  where: { email: 'bob@example.com' },
});
console.log(c2);
}
main()
  .catch((error) => {
    console.error('Error occurred:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
