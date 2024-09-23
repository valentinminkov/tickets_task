import { useState } from "react";
import type { TicketProp } from "../../App";
import "./Ticket.scss";
import DetailedTicket from "../DetailedTicket/DetailedTicket";

interface Props {
  ticket: TicketProp;
  isExpanded?: boolean;
  onChangeStatus: (tickedId: Number, currentStatus: String) => void;
}

export default function Ticket({ ticket, isExpanded, onChangeStatus }: Props) {
  return (
    <>
      {isExpanded ? (
        <div>
          <DetailedTicket onChangeStatus={onChangeStatus} ticket={ticket} />
        </div>
      ) : (
        <div className="overview-ticket-container">
          <div>
            <h1>
              {ticket.id && <span>({ticket.id.toString()})</span>}{" "}
              {ticket.title}
            </h1>
            <span> {ticket.status} </span>
            <span> {ticket.type} </span>
          </div>
        </div>
      )}
    </>
  );
}
