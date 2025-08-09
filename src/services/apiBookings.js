import { getToday } from "../utils/helpers";
import { bookingsTableName } from "../utils/queryConstants";
import supabase from "./supabase";

export async function readBookings({
  filters = [],
  sortBy = null,
  pagination = null,
} = {}) {
  let query = supabase
    .from(bookingsTableName)
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  // apply filters (skip falsy entries)
  filters.filter(Boolean).forEach((filter) => {
    const method = (filter.method || "eq").toString();
    const field = filter.field;
    const value = filter.value;

    // handle a few common special cases
    if (method === "in" && Array.isArray(value)) {
      query = query.in(field, value);
    } else if (
      (method === "like" || method === "ilike") &&
      typeof value === "string"
    ) {
      // Supabase has .like and .ilike helpers; prefer ilike for case-insensitive
      if (method === "ilike" && typeof query.ilike === "function") {
        query = query.ilike(field, value);
      } else {
        query = query.like(field, value);
      }
    } else {
      // default to calling the method name (eq, gte, lte, etc.)
      if (typeof query[method] === "function") {
        query = query[method](field, value);
      } else {
        // fallback to eq if method unknown
        query = query.eq(field, value);
      }
    }
  });

  // sorting
  if (sortBy && sortBy.field) {
    const ascending =
      String(sortBy.direction || "desc").toLowerCase() === "asc";
    query = query.order(sortBy.field, { ascending });
  }

  // pagination
  if (pagination) {
    const page = Math.max(1, Number(pagination.page) || 1);
    const size = Math.max(1, Number(pagination.size) || 10);
    const from = (page - 1) * size;
    const to = from + size - 1; // <-- fixed from your earlier bug
    query = query.range(from, to);
  }

  const { data, count, error } = await query;

  if (error) {
    console.error("readBookings error:", error);
    throw new Error("Bookings could not be loaded");
  }

  return { data: data ?? [], count: Number(count ?? 0) };
}

export async function readBooking(id) {
  const { data, error } = await supabase
    .from(bookingsTableName)
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from(bookingsTableName)
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from(bookingsTableName)
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from(bookingsTableName)
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from(bookingsTableName)
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase
    .from(bookingsTableName)
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
