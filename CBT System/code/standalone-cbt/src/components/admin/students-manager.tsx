"use client";

import { useEffect, useRef, useState } from "react";

type Student = {
  id: number;
  matricNo: string;
  surname: string;
  firstName: string;
};

const emptyForm = { matricNo: "", surname: "", firstName: "" };

export function StudentsManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setLoading(true);
    const response = await fetch("/api/admin/students", { cache: "no-store" });
    const data = await response.json();
    setStudents(data.data.students || []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const url = editingId ? `/api/admin/students/${editingId}` : "/api/admin/students";
    const method = editingId ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      setMessage(data.error || "Unable to save student.");
      setSaving(false);
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    setMessage("Student saved successfully.");
    await load();
  };

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setForm({
      matricNo: student.matricNo,
      surname: student.surname,
      firstName: student.firstName,
    });
  };

  const remove = async (id: number) => {
    await fetch(`/api/admin/students/${id}`, { method: "DELETE" });
    await load();
  };

  const importStudents = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/students/import", { method: "POST", body: formData });
    const data = await response.json();
    setMessage(
      response.ok && data.success
        ? `Imported ${data.data.imported} student records.`
        : data.error || "Import failed.",
    );
    await load();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Student Management</p>
            <h2 className="mt-2 text-2xl font-semibold">Create and manage exam candidates.</h2>
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void importStudents(file);
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              className="rounded-full border border-[var(--line)] px-5 py-2 text-sm font-medium"
            >
              Import Excel
            </button>
          </div>
        </div>

        <form className="mt-6 grid gap-4 md:grid-cols-3" onSubmit={submit}>
          <input
            value={form.matricNo}
            onChange={(event) => setForm((current) => ({ ...current, matricNo: event.target.value }))}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
            placeholder="Matric number"
            required
          />
          <input
            value={form.surname}
            onChange={(event) => setForm((current) => ({ ...current, surname: event.target.value }))}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
            placeholder="Surname"
            required
          />
          <input
            value={form.firstName}
            onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
            placeholder="First name"
            required
          />
          <div className="md:col-span-3 flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-[var(--accent-foreground)]"
            >
              {saving ? "Saving..." : editingId ? "Update Student" : "Add Student"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-full border border-[var(--line)] px-5 py-2 text-sm font-medium"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>

        {message ? <p className="mt-4 text-sm text-[var(--muted)]">{message}</p> : null}
      </section>

      <section className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Student List</h3>
          <span className="text-sm text-[var(--muted)]">{students.length} students</span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--line)] text-left text-[var(--muted)]">
                <th className="pb-3 pr-4">Matric No</th>
                <th className="pb-3 pr-4">Surname</th>
                <th className="pb-3 pr-4">First Name</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="py-4" colSpan={4}>
                    Loading students...
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td className="py-4" colSpan={4}>
                    No students yet.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b border-[var(--line)]/60">
                    <td className="py-4 pr-4">{student.matricNo}</td>
                    <td className="py-4 pr-4">{student.surname}</td>
                    <td className="py-4 pr-4">{student.firstName}</td>
                    <td className="py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => startEdit(student)}
                          className="rounded-full border border-[var(--line)] px-3 py-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => void remove(student.id)}
                          className="rounded-full border border-[var(--line)] px-3 py-1 text-[var(--danger)]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
