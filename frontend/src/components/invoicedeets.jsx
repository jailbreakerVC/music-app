import React from "react";

const InvoiceDetails = ({ invoice }) => {
  const {
    invoice_number,
    invoice_date,
    customer_name,
    total_amount,
    currency,
    items,
    terms_and_conditions,
  } = invoice;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Invoice #{invoice_number}</h2>
          <p className="text-gray-600">Invoice Date: {invoice_date}</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{customer_name}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="py-2 text-left">Item Name</th>
            <th className="py-2 text-left">Quantity</th>
            <th className="py-2 text-left">Unit Price</th>
            <th className="py-2 text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="py-2">{item.item_name}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">{item.unit_price}</td>
              <td className="py-2">{item.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <p className="text-xl font-semibold">
          Total Amount: {total_amount} {currency}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Terms and Conditions</h3>
        <ul className="list-disc pl-6">
          {terms_and_conditions.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InvoiceDetails;




