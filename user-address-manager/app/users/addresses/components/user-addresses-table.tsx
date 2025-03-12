"use client";

import { useEffect, useState } from "react";
import { CreateUserAddressModal } from "./create-user-address-dialog";
import { Button } from "@/components/ui/button";
import { UserAddressesTableComponent } from "./user-addresses-table-component";

export const UsersAddressesTable = ({ userId }: { userId: number }) => {
  const [addresses, setAddresses] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLoading] = useState(false);
  const perPage = 5;

  const fetchData = async () => {
    fetch(`/api/addresses?userId=${userId}&page=${page}&perPage=${perPage}`)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setAddresses(data.addresses);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log("Fetching data for page:", page);
    setLoading(true);
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, page, perPage]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <CreateUserAddressModal userId={userId} />
      </div>
      <UserAddressesTableComponent data={addresses} fetchData={fetchData} />

      <div className="flex gap-2 mt-4">
        <Button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
        >
          Prev Page
        </Button>
        <span>
          Page {page} of {Math.ceil(count / perPage)}
        </span>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * perPage >= count}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};
