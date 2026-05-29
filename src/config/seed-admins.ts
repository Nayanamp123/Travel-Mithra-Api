import { demoAdmins } from "./demo-admins";
import {
  createAdmin,
  findAdminByEmail,
  findAdminByLogin,
} from "../repositories/admin.repository";
import { hashPassword } from "../utils/password";

export const seedDemoAdmins = async () => {
  for (const admin of demoAdmins) {
    const existingAdmin = await findAdminByLogin(admin.adminId) || await findAdminByEmail(admin.email.toLowerCase());

    if (existingAdmin) {
      await existingAdmin.update({
        name: admin.name,
        admin_id: admin.adminId,
        email: admin.email.toLowerCase(),
        password: await hashPassword(admin.password),
        role: "admin",
      });
      continue;
    }

    await createAdmin({
      name: admin.name,
      adminId: admin.adminId,
      email: admin.email.toLowerCase(),
      passwordHash: await hashPassword(admin.password),
    });
  }
};
