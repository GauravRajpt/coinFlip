import { useState } from "react";
import "./App.css";

function App() {
  const [coinGroups, setCoinGroups] = useState([]); // array of arrays
  const [lastSelected, setLastSelected] = useState("");

  const handleSelect = (e) => {
    const selected = e.target.value;
    if (!selected) return;

    setLastSelected(selected);

    setCoinGroups((prev) => {
      if (prev.length === 0) {
        // first selection
        return [[selected]];
      }

      const lastGroup = prev[prev.length - 1];
      const lastCoin = lastGroup[lastGroup.length - 1];

      if (lastCoin === selected) {
        // same coin → push in same column
        const updated = [...prev];
        updated[updated.length - 1] = [...lastGroup, selected];
        return updated;
      } else {
        // different coin → start a new column
        return [...prev, [selected]];
      }
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <select value="" onChange={handleSelect}>
        <option value="">Select</option>
        <option value="head">Head</option>
        <option value="tail">Tail</option>
      </select>

      <div
        className="result"
        style={{
          display: "flex",
          gap: "40px",
          marginTop: "20px",
        }}
      >
        {coinGroups.map((group, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column" }}>
            {group.map((coin, j) => (
              <div key={j}>{coin}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
