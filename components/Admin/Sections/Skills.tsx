'use client';
import { Button } from '@/components/ui/button';
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
    <section>
        <h1 className="text-xl font-bold mb-4">Skills</h1>

        <div className="flex gap-2">
            <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 flex-1"
            placeholder="Add skill"
            />
            <Button 
                onClick={addSkill} 
                className="button active"
            >
                Add
            </Button>
        </div>

        <ul className="mt-4">
            {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
            ))}
        </ul>

        <Button 
            onClick={saveSkills} 
            className="button active"
        >
            Save
        </Button>
    </section>
  );
}

export default Skills