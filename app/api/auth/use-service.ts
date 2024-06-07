import prismadb from "@/lib/prismadb";

export const userService = {
  authenticate,
};

function authenticate(username: string) {
  // if (username !== "admin" && password !== "admin") {
  //   return null;
  // }

  //   const user = {
  //     id: "9001",
  //     name: "Web Admin",
  //     email: "admin@example.com",
  //     data: "data",
  //   }; //(3)

  const user = prismadb.user.findFirst({
    where: {
      OR: [{ username: username }, { email: username }],
    },
  });

  return user; //(4)
}
