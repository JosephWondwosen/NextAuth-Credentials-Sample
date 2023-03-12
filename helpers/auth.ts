import { hash, compare } from "bcryptjs";

export async function hashPwd(password: string) {
  return await hash(password, 10);
}

export async function verifyPwd(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}
