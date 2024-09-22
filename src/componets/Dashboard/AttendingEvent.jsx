import React, { useState, useEffect } from "react";
import EventAttending from "../Event/EventAttending";
import axios from "axios";
import { APP_URL } from "../util";

function AttendingEvent() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${APP_URL}/ticket/get-user-tickets`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json",
          },
        });

        const fetchedTickets = response.data;
        setTickets(fetchedTickets);

      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchTickets();
  }, []);

  // Check if there are no tickets
  if (tickets.length === 0) {
    return <div className="text-center text-gray-500">You do not have any tickets.</div>;
  }

  return (
    <div className="flex justify-center pr-52">
      <div className="overflow-y-scroll custom-scrollbar gap-3">
        {tickets.slice().reverse().map((ticket) => (
          <EventAttending
            key={ticket.ticketId} // Ensure this is unique
            ticket={ticket}
          />
        ))}
      </div>
    </div>
  );
}

export default AttendingEvent;
