"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useRef } from "react";
import { userAddressInsertSchema } from "@/lib/types/validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormFlashMessage from "@/components/blocks/form-message";
import { createUserAddressAction } from "@/lib/actions/user-address-actions";
import FormFlashMessageExtra from "@/components/blocks/form-message-extra";

export default function CreateUserAddressForm(props: { userId: number }) {
  const [state, formAction] = useActionState(createUserAddressAction, {
    message: "",
  });

  const form = useForm<z.output<typeof userAddressInsertSchema>>({
    resolver: zodResolver(userAddressInsertSchema),
    defaultValues: {
      userId: props.userId,
      addressType: "HOME",
      postCode: "",
      city: "",
      street: "",
      buildingNumber: "",
      countryCode: "",
      ...state?.fields,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={form.handleSubmit(() => {
          formAction(new FormData(formRef.current!));
        })}
        className="space-y-8"
      >
        <input type="hidden" {...form.register("userId")} />

        <FormField
          control={form.control}
          name="addressType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address type</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="HOME">Home</SelectItem>
                  <SelectItem value="INVOICE">Invoice</SelectItem>
                  <SelectItem value="POST">Post</SelectItem>
                  <SelectItem value="WORK">Work</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Determines the address type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code</FormLabel>
              <FormControl>
                <Input placeholder="USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Code</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Bielsko-Biała" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street</FormLabel>
              <FormControl>
                <Input placeholder="Szkolna" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buildingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Building Number</FormLabel>
              <FormControl>
                <Input placeholder="17" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Create user address
        </Button>
        <FormFlashMessage state={state} />
        <FormFlashMessageExtra state={state} />
      </form>
    </Form>
  );
}
