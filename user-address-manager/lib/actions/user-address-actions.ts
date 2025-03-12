'use server'

import { and, desc, eq } from "drizzle-orm"
import { usersAddresses } from "../db/schema"
import db from "../db"
import { userAddressInsertSchema, userAddressUpdateSchema } from "../types/validation"
import { getFormFields } from "../utils"
import { FormState } from "../types"
import { revalidatePath } from "next/cache"

// Those actions should work with JS disabled too

export const createUserAddressAction = async (prevState: FormState, data: FormData) => {
    const formData = Object.fromEntries(data)
    // double validation csr + ssr
    const parsed = userAddressInsertSchema.safeParse(formData)

    if (!parsed.success) {
        const fields = getFormFields(formData)

        return {
            message: "Invalid form data",
            fields,
            issues: parsed.error.issues.map((issue) => issue.message),
        }
    }

    const insertDto: typeof usersAddresses.$inferInsert = {
        userId: parsed.data.userId,
        addressType: parsed.data.addressType,
        validFrom: new Date().toISOString(),
        postCode: parsed.data.postCode,
        city: parsed.data.city,
        countryCode: parsed.data.countryCode,
        street: parsed.data.street,
        buildingNumber: parsed.data.buildingNumber
    }
    try {
        await db.insert(usersAddresses).values(insertDto).returning().execute()
    } catch (error) {
        console.log(error)
        return {
            message: 'User address creation failed',
        }
    }
    revalidatePath('/users');
    return {
        message: 'User address created successfully',
    }
}

export const deleteUserAddressAction = async (address: {
    userId: number
    addressType: string
    postCode: string
    city: string
    countryCode: string
    street: string
    buildingNumber: string
}) => {
    await db.delete(usersAddresses).where(
        and(
            eq(usersAddresses.userId, address.userId),
            eq(usersAddresses.addressType, address.addressType),
            eq(usersAddresses.postCode, address.postCode),
            eq(usersAddresses.city, address.city),
            eq(usersAddresses.countryCode, address.countryCode),
            eq(usersAddresses.street, address.street),
            eq(usersAddresses.buildingNumber, address.buildingNumber),
        )
    )
    revalidatePath('/users');
}

export const updateUserAddressAction = async (prevState: FormState, data: FormData) => {
    const formData = Object.fromEntries(data)
    // double validation csr + ssr
    const parsed = userAddressUpdateSchema.safeParse(formData)

    console.log('parsed', parsed)

    if (!parsed.success) {
        const fields = getFormFields(formData)
        console.log('issues', parsed.error.issues.map((issue) => issue))
        return {
            message: "Invalid form data",
            fields,
            issues: parsed.error.issues.map((issue) => issue.message),
        }
    }

    const latestAddress = await db
        .select()
        .from(usersAddresses)
        .where(and(eq(usersAddresses.userId, parsed.data.userId), eq(usersAddresses.addressType, parsed.data.addressType)))
        .orderBy(desc(usersAddresses.validFrom))
        .limit(1);

    const insertDto = {
        postCode: parsed.data.postCode,
        city: parsed.data.city,
        countryCode: parsed.data.countryCode,
        street: parsed.data.street,
        buildingNumber: parsed.data.buildingNumber,
    }

    try {
        await db
            .update(usersAddresses)
            .set({ ...insertDto }) // Replace with the actual column you need to update
            .where(
                and(
                    eq(usersAddresses.userId, parsed.data.userId),
                    eq(usersAddresses.addressType, parsed.data.addressType),
                    eq(usersAddresses.validFrom, latestAddress[0].validFrom)
                )
            );
    } catch (error) {
        console.log(error)
        return {
            message: 'User address update failed',
        }
    }
    revalidatePath('/users');
    return {
        message: 'User address updated successfully',
    }
}