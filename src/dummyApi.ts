import { TicketProp } from "./App";

export type TicketsData = {
  id: Number;
  title: String;
  desc: String;
  status: String;
  type: Number;
};

const tickets = [
  {
    id: 1,
    title: "Epic1",
    status: "Open",
    desc: "Performance improvements",
    type: 0,
  },
  { id: 2, title: "Bug1", status: "Open", desc: "Nothing works", type: 2 },
  {
    id: 3,
    title: "Story1",
    status: "Open",
    desc: "tree refactoring",
    type: 1,
  },
  {
    id: 4,
    title: "Strory2",
    status: "Open",
    desc: "list refactoring",
    type: 1,
  },
  {
    id: 5,
    title: "Bug2",
    status: "Open",
    desc: "Selection in list does not work",
    type: 2,
  },
  {
    id: 6,
    title: "Bug3",
    status: "Open",
    desc: "Tree cannot be expanded",
    type: 2,
  },
  {
    id: 7,
    title: "Epic2",
    status: "Open",
    desc: "Offline functionality",
    type: 0,
  },
  { id: 8, title: "Epic3", status: "Open", desc: "Data caching", type: 0 },
];

export const getMockTicketsData = async (): Promise<TicketsData[]> => {
  return tickets;
};

export const getMockTicketTypesData = async () => {
  return [
    { id: 0, text: "Epic" },
    { id: 1, text: "Story" },
    { id: 2, text: "Bug" },
  ];
};

export const createNewTicket = async (
  newTicketData: TicketProp
): Promise<TicketsData> => {
  const types = await getMockTicketTypesData();

  return {
    ...newTicketData,
    id: tickets.length + 2,
    type: types[types.findIndex((type) => type.text === newTicketData.type)].id,
  };
};
