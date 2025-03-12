import { relations } from "drizzle-orm/relations";
import { users, usersAddresses } from "./schema";

export const usersAddressesRelations = relations(usersAddresses, ({one}) => ({
	user: one(users, {
		fields: [usersAddresses.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	usersAddresses: many(usersAddresses),
}));