export type DemoSession = {
  userId: string;
  tenantId?: string;
  role: "SUPER_ADMIN" | "TENANT_ADMIN" | "MANAGER_OPERATIVO" | "GESTIONE_FINANZIARIA" | "OPERATIVO_AVANZATO" | "OPERATIVO_BASE";
};

export const demoSuperAdmin: DemoSession = {
  userId: "demo-super-admin",
  role: "SUPER_ADMIN",
};
