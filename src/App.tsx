import React, { useEffect, useState } from "react";
import CreateTicket from "./components/CreateTicket/CreateTicket";
import {
  createNewTicket,
  getMockTicketsData,
  getMockTicketTypesData,
  TicketsData,
} from "./dummyApi";
import "./App.css";
import Ticket from "./components/Ticket/Ticket";

export type TicketType = "Epic" | "Story" | "Bug";

type TicketObj = {
  id: Number;
  text: String;
};

export interface TicketProp {
  id?: Number;
  title: String;
  desc: String;
  status: String;
  type: TicketType;
}

function App() {
  const [fullTicketsData, setFullTicketsData] = useState<TicketProp[]>([]);
  const [ticketsData, setTicketsData] = useState<TicketProp[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketObj[]>([]);
  const [isNewTicketCreated, setIsNewTicketCreated] = useState<Boolean>(false);
  const [expandedTicketId, setExpandedTicketId] = useState<Number>(-1);

  useEffect(() => {
    const fetchTicketsData = async () => {
      try {
        const [data, types] = await Promise.all([
          getMockTicketsData(),
          getMockTicketTypesData(),
        ]);

        const formattedTickets: TicketProp[] = data.map((ticket) =>
          formatTicket(ticket, types)
        );

        setFullTicketsData(formattedTickets);
        setTicketTypes(types);
        setTicketsData(formattedTickets);
      } catch (error) {
        console.error("error fetching tickets data:", error);
      }
    };

    fetchTicketsData();
  }, []);

  const onNewTicketSubmit = async (newTicket: TicketProp) => {
    const newTicketData = await createNewTicket(newTicket);
    const allTickets = JSON.parse(JSON.stringify(ticketsData));

    allTickets.push(formatTicket(newTicketData, ticketTypes));

    setTicketsData(allTickets);
    setFullTicketsData(allTickets);
    setIsNewTicketCreated(false);
  };

  const formatTicket = (ticket: TicketsData, ticketTypes: any) => {
    return {
      id: ticket.id,
      title: ticket.title,
      desc: ticket.desc,
      status: ticket.status,
      type: ticketTypes[
        ticketTypes.findIndex((type: any) => type.id == ticket.type)
      ].text as TicketType,
    };
  };

  const filterTicketsByType = (type: string) => {
    if (type === "All") {
      setTicketsData(fullTicketsData);
      return;
    }

    const allTickets = JSON.parse(JSON.stringify(fullTicketsData));
    const filteredTickets = allTickets.filter(
      (ticket: TicketProp) => ticket.type === type
    );
    setTicketsData(filteredTickets);
  };

  const onChangeStatus = (tickedId: Number, currentStatus: String) => {
    const allTickets: TicketProp[] = JSON.parse(
      JSON.stringify(fullTicketsData)
    );
    let newStatus: string | undefined;
    const ticketIndexToUpdate = allTickets.findIndex(
      (ticket) => ticket.id === tickedId
    );

    switch (currentStatus) {
      case "Open":
        newStatus = "In Progress";
        break;
      case "In Progress":
        newStatus = "Closed";
        break;
      case "Closed":
        newStatus = "Open";
        break;
      default:
        newStatus = "Open";
        break;
    }

    if (!newStatus || ticketIndexToUpdate < 0) return;

    allTickets[ticketIndexToUpdate].status = newStatus;
    setTicketsData(allTickets);
    setFullTicketsData(allTickets);
  };

  return (
    <div className="App">
      {isNewTicketCreated && <CreateTicket onSubmit={onNewTicketSubmit} />}
      {!isNewTicketCreated && (
        <>
          <div style={{ marginTop: 25, marginBottom: 25 }}>
            <button
              style={{ float: "left", margin: 10 }}
              onClick={() => setIsNewTicketCreated(true)}
            >
              Create ticket
            </button>
          </div>
          <div>
            <h1 style={{ color: "magenta" }}> {ticketsData.length} tickets </h1>
            <div className="app-header">
              <span className="app-header-label">Ticket types</span>
              <button onClick={() => filterTicketsByType("Epic")}>Epic</button>
              <button onClick={() => filterTicketsByType("Story")}>
                Story
              </button>
              <button onClick={() => filterTicketsByType("All")}>All</button>
            </div>

            {ticketsData.map((ticket) => (
              <div
                key={ticket.id?.toString()}
                onClick={() => ticket.id && setExpandedTicketId(ticket.id)}
              >
                <Ticket
                  ticket={ticket}
                  isExpanded={expandedTicketId === ticket.id}
                  onChangeStatus={onChangeStatus}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
