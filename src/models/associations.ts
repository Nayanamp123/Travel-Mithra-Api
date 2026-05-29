import { Booking } from "./booking.model";
import { Customer } from "./customer.model";

Customer.hasMany(Booking, {
  foreignKey: "customer_id",
  as: "bookings",
});

Booking.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});