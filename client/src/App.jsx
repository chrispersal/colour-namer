import { useEffect, useState } from "react";

export default function App() {
  const [colournames, setColourNames] = useState([]);
  const [form, setForm] = useState({
    group: "",
    name: "",
    hexcode: "",
  });

  useEffect(() => {
    getColourNames();
  }, []);

  async function getColourNames() {
    const response = await fetch(
      "https://colour-namer.onrender.com/colournames"
    );
    const data = await response.json();
    setColourNames(data);
    console.log(data);
  }

  function hanChange(event) {
    console.log("Fiddled with form inputs.");
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  async function hanSubmit(event) {
    event.preventDefault();
    console.log("Submitted.");
    console.log(form);
    await fetch("https://colour-namer.onrender.com/colournames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    setForm({
      group: "",
      name: "",
      hexcode: "",
    });
    getColourNames();
  }

  return (
    <div>
      <h1>PANTSTONE™</h1>
      <p>Woo hoo</p>
      <h2>Add your colour!</h2>
      <form onSubmit={hanSubmit}>
        <select name="group" onChange={hanChange} value={form.group}>
          <option value="Red">Red</option>
          <option value="Orange">Orange</option>
          <option value="Yellow">Yellow</option>
          <option value="Green">Green</option>
          <option value="Blue">Blue</option>
          <option value="Purple">Purple</option>
          <option value="Pink">Pink</option>
          <option value="Brown">Brown</option>
          <option value="Grey">Grey</option>
        </select>
        <input
          name="name"
          placeholder="Name your colour"
          onChange={hanChange}
          value={form.name}
        />
        <input
          type="color"
          name="hexcode"
          onChange={hanChange}
          value={form.hexcode}
        />
        <button>Submit</button>
      </form>

      <h2>List of colours:</h2>

      {colournames.map(function (pancolour) {
        return (
          <h3 key={pancolour.group} style={{ color: pancolour.hexcode }}>
            {pancolour.name}
          </h3>
        );
      })}
    </div>
  );
}
