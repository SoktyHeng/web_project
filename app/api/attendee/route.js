import Attendee from "../../../models/attendee";

// POST - Create a new attendee
export async function POST(request) {
    const body = await request.json();
    const attendee = new Attendee(body);
    await attendee.save();
    return Response.json(attendee);
}

// GET - Fetch all attendees, sorted by name
export async function GET() {
    const attendees = await Attendee.find().sort({ name: 1 });
    return Response.json(attendees);
}

// PUT - Replace an attendee document by ID
export async function PUT(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const attendee = await Attendee.findByIdAndUpdate(_id, updateData, { new: true });
    if (!attendee) {
        return new Response("Attendee not found", { status: 404 });
    }
    return Response.json(attendee);
}

// PATCH - Update specific fields of an attendee by ID
export async function PATCH(request) {
    const body = await request.json();
    const { _id, ...updateData } = body;
    const attendee = await Attendee.findByIdAndUpdate(_id, updateData, { new: true });
    if (!attendee) {
        return new Response("Attendee not found", { status: 404 });
    }
    return Response.json(attendee);
}
