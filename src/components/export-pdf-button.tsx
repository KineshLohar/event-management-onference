"use client";

import { RefObject } from "react";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

import { Button } from "@/components/ui/button";

interface ExportPdfButtonProps {
  contentRef: RefObject<HTMLDivElement | null>;
  className?: string
}

export function ExportPdfButton({
  contentRef,
  className =""
}: ExportPdfButtonProps) {
  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Conference Event",
  });

  return (
    <Button
      variant="outline"
      onClick={handlePrint}
      className={className}
    >
      <Printer className="mr-2 h-4 w-4" />
      Export PDF
    </Button>
  );
}