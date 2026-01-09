"use client";

import { useState } from "react";
import { calculateBill } from "@/lib/calculateBill";

export default function BillPage() {
  const [value, setValue] = useState(30026170);
  const rows = calculateBill(value);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">NABARD Bill Calculator</h1>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="border border-gray-600 bg-black p-3 rounded w-full mb-6"
      />

      <table className="w-full border border-gray-700 text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-t border-gray-700 ${
                row.label === "Total" ? "bg-gray-900" : ""
              } ${
                row.label === "NET" ? "text-green-500 font-bold" : ""
              } ${
                row.label === "Gross" ? "font-bold" : ""
              }`}
            >
              <td className="p-2">{row.label}</td>
              <td className="p-2 text-right">
                {Math.round(row.amount).toLocaleString("en-IN")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
