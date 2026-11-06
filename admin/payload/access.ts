import type { Access, FieldAccess, PayloadRequest } from "payload";

export type Role = "superadmin" | "admin" | "editor";

type MaybeUser = { id?: number | string; role?: Role } | null | undefined;

export const roleOf = (req: PayloadRequest): Role | undefined => (req.user as MaybeUser)?.role;
export const isSuperAdmin = (req: PayloadRequest) => roleOf(req) === "superadmin";
export const isAdminOrAbove = (req: PayloadRequest) => ["superadmin", "admin"].includes(roleOf(req) ?? "");

export const loggedIn: Access = ({ req }) => Boolean(req.user);
export const adminOrAbove: Access = ({ req }) => isAdminOrAbove(req);
export const superAdminOnly: Access = ({ req }) => isSuperAdmin(req);
export const adminOrAboveField: FieldAccess = ({ req }) => isAdminOrAbove(req);

