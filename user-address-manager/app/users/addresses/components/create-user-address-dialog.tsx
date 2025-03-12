import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateUserAddressForm from "./create-user-address-form";

export function CreateUserAddressModal(props: {userId: number}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Address</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creating user address</DialogTitle>
          <DialogDescription>
            File the form below to create a new user address
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateUserAddressForm userId={props.userId}/>
        </div>
      </DialogContent>
    </Dialog>
  );
}
