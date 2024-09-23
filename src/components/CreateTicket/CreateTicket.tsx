import { useState } from "react";
import type { TicketProp, TicketType } from "../../App";

interface Props {
  onSubmit: (ticketData: TicketProp) => void;
}
const CreateTicket = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Epic");
  const [status, setStatus] = useState("");

  const handleSubmit = () => {
    const ticketType = type as TicketType;
    const ticket: TicketProp = {
      title,
      desc: description,
      type: ticketType,
      status,
    };
    onSubmit(ticket);
  };

  return (
    <div>
      <div>
        <p>Title</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <p>Description</p>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <p>Type</p>
        <input value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <div>
        <p>Status</p>
        <input value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>

      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateTicket;
