import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getStudents = query({
  handler: async (ctx) => {
    return await ctx.db.query("students").collect();
  },
});

export const addStudent = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    course: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("students", args);
  },
});

export const deleteStudent = mutation({
  args: { id: v.id("students") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
