import { useState } from "react";
import type { TicketProp } from "../../App";
import "./Ticket.scss";
import DetailedTicket from "../DetailedTicket/DetailedTicket";

interface Props {
  ticket: TicketProp;
  isExpanded?: boolean;
}

export default function Ticket({ ticket, isExpanded }: Props) {
  return (
    <>
      {isExpanded ? (
        <div>
          <DetailedTicket ticket={ticket} />
        </div>
      ) : (
        <div className="overview-ticket-container">
          <div>
            <h1>{ticket.title}</h1>
            <span> {ticket.status} </span>
            <span> {ticket.type} </span>
          </div>
        </div>
      )}
    </>
  );
}
