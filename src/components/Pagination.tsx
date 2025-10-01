import React from "react";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-4 py-2">{page} / {pageCount}</span>
      <button
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}