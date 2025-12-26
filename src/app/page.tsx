"use client";

export const dynamic = "force-dynamic";

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

  const handleAddStudent = async () => {
    if (!name || !email || !course) {
      alert("Please fill all fields");
      return;
    }

    await addStudent({
      name,
      email,
      course,
    });

    // Clear inputs after add
    setName("");
    setEmail("");
    setCourse("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-500">
        Student Management System
      </h1>

      {/* Add Student Card */}
      <Card className="max-w-md mx-auto bg-zinc-900 border border-zinc-700">
        <CardContent className="p-6 space-y-4">
          <Input
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-black text-cyan-400"
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black text-green-400"
          />
          <Input
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="bg-black text-yellow-400"
          />

          {/* IMPORTANT FIX: type='button' */}
          <Button
            type="button"
            onClick={handleAddStudent}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
          >
            Add Student
          </Button>
        </CardContent>
      </Card>

      {/* Student List */}
      <div className="max-w-md mx-auto mt-8 space-y-4">
        {students?.map((student) => (
          <Card key={student._id} className="bg-zinc-800 border border-zinc-700">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className="text-cyan-400 font-bold">{student.name}</p>
                <p className="text-green-400 text-sm">{student.email}</p>
                <p className="text-yellow-400 text-sm">{student.course}</p>
              </div>
              <Button
                type="button"
                variant="destructive"
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
