"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  FileSpreadsheet,
  Pencil,
  Users,
  X,
  Download,
  Trash2,
} from "lucide-react";

type Student = {
  id: number;
  matricNo: string;
  surname: string;
  firstName: string;
};

const emptyForm = { matricNo: "", surname: "", firstName: "" };

/* ── Confirmation modal ─────────────────────── */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-text">{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button onClick={onConfirm} className="btn btn-danger btn-sm">
            {confirmLabel || "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function StudentsManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Confirm state */
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    studentId: number | null;
    name: string;
  }>({ open: false, studentId: null, name: "" });

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
    const url = editingId ? `/api/admin/students/${editingId}` : "/api/admin/students";
    const method = editingId ? "PATCH" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (!response.ok || !data.success) {
      toast.error(data.error || "Unable to save student.");
      setSaving(false);
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    if (!editingId) setShowForm(false);
    toast.success(editingId ? "Student updated." : "Student added.");
    await load();
  };

  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setShowForm(true);
    setForm({
      matricNo: student.matricNo,
      surname: student.surname,
      firstName: student.firstName,
    });
  };

  const remove = async (id: number) => {
    await fetch(`/api/admin/students/${id}`, { method: "DELETE" });
    toast.success("Student removed.");
    await load();
  };

  const importStudents = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/admin/students/import", { method: "POST", body: formData });
    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: false, error: "Server returned invalid response." };
    }
    if (response.ok && data.success) {
      toast.success(`Imported ${data.data?.imported || 0} student records.`);
    } else {
      toast.error(data.error || "Import failed.");
    }
    await load();
  };

  return (
    <div className="space-y-6">
      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirmDelete.open}
        title="Remove student"
        message={`Are you sure you want to remove ${confirmDelete.name}? This action cannot be undone.`}
        confirmLabel="Remove"
        onConfirm={() => {
          if (confirmDelete.studentId) void remove(confirmDelete.studentId);
          setConfirmDelete({ open: false, studentId: null, name: "" });
        }}
        onCancel={() => setConfirmDelete({ open: false, studentId: null, name: "" })}
      />

      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="section-label">Students</span>
          <h1 className="section-title">Student management</h1>
          <p className="section-subtitle">Add students manually or import from Excel.</p>
        </div>
        <div className="flex flex-wrap gap-2">
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
          <a href="/api/admin/templates/students" className="btn btn-ghost flex-1 sm:flex-none" download>
            <Download size={15} strokeWidth={1.5} />
            Get template
          </a>
          <button onClick={() => fileRef.current?.click()} className="btn btn-ghost flex-1 sm:flex-none">
            <FileSpreadsheet size={15} strokeWidth={1.5} />
            Import Excel
          </button>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
            className="btn btn-accent flex-1 sm:flex-none"
          >
            <Plus size={15} strokeWidth={2} />
            Add student
          </button>
        </div>
      </div>

      {/* Add/Edit form — collapsible */}
      {showForm ? (
        <div className="section-card fade-in">
          <div className="section-header">
            <span className="section-label">
              {editingId ? "Edit student" : "New student"}
            </span>
          </div>
          <form className="mt-5 grid gap-4 md:grid-cols-3" onSubmit={submit}>
            <div className="field-group">
              <label className="field-label">Matric number</label>
              <input
                value={form.matricNo}
                onChange={(e) => setForm((c) => ({ ...c, matricNo: e.target.value }))}
                className="input"
                placeholder="e.g. 2020/1/12345"
                required
              />
            </div>
            <div className="field-group">
              <label className="field-label">Surname</label>
              <input
                value={form.surname}
                onChange={(e) => setForm((c) => ({ ...c, surname: e.target.value }))}
                className="input"
                placeholder="Last name"
                required
              />
            </div>
            <div className="field-group">
              <label className="field-label">First name</label>
              <input
                value={form.firstName}
                onChange={(e) => setForm((c) => ({ ...c, firstName: e.target.value }))}
                className="input"
                placeholder="First name"
                required
              />
            </div>
            <div className="md:col-span-3 flex flex-wrap gap-3">
              <button type="submit" disabled={saving} className="btn btn-accent">
                {saving ? "Saving..." : editingId ? "Update student" : "Add student"}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); setForm(emptyForm); }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Student list */}
      <div className="section-card">
        <div className="section-header-row">
          <span className="section-label">Student list</span>
          <span className="text-xs tabular-nums" style={{ color: "var(--fg-faint)" }}>
            {students.length} {students.length === 1 ? "student" : "students"}
          </span>
        </div>

        {loading ? (
          <div className="mt-5 space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="skeleton" style={{ height: "48px" }} />
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="empty-state" style={{ paddingTop: "36px", paddingBottom: "36px" }}>
            <Users className="empty-state-icon" strokeWidth={1} />
            <p className="empty-state-text">
              No students registered yet. Add students manually or import from an Excel file.
            </p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table-base">
              <thead>
                <tr>
                  <th>Matric no.</th>
                  <th>Surname</th>
                  <th>First name</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="tabular-nums" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8125rem" }}>
                      {student.matricNo}
                    </td>
                    <td className="font-medium">{student.surname}</td>
                    <td>{student.firstName}</td>
                    <td style={{ textAlign: "right" }}>
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => startEdit(student)}
                          className="btn btn-ghost btn-sm"
                        >
                          <Pencil size={13} strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() =>
                            setConfirmDelete({
                              open: true,
                              studentId: student.id,
                              name: `${student.firstName} ${student.surname}`,
                            })
                          }
                          className="btn btn-danger btn-sm"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
