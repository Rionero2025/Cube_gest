import { UserRole } from "@prisma/client";

export function canSeeFinance(role: UserRole) {
  return ["SUPER_ADMIN", "TENANT_ADMIN", "GESTIONE_FINANZIARIA"].includes(role);
}

export function canManageContracts(role: UserRole) {
  return ["SUPER_ADMIN", "TENANT_ADMIN", "MANAGER_OPERATIVO"].includes(role);
}

export function canManageUsers(role: UserRole) {
  return ["SUPER_ADMIN", "TENANT_ADMIN"].includes(role);
}
