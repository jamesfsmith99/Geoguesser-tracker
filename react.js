import React, { useState } from 'react';
import { Bar } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { BarChart, XAxis, YAxis, Tooltip, CartesianGrid, Bar as RechartsBar } from 'recharts';

const initialData = [
  { name: 'Alice', correct: 0, total: 0 },
  { name: 'Bob', correct: 0, total: 0 },
  { name: 'Charlie', correct: 0, total: 0 }
];

export default function Leaderboard() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('right');
  const [data, setData] = useState(initialData);

  const handleSubmit = () => {
    if (!name) return;
    setData(prevData => prevData.map(person => {
      if (person.name === name) {
        return {
          ...person,
          correct: person.correct + (result === 'right' ? 1 : 0),
          total: person.total + 1
        };
      }
      return person;
    }));
    setName('');
    setResult('right');
  };

  const leaderboardData = data.map(person => ({
    name: person.name,
    accuracy: person.total > 0 ? (person.correct / person.total) * 100 : 0,
    correct: person.correct
  }));

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-2">
          <Select onValueChange={setName} value={name}>
            <SelectTrigger>
              <SelectValue placeholder="Select your name" />
            </SelectTrigger>
            <SelectContent>
              {initialData.map(person => (
                <SelectItem key={person.name} value={person.name}>
                  {person.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button onClick={() => setResult('right')} variant={result === 'right' ? 'default' : 'outline'}>Right</Button>
            <Button onClick={() => setResult('wrong')} variant={result === 'wrong' ? 'default' : 'outline'}>Wrong</Button>
          </div>

          <Button onClick={handleSubmit} className="w-full">Submit</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl mb-4">Leaderboard</h2>
          <BarChart width={400} height={300} data={leaderboardData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} unit="%" />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
            <RechartsBar dataKey="accuracy" fill="#82ca9d" name="Accuracy" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
