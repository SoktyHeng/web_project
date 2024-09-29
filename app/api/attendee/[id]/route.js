import Attendee from "@/models/attendee";

// GET - Fetch a single attendee by ID
export async function GET(request, { params }) {
  const id = params.id;
  const attendee = await Attendee.findById(id);

  if (!attendee) {
    return new Response(JSON.stringify({ error: "Attendee not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify(attendee), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// PUT - Update an attendee by ID
export async function PUT(request, { params }) {
  const id = params.id;
  const body = await request.json();

  try {
    const updatedAttendee = await Attendee.findByIdAndUpdate(id, body, { new: true });

    if (!updatedAttendee) {
      return new Response(JSON.stringify({ error: "Attendee not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(updatedAttendee), {
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

// DELETE - Delete an attendee by ID
export async function DELETE(request, { params }) {
  const id = params.id;
  const deletedAttendee = await Attendee.findByIdAndDelete(id);

  if (!deletedAttendee) {
    return new Response(JSON.stringify({ error: "Attendee not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Attendee deleted successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
