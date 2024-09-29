import { NextResponse } from 'next/server';
import Attendee from '@/models/attendee';
import Organizer from '@/models/organizer';
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const contentType = req.headers.get('content-type');
        let formData;

        if (contentType.includes('application/json')) {
            formData = await req.json();
        } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
            formData = await req.formData();
        } else {
            return NextResponse.json({ error: 'Unsupported content type.' }, { status: 400 });
        }

        const name = formData.name || formData.get('name');
        const email = formData.email || formData.get('email');
        const password = formData.password || formData.get('password');
        const role = formData.role || formData.get('role');

        if (!name || !email || !password || !role) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'attendee') {
            const existingAttendee = await Attendee.findOne({ email });
            if (existingAttendee) {
                return NextResponse.json({ error: 'Attendee already exists.' }, { status: 400 });
            }

            const newAttendee = new Attendee({
                name,
                email,
                password: hashedPassword,
            });
            await newAttendee.save();
            return NextResponse.json({ message: 'Attendee registered successfully.' }, { status: 201 });

        } else if (role === 'organizer') {
            const existingOrganizer = await Organizer.findOne({ email });
            if (existingOrganizer) {
                return NextResponse.json({ error: 'Organizer already exists.' }, { status: 400 });
            }

            const newOrganizer = new Organizer({
                name,
                email,
                password: hashedPassword,
            });
            await newOrganizer.save();
            return NextResponse.json({ message: 'Organizer registered successfully.' }, { status: 201 });

        } else {
            return NextResponse.json({ error: 'Invalid role.' }, { status: 400 });
        }

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Server error.' }, { status: 500 });
    }
}
