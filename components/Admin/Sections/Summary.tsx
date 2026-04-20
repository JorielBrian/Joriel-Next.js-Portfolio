'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

const Summary = () => {
    const [summary, setSummary] = useState('');
  
    const handleSave = async () => {
        await fetch('/api/summary', {
        method: 'POST',
        body: JSON.stringify({ summary })
        });
        alert('Saved!');
    };

    return (
        <section>
            <h1 className="text-xl font-bold mb-4">Professional Summary</h1>
            <textarea
                className="w-full p-3 bg-blue-900 border rounded"
                rows={6}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <Button 
                onClick={handleSave} 
                className="button active"
            >
                Save
            </Button>
        </section>
    )
}

export default Summary