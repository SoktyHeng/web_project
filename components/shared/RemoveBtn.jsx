"use client";
import { Router } from 'lucide-react';
import {HiOutlineTrash} from 'react-icons/hi';

export default function RemoveBtn({id}) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.log('API_BASE:', API_BASE);
    const router = Router();
    const removeEvent = async () => {
        const confirmed = confirm("Are you sure you want to delete this event?");

        if (confirmed) {
            const res = await fetch(`${API_BASE}/event?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh()
            }
        };
}
    return (
        <button onClick={removeEvent} className="text-red-500">
            <HiOutlineTrash size={24}/>
        </button>
    );

}