'use client';
import { useState } from 'react';

const CV = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    await fetch('/api/cv', {
      method: 'POST',
      body: formData
    });

    alert('Uploaded!');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Upload CV</h1>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="mt-4 px-4 py-2 bg-black text-white rounded">
        Upload
      </button>
    </div>
  );
}

export default CV