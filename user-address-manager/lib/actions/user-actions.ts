'use server'

import { cache } from "react"
import db from "../db"
import { users } from "../db/schema"
import {  eq,  sql } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getFormFields } from "../utils"
import {  userInsertSchema, userUpdateSchema } from "../types/validation"
import { FormState } from "../types"

// Those actions should work with JS disabled too

export const getUsers = cache(async (page: number, perPage: number) => {
    return await db.
        select()
        .from(users)
        .limit(perPage)
        .offset((page - 1) * perPage)
        .orderBy(users.id)
})



export const getUserCount = cache(async () => {
    const [result] = await db.select({ count: sql`count(*)`.mapWith(Number) }).from(users);
    return result.count
})

export const createUserAction = async (prevState: FormState, data: FormData) => {
    const formData = Object.fromEntries(data)
    // double validation csr + ssr
    const parsed = userInsertSchema.safeParse(formData)

    if (!parsed.success) {
        const fields = getFormFields(formData)

        return {
            message: "Invalid form data",
            fields,
            issues: parsed.error.issues.map((issue) => issue.message),
        }
    }

    let initials = ''
    if (parsed.data.firstName && parsed.data.lastName) {
        initials = `${parsed.data.firstName.charAt(0)}${parsed.data.lastName.charAt(0)}`
    }

    const userDto: typeof users.$inferInsert = {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        initials,
        email: parsed.data.email,
        status: parsed.data.status,
    }
    try {
        await db.insert(users).values(userDto).execute()
    } catch (error) {
        
        // @ts-expect-error 'error' is of type 'unknown'.ts(18046)
        if (error.code === '23505') {
            return {
                message: 'User with given email already exists',
            }
        }
        return {
            message: 'User creation failed',
        }
    }
    revalidatePath('/users');
    return {
        message: 'User created successfully',
    }
}

export const updateUserAction = async (prevState: FormState, data: FormData) => {
    const formData = Object.fromEntries(data)
    const parsed = userUpdateSchema.safeParse(formData)

    if (!parsed.success) {
        const fields = getFormFields(formData)
        return {
            message: "Invalid form data",
            fields,
            issues: parsed.error.issues.map((issue) => issue.message),
        }
    }

    let initials = ''
    if (parsed.data.firstName && parsed.data.lastName) {
        initials = `${parsed.data.firstName.charAt(0)}${parsed.data.lastName.charAt(0)}`
    }

    const userDto: typeof users.$inferInsert = {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        initials,
        email: parsed.data.email,
        status: parsed.data.status,
    }
    try {
        await db.update(users).set(userDto).where(eq(users.id, parsed.data.id))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            message: 'User update failed',
        }
    }
    revalidatePath('/users');
    return {
        message: 'User updated successfully',
    }
}
export const deleteUser = async (id: number) => {
    await db.delete(users).where(eq(users.id, id))
    revalidatePath('/users');
}





