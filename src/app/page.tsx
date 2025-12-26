"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const students = useQuery(api.students.getStudents);
  const addStudent = useMutation(api.students.addStudent);
  const deleteStudent = useMutation(api.students.deleteStudent);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");

  const handleAdd = async () => {
    if (!name || !email || !course) return;
    await addStudent({ name, email, course });
    setName("");
    setEmail("");
    setCourse("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        Student Management System
      </h1>

      {/* Add Student */}
      <Card className="max-w-md mx-auto mb-8 bg-zinc-900 border border-zinc-700 shadow-lg">
        <CardContent className="space-y-4 p-6">
          <Input
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black text-cyan-400 placeholder:text-zinc-500 border-zinc-700"
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black text-emerald-400 placeholder:text-zinc-500 border-zinc-700"
          />
          <Input
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="bg-black text-yellow-400 placeholder:text-zinc-500 border-zinc-700"
          />
          <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
            Add Student
          </Button>
        </CardContent>
      </Card>

      {/* Student List */}
      <div className="max-w-md mx-auto space-y-4">
        {students?.map((student) => (
          <Card
            key={student._id}
            className="bg-zinc-800 border border-zinc-700"
          >
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="text-lg font-bold text-cyan-400">
                  {student.name}
                </p>
                <p className="text-sm text-emerald-400">
                  {student.email}
                </p>
                <p className="text-sm text-yellow-400">
                  {student.course}
                </p>
              </div>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => deleteStudent({ id: student._id })}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
