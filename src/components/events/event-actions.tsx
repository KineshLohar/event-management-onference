"use client";

import { useRef, useState } from "react";
import type { Event } from "@/db/schema";

import {
    Eye,
    Edit2,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ViewEventDialog } from "../dialogs/view-event-dialog";
import { EditEventDialog } from "../dialogs/edit-event-dialog";
import { DeleteEventDialog } from "../dialogs/delete-event-dialog";
import { ExportPdfButton } from "../export-pdf-button";
import { EventPdf } from "./event-pdf";

type ModalType = "view" | "edit" | "delete" | null;

interface EventActionsProps {
    event: Event;
}

export default function EventActions({
    event,
}: EventActionsProps) {
    const pdfRef = useRef<HTMLDivElement>(null);
    const [modal, setModal] = useState<ModalType>(null);

    return (
        <>
            <TooltipProvider delayDuration={100}>
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="transition-colors"
                                onClick={() => setModal("view")}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                            View Event
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="transition-colors"
                                onClick={() => setModal("edit")}
                            >
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                            Edit Event
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => setModal("delete")}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>

                        <TooltipContent>
                            Delete Event
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <ExportPdfButton contentRef={pdfRef} />
                        </TooltipTrigger>

                        <TooltipContent>
                            Delete Event
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>

            {modal === "view" && <ViewEventDialog
                open={modal === "view"}
                onOpenChange={(open: boolean) =>
                    setModal(open ? "view" : null)
                }
                event={event}
            />
            }

            {modal === "edit" && <EditEventDialog
                open={modal === "edit"}
                onOpenChange={(open) => setModal(open ? "edit" : null)}
                event={event}
            />}

            {modal === "delete" && <DeleteEventDialog
                open={modal === "delete"}
                onOpenChange={(open) => setModal(open ? "delete" : null)}
                event={event}
            />
            }
            <div className="hidden">
                <EventPdf
                    ref={pdfRef}
                    event={event}
                />
            </div>
        </>
    );
}