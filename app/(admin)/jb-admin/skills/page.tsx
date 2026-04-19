'use client';
import { useState } from 'react';

const Skills = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addSkill = () => {
    if (!input) return;
    setSkills([...skills, input]);
    setInput('');
  };

  const saveSkills = async () => {
    await fetch('/api/skills', {
      method: 'POST',
      body: JSON.stringify({ skills })
    });
    alert('Saved!');
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Skills</h1>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Add skill"
        />
        <button onClick={addSkill} className="px-4 bg-black text-white">Add</button>
      </div>

      <ul className="mt-4">
        {skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>

      <button onClick={saveSkills} className="mt-4 px-4 py-2 bg-black text-white rounded">
        Save
      </button>
    </div>
  );
}

export default Skills