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
import { useActionState, useRef, startTransition } from "react";
import { UserUpdateDto, userUpdateSchema } from "@/lib/types/validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserAction } from "@/lib/actions/user-actions";
import FormFlashMessage from "@/components/blocks/form-message";

export default function UserEditForm(props: { user: UserUpdateDto }) {
  const [state, formAction] = useActionState(updateUserAction, {
    message: "",
  });

  const form = useForm<z.output<typeof userUpdateSchema>>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      id: props.user.id,
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      email: props.user.email,
      status: props.user.status,
      ...state?.fields,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: any) => {
    startTransition(() => {
      formAction(new FormData(formRef.current!));
    });
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit)}  // Using handleSubmit here
        className="space-y-8"
      >
        <input type="hidden" {...form.register("id")} />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Sebastian" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Drozd" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tzezar44@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select user status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Determines if the user is active or inactive
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="">
          Update user
        </Button>
      </form>
      <FormFlashMessage state={state} />
    </Form>
  );
}
