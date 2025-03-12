import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateUserForm from "./create-user-form";

export function CreateUserModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creating user</DialogTitle>
          <DialogDescription>
            File the form below to create a new user
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateUserForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
