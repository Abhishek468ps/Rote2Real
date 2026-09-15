"use client";

import { ArrowLeft, Save} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/lib/api";

type UserForm = {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  braintrainId: string;
  active: boolean;
  emailVerified: boolean;
};

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [form, setForm] = useState<UserForm>({
    fullName: "",
    email: "",
    phone: "",
    role: "STUDENT",
    braintrainId: "",
    active: true,
    emailVerified: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Authentication token not found"
          );
        }

        const response = await fetch(
          `${API_ENDPOINTS.ADMIN_USERS}/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

          if (!response.ok) {
          const message = await response.text();

          throw new Error(
            message ||
              `Failed to load user: ${response.status}`
          );
        }

        const user = await response.json();

        setForm({
          fullName: user.fullName ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          role: user.role ?? "STUDENT",
          braintrainId:
            user.braintrainId ?? "",
          active:
            user.active ?? true,
          emailVerified:
            user.emailVerified ?? false,
        });
      } catch (err) {
        console.error(
          "Load user error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load user"
        );
      } finally {
        setLoading(false);
      }
    };

 if (id) {
      loadUser();
    }
  }, [id]);

  const updateField = (
    field: keyof UserForm,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Authentication token not found"
        );
      }

      const response = await fetch(
        `${API_ENDPOINTS.ADMIN_USERS}/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const message =
          await response.text();

        throw new Error(
          message ||
            `Failed to update user: ${response.status}`
        );
      }

      alert("User updated successfully.");

      router.push(
        "/dashboard/admin/users"
      );

      router.refresh();
    } catch (err) {
      console.error(
        "Update user error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update user"
      );
    } finally {
      setSaving(false);
    }
  };

 

  if (loading) {
    return (
      <div className="p-8 text-sm text-slate-400">
        Loading user...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

     

      <div className="flex items-center gap-4">

        <Link
          href="/dashboard/admin/users"
          className="
            rounded-xl
            border
            border-white/10
            bg-white/5
            p-2.5
            text-slate-400
            hover:bg-white/10
            hover:text-white
          "
        >
          <ArrowLeft size={18} />
        </Link>

        <div>

          <p className="text-sm text-cyan-400">
            Administration
          </p>

          <h1 className="text-3xl font-bold text-white">
            Edit User
          </h1>

        </div>

      </div>



      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/10
            p-4
            text-sm
            text-red-400
          "
        >
          {error}
        </div>
      )}


      

      <form
        onSubmit={handleSubmit}
        className="
          space-y-6
          rounded-3xl
          border
          border-white/10
          bg-[#111827]
          p-6
          lg:p-8
        "
      >

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

       

          <FormField
            label="Full Name"
            value={form.fullName}
            onChange={(value) =>
              updateField(
                "fullName",
                value
              )
            }
          />

         

          <FormField
            label="Email"
            type="email"
            value={form.email}
            onChange={(value) =>
              updateField(
                "email",
                value
              )
            }
          />

          

          <FormField
            label="Phone"
            value={form.phone}
            onChange={(value) =>
              updateField(
                "phone",
                value
              )
            }
          />

        

          <FormField
            label="Brain Train ID"
            value={form.braintrainId}
            onChange={(value) =>
              updateField(
                "braintrainId",
                value
              )
            }
          />

        

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Role
            </label>

            <select
              value={form.role}
              onChange={(e) =>
                updateField(
                  "role",
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#0f172a]
                px-4
                py-3
                text-sm
                text-white
                outline-none
                focus:border-cyan-500/50
              "
            >

              {[
                "ADMIN",
                "STUDENT",
                "MENTOR",
                "TRAINER",
                "RECRUITER",
                "COMPANY",
                "INSTITUTION",
                "DOCTOR",
                "LAWYER",
                "JUDGE",
                "VIEWER",
              ].map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              ))}

            </select>

          </div>

        </div>


       

        <div className="space-y-4 border-t border-white/10 pt-6">

          <label className="flex items-center gap-3 text-sm text-slate-300">

            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) =>
                updateField(
                  "active",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />

            Active User

          </label>


          <label className="flex items-center gap-3 text-sm text-slate-300">

            <input
              type="checkbox"
              checked={
                form.emailVerified
              }
              onChange={(e) =>
                updateField(
                  "emailVerified",
                  e.target.checked
                )
              }
              className="h-4 w-4"
            />

            Email Verified

          </label>

        </div>


    <div className="flex justify-end border-t border-white/10 pt-6">

  <button
    type="submit"
    disabled={saving}
    className="
      inline-flex
      items-center
      gap-2
      rounded-2xl
      bg-gradient-to-r
      from-indigo-600
      to-cyan-600
      px-6
      py-3
      font-semibold
      text-white
      shadow-lg
      shadow-indigo-500/20
      transition
      hover:opacity-90
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >

    <Save size={18} />

    {saving
      ? "Saving..."
      : "Save Changes"}

  </button>

</div>   


      </form>

    </div>
  );
}



function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-[#0f172a]
          px-4
          py-3
          text-sm
          text-white
          outline-none
          placeholder:text-slate-600
          focus:border-cyan-500/50
        "
      />

    </div>
  );
}

