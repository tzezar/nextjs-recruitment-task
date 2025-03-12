"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { EditIcon, Trash } from "lucide-react";
import { deleteUser } from "@/lib/actions/user-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserEditForm from "./edit-user-form";
import React from "react";
import { SelectableUser, UserUpdateDto } from "@/lib/types/validation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { UsersAddressesTable } from "../addresses/components/user-addresses-table";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const UsersTable = ({ data }: { data: SelectableUser[] }) => {
  const [selectedUser, setSelectedUser] = React.useState({} as UserUpdateDto);
  const [clickedRow, setClickedRow] = React.useState({} as SelectableUser);
  const [open, setOpen] = React.useState(false);

  const rowClickHandler = (row: SelectableUser) => {
    setClickedRow(row);
    setOpen(true);
  };

  return (
    <div >
      <Dialog>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className='text-right'>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Initials</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <ContextMenu key={row.id}>
                <ContextMenuTrigger asChild>
                  <TableRow
                    onClick={() => rowClickHandler(row)}
                    className="cursor-pointer"
                  >
                    <TableCell className='text-right'>{row.id}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.initials}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell><Badge>{row.status}</Badge></TableCell>
                    <TableCell> {formatDate(row.createdAt)}</TableCell>
                    <TableCell> {formatDate(row.updatedAt)}</TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onSelect={() => setSelectedUser(row as UserUpdateDto)} asChild>
                    <DialogTrigger className="flex flex-row w-full items-center">
                      Edit User
                      <EditIcon className="ml-auto" />
                    </DialogTrigger>
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => deleteUser(row.id)}>
                    Delete <Trash className="ml-auto text-red-500" />
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </TableBody>
        </Table>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editing user</DialogTitle>
            <DialogDescription>
              File the form below to edit a user
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <UserEditForm user={selectedUser} />
          </div>
        </DialogContent>
      </Dialog>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[90vh]">
          <SheetHeader>
            <SheetTitle>{clickedRow.firstName} {clickedRow.lastName} Addresses</SheetTitle>
            <SheetDescription>
              Make changes to the addresses
            </SheetDescription>
          </SheetHeader>
          <UsersAddressesTable userId={clickedRow.id}  />
        </SheetContent>
      </Sheet>
    </div>
  );
};
