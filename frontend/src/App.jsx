import { Home } from "./components/home";
import { Results } from "./components/results";
import Loader from "./components/loader";
import Search from "./components/search2";
import { useEffect, useState } from "react";
import "./App.css";
import { stringify } from "postcss";
import FileUpload from "./components/upload";
import InvoiceDetails from "./components/invoicedeets";

function App() {
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [results, setResults] = useState();
  const [Loading, setLoading] = useState(false);

  const invoiceData = [
    {
      invoice_number: "INV-123456",
      invoice_date: "2023-06-30",
      customer_name: "John Doe",
      total_amount: 150.25,
      currency: "INR",
      items: [
        {
          item_name: "Industrial Laser",
          quantity: 2,
          unit_price: 50.5,
          subtotal: 101.0,
        },
        {
          item_name: "3D Printer",
          quantity: 1,
          unit_price: 48.75,
          subtotal: 48.75,
        },
      ],
      terms_and_conditions: [
        "You must include GST Invoice",
        "Provide custom support and replacement if any damage to product in normal use for 3 months",
      ],
    },
  ];

  return (
    <>
      <Search
        showSearch={setSearch}
        search={search}
        setResults={setResults}
        results={results}
        setLoading={setLoading}
      />
      <Loader Loading={Loading} />
      <Home home={home} showHome={setHome} showSearch={setSearch} />

      <div className="grid grid-cols-3 gap-5">
        <Results data={results} />
      </div>
    </>
  );
}

export default App;
// commenct 