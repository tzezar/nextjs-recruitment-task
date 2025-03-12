import { createSelectSchema } from 'drizzle-zod';
import { users, usersAddresses } from '../db/schema';
import { z } from 'zod';
import { iso3166Alpha3Pattern } from '../utils';


export const selectUserSchema = createSelectSchema(users)

export const userInsertSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email(),
    status: z.union([z.literal('ACTIVE'), z.literal('INACTIVE')]).describe('User status'),
});

export const userUpdateSchema = z.object({
    id: z.coerce.number(),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email(),
    status: z.union([z.literal('ACTIVE'), z.literal('INACTIVE')]),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const selectableUserAddressSchema = createSelectSchema(usersAddresses).extend({
    addressType: z.union([z.literal('HOME'), z.literal('INVOICE'), z.literal('POST'), z.literal('WORK')]),
})

export const userAddressInsertSchema = z.object({
    userId: z.coerce.number(),
    addressType: z.union([z.literal('HOME'), z.literal('INVOICE'), z.literal('POST'), z.literal('WORK')]),
    postCode: z.string()
        .length(6, { message: 'Post code must be exactly 6 characters long' })
        .regex(/^\d{6}$/, { message: 'Post code must contain only numbers' }),
    city: z.string().min(1, { message: 'City is required' }),
    street: z.string().min(1, { message: 'Street is required' }),
    buildingNumber: z.string().min(1, { message: 'Building number is required' }),
    countryCode: z
        .string()
        .regex(iso3166Alpha3Pattern, "Invalid country code (ISO3166-1 alpha-3)"),
});



export const userAddressUpdateSchema = z.object({
    // Composite ID
    userId: z.coerce.number(),
    addressType: z.union([z.literal('HOME'), z.literal('INVOICE'), z.literal('POST'), z.literal('WORK')]),
    validFrom: z.string().min(1, { message: 'Valid from is required' }),

    postCode: z.string().min(1, { message: 'Post code is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    street: z.string().min(1, { message: 'Street is required' }),
    buildingNumber: z.string().min(1, { message: 'Building number is required' }),
    countryCode: z
        .string()
        .regex(iso3166Alpha3Pattern, "Invalid country code (ISO3166-1 alpha-3)"),
})

export type UserAddressInsertDto = z.infer<typeof userAddressInsertSchema>
export type UserAddress = z.infer<typeof selectableUserAddressSchema>
export type UserUpdateDto = z.infer<typeof userUpdateSchema>
export type UserInsertDto = z.infer<typeof userInsertSchema>
export type SelectableUser = z.infer<typeof selectUserSchema>
export type UserAddressUpdateDto = z.infer<typeof userAddressUpdateSchema>