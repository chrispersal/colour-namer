import { useEffect, useState } from "react";

export default function App() {
  const [colournames, setColourNames] = useState([]);

  useEffect(() => {
    getColourNames();
  }, []);

  async function getColourNames() {
    const response = await fetch("http://localhost:8080/colournames");
    const data = await response.json();
    setColourNames(data);
    console.log(data);
  }

  return (
    <div>
      <h1>PANTSTONE</h1>
      <p>Woo hoo</p>
      <h2>Add your colour!</h2>
      <form>
        <input
          name="group"
          placeholder="Colour Group, i.e. Blue, Green, Grey etc."
        />
        <input name="name" placeholder="Name your colour" />
        <input type="color" name="hexcode" />
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
