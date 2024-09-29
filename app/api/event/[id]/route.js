import Event from "@/models/event";

// GET - Fetch a single event by ID
export async function GET(request, { params }) {
  try {
    const id = params.id;
    const event = await Event.findById(id);

    if (!event) {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// DELETE - Delete an event by ID
export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({ message: "Event deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
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
