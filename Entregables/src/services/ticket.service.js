
const Ticket = require('../daos/Mongo/models/tickets.models');

class TicketService {
    async createTicket(code, amount, purchaser) {
        try {
            const newTicket = new Ticket({
                code,
                amount,
                purchaser
            });
            await newTicket.save();
            return newTicket;
        } catch (error) {
            throw new Error('Error al crear el ticket');
        }
    }
}

module.exports = TicketService;