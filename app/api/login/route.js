import { NextResponse } from 'next/server';
import Attendee from '@/models/attendee'; // Ensure the correct path to your models
import Organizer from '@/models/organizer';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid'; // For generating session IDs

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Removed role from here

    if (!email || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    let user;

    // Check for attendee first, then organizer
    user = await Attendee.findOne({ email });
    if (!user) {
      user = await Organizer.findOne({ email });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    const sessionId = uuidv4();
    const response = NextResponse.json({ 
      message: 'Login successful.', 
      role: user instanceof Attendee ? 'attendee' : 'organizer' // Determine role here
    });
    response.cookies.set('sessionId', sessionId, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
