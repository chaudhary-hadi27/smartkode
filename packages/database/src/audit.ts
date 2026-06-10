import { prisma } from "../client";
import { Prisma } from "@prisma/client";

export async function createAuditLog(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  oldValue: any = null,
  newValue: any = null,
  ipAddress: string | null = null
) {
  try {
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action,
        entity_type: entityType,
        entity_id: entityId,
        old_value: oldValue ? (oldValue as Prisma.InputJsonValue) : null,
        new_value: newValue ? (newValue as Prisma.InputJsonValue) : null,
        ip_address: ipAddress,
      },
    });
  } catch (error) {
    console.error("Failed to create audit log:", error);
    // Audit log failure shouldn't crash the main operation, but should be alerted
  }
}
