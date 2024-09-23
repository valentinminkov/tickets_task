import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
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
    console.log(ticket);
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

  return (
    <div className="App">
      <div>
        Ticket types
        <button onClick={() => filterTicketsByType("Epic")}>Epic</button>
        <button onClick={() => filterTicketsByType("Story")}>Story</button>
        <button onClick={() => filterTicketsByType("All")}>All</button>
      </div>
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
            {ticketsData.map((ticket) => (
              <div
                key={ticket.id?.toString()}
                onClick={() => ticket.id && setExpandedTicketId(ticket.id)}
              >
                <Ticket
                  ticket={ticket}
                  isExpanded={expandedTicketId === ticket.id}
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
