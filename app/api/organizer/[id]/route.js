import Organizer from "@/models/organizer";

export async function GET(request, { params }) {
  try {
    const id = params.id;
    const organizer = await Organizer.findById(id);

    if (!organizer) {
      return new Response(JSON.stringify({ error: "Organizer not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(organizer), {
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

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const organizer = await Organizer.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  if (!organizer) {
    return new Response("Organizer not found", { status: 404 });
  }
  return Response.json(organizer);
}

export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    const deletedOrganizer = await Organizer.findByIdAndDelete(id);

    if (!deletedOrganizer) {
      return new Response(JSON.stringify({ error: "Organizer not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({ message: "Organizer deleted successfully" }),
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
