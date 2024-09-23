import type { TicketProp } from "../../App";
import "./DetailedtTicket.scss";

interface Props {
  ticket: TicketProp;
}

export default function DetailedTicket({ ticket }: Props) {
  return (
    <div className="detailed-ticket-container">
      <div>
        <h1>{ticket.title}</h1>
        <span>
          <b>status:</b> {ticket.status}
        </span>
        <br />
        <span>
          <b>type: </b> {ticket.type}{" "}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <b>Description</b>
        <p>{ticket.desc}</p>
      </div>
    </div>
  );
}
