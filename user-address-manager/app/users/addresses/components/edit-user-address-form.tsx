"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useActionState, useRef, useEffect } from "react";
import { UserAddress, userAddressUpdateSchema } from "@/lib/types/validation";
import FormFlashMessage from "@/components/blocks/form-message";
import { updateUserAddressAction } from "@/lib/actions/user-address-actions";
import FormFlashMessageExtra from "@/components/blocks/form-message-extra";

export default function EditUserAddressForm(props: {
  address: UserAddress;
  onSuccess?: () => void;
}) {
  const [state, formAction] = useActionState(updateUserAddressAction, {
    message: "",
  });

  const form = useForm<z.output<typeof userAddressUpdateSchema>>({
    resolver: zodResolver(userAddressUpdateSchema),
    defaultValues: {
      ...props.address,
      ...state?.fields,
    },
  });

  const { street, buildingNumber, postCode, city, countryCode } = useWatch({
    control: form.control,
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Check if form submission was successful and call onSuccess callback
  useEffect(() => {
    if (state?.message === "Address updated successfully" && props.onSuccess) {
      props.onSuccess();
    }
  }, [state, props]);

  const fullAddress = `${street || ""} ${buildingNumber || ""}\n${
    postCode || ""
  } ${city || ""}\n${countryCode || ""}`;

  return (
    <div>
      <Form {...form}>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={form.handleSubmit(() => {
            if (formRef.current) {
              formAction(new FormData(formRef.current));
            }
          })}
          className="space-y-8"
        >
          <input type="hidden" {...form.register("userId")} />
          <input type="hidden" {...form.register("addressType")} />
          <input type="hidden" {...form.register("validFrom")} />

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
          <div className="flex justify-end">
            <Button type="submit" className="">
              Save
            </Button>
          </div>
          <FormFlashMessage state={state} />
          <FormFlashMessageExtra state={state} />
        </form>
      </Form>

      {/* Address Preview */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Address Preview:</h3>
        <pre className="whitespace-pre-wrap">{fullAddress}</pre>
      </div>
    </div>
  );
}
