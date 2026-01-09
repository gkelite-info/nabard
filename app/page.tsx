"use client";

import { useState } from "react";
import { calculateBill } from "@/lib/calculateBill";
import { nabardRound } from "@/lib/nabardRound";

export default function BillPage() {
  const [value, setValue] = useState("");
  const numericValue = Number(value || 0);
  const { mainRows, recoveryRows } = calculateBill(numericValue);

  return (
    <div className="bg-red-00 p-8 max-w-1xl mx-auto bg-black text-white flex gap-5">
      <div className="flex flex-col w-[50%]">
        <h1 className="text-2xl font-bold mb-6">NABARD Bill Calculator</h1>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setValue(val);
            }
          }}
          className="border border-gray-600 bg-black p-3 rounded w-full mb-6"
          onWheel={(e) => e.currentTarget.blur()}
        />

        <table className="w-full border border-gray-700 text-sm mb-10">
          <tbody>
            {mainRows.map((row, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="p-2">{row.label}</td>
                <td className="p-2 text-right">
                  {nabardRound(row.amount).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col w-[50%]">
        <h2 className="text-xl font-bold mb-4 text-yellow-400">Recoveries</h2>
        <table className="w-full border border-gray-700 text-sm">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="p-2 text-left">Recovery</th>
              <th className="p-2 text-center">%</th>
              <th className="p-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {recoveryRows.map((row, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="p-2">{row.label}</td>
                <td className="p-2 text-center text-gray-400">
                  {row.percentage?.toFixed(3)}%
                </td>
                <td className="p-2 text-right">
                  {nabardRound(row.amount).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
