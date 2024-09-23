import type { TicketProp } from "../../App";
import "./DetailedtTicket.scss";

interface Props {
  ticket: TicketProp;
  onChangeStatus: (tickedId: Number, currentStatus: String) => void;
}

export default function DetailedTicket({ ticket, onChangeStatus }: Props) {
  return (
    <div className="detailed-ticket-container">
      <div>
        <h1>{ticket.title}</h1>
        <div className="status-container">
          <span>
            <b>Status</b>
            <br />
            {ticket.status}
          </span>
          <br />
          <button
            onClick={() => {
              if (!ticket.id || !ticket.status) return;
              onChangeStatus(ticket.id, ticket.status);
            }}
          >
            Change status
          </button>
        </div>
        <br />
        <span>
          <b>Type</b>
          <br />
          {ticket.type}{" "}
        </span>
      </div>
      <br />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <b>Description</b>
        <p>{ticket.desc}</p>
      </div>
    </div>
  );
}
