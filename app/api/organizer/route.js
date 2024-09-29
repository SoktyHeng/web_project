import Organizer from "@/models/organizer";

// POST - Create a new organizer
export async function POST(request) {
  try {
    const body = await request.json();
    const organizer = new Organizer(body);
    await organizer.save();
    return Response.json(organizer);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// GET - Fetch all organizers, sorted by name
export async function GET() {
  try {
    const organizers = await Organizer.find().sort({ name: 1 });
    return Response.json(organizers);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// PUT - Replace an organizer document by ID
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


// PATCH - Update specific fields of an organizer by ID
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const organizer = await Organizer.findByIdAndUpdate(_id, updateData, { new: true });

    if (!organizer) {
      return new Response("Organizer not found", { status: 404 });
    }

    return Response.json(organizer);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

