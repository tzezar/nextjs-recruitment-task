"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({ count }: { count: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const perPage = Number(searchParams.get("perPage")) || 10;
  const totalPages = Math.ceil(count / perPage);
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set(
      "page",
      Math.min(totalPages, Math.max(1, +pageNumber)).toString()
    );
    return `${pathname}?${params.toString()}`;
  };

  const goToNextPage = () => {
    const newPage = currentPage + 1;
    const url = createPageURL(newPage);
    replace(url);
  };

  const goToPrevPage = () => {
    const newPage = currentPage - 1;
    const url = createPageURL(newPage);
    replace(url);
  };

  return (
    <div className="flex flex-row gap-4">
      <Button onClick={() => goToPrevPage()} disabled={currentPage === 1}>Prev</Button>
      <span>
          Page {currentPage} of {Math.ceil(count / perPage)}
        </span>
      <Button onClick={() => goToNextPage()} disabled={currentPage === totalPages}>Next</Button>
    </div>
  );
};
