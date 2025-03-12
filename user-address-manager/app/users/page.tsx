import React, { Suspense } from "react";
import { Skeleton } from "../../components/blocks/skeleton";
import { Pagination } from "./components/pagination";
import { getUserCount, getUsers } from "@/lib/actions/user-actions";
import { CreateUserModal } from "./components/create-user-dialog";
import { UsersTable } from "./components/users-table";

export default async function SomePage(props: {
  searchParams?: Promise<{
    page?: string;
    perPage?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 10;
  const count = await getUserCount();
  const users = await getUsers(currentPage, 10);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <CreateUserModal />
      </div>
      <Suspense key={`${currentPage}-${perPage}`} fallback={<Skeleton />}>
        <UsersTable data={users} />
      </Suspense>
      <Pagination count={count} />
    </div>
  );
}
