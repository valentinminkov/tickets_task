import { useState } from "react";
import type { TicketProp } from "../../App";
import "./Ticket.scss";
import DetailedTicket from "../DetailedTicket/DetailedTicket";

interface Props {
  ticket: TicketProp;
}

export default function Ticket({ ticket }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {isExpanded ? (
        <div onClick={() => setIsExpanded(!isExpanded)}>
          <DetailedTicket ticket={ticket} />
        </div>
      ) : (
        <div
          className="overview-ticket-container"
          onClick={() => setIsExpanded(!isExpanded)}
        >
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
