
import Event from "../../../models/event";

export async function POST(request) {
    const body = await request.json()
    const event = new Event(body)
    await event.save()
    return Response.json(event)
  }

export async function GET() {
    const events = await Event.find().sort({ name: 1 })
    return Response.json(events)
  }

  export async function PUT(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const event = await Event.findByIdAndUpdate(_id, updateData, { new: true });
    if (!event) {
      return new Response("Event not found", { status: 404 });
    }
    return Response.json(event);
  }

  export async function PATCH(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const event = await Event.findByIdAndUpdate(_id, updateData, { new: true });
    if (!event) {
      return new Response("Event not found", { status: 404 });
    }
    return Response.json(event);
  }