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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { UserAddress } from "@/lib/types/validation";
import EditUserAddressForm from "./edit-user-address-form";
import { formatDate } from "@/lib/utils";
import { deleteUserAddressAction } from "@/lib/actions/user-address-actions";

export const UserAddressesTableComponent = ({
  data,
  fetchData,
}: {
  data: UserAddress[];
  fetchData: () => Promise<void>;
}) => {
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = (address: UserAddress) => {
    setSelectedAddress(address);
    setDialogOpen(true); // Open the dialog
  };

  const handleDelete = async (address: UserAddress) => {
    await deleteUserAddressAction(address);
    await fetchData();
    // Optionally, remove the deleted address from the list by updating the state
  };

  const handleFormSubmitSuccess = () => {
    // Close dialog when form submission completes successfully
    setDialogOpen(false);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Country Code</TableHead>
            <TableHead>PostCode</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Street</TableHead>
            <TableHead>Building number</TableHead>
            <TableHead>Valid From</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, i) => (
            <ContextMenu key={i} modal={false}>
              <ContextMenuTrigger asChild>
                <TableRow>
                  <TableCell>{row.addressType}</TableCell>
                  <TableCell>{row.countryCode}</TableCell>
                  <TableCell>{row.postCode}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.street}</TableCell>
                  <TableCell>{row.buildingNumber}</TableCell>
                  <TableCell>{formatDate(row.validFrom)}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  <TableCell>{formatDate(row.updatedAt)}</TableCell>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                    handleEdit(row);
                  }}
                >
                  Edit address
                  <EditIcon className="ml-auto" />
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleDelete(row)}>
                  Delete <Trash className="ml-auto text-red-500" />
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </TableBody>
      </Table>

      {/* Dialog that opens separately */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit address</DialogTitle>
            <DialogDescription>
              Fill the form below to edit the address.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedAddress && (
              <EditUserAddressForm
                address={selectedAddress}
                onSuccess={handleFormSubmitSuccess}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
