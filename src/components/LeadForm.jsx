import { useState } from "react";
import { createLead } from "../api/leadApi";
import PropTypes from "prop-types";

export default function LeadForm({ onLeadAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation logic
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ✅ FIXED
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email address.";
    }

    const phoneRegex = /^[0-9]{8,15}$/; // ✅ Only digits, 8–15 length
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Invalid phone number (must be 8–15 digits).";
    }

    return newErrors;
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const newLead = await createLead(form);
      onLeadAdded(newLead);

      // reset form
      setForm({ name: "", email: "", phone: "", company: "", notes: "" });
      setErrors({});
    } catch (err) {
      setErrors({ api: "Failed to save lead. Please try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-6 rounded-lg space-y-4"
    >
      <h2 className="text-xl font-bold">Capture Lead</h2>
      {errors.api && <p className="text-red-500">{errors.api}</p>}

      {/* Name */}
      <div>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className={`w-full border rounded p-2 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Company */}
      <div>
        <input
          name="company"
          type="text"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300"
        />
      </div>

      {/* Notes */}
      <div>
        <input
          name="notes"
          type="text"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border rounded p-2 border-gray-300"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Lead
      </button>
    </form>
  );
}

// ✅ Prop validation
LeadForm.propTypes = {
  onLeadAdded: PropTypes.func.isRequired,
};
