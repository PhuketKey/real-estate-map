"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const projects = [
  {
    id: 1,
    name: "Ayana Heights",
    area: "Layan",
    priceFrom: 107500,
    location: [7.999, 98.295],
    description: "1-bedroom sea view apartment. Early stage."
  },
  {
    id: 2,
    name: "The Title Serenity",
    area: "Nai Harn",
    priceFrom: 3400000,
    location: [7.779, 98.303],
    description: "2 units purchased for rental."
  },
  {
    id: 3,
    name: "Sunshine Beach Resort",
    area: "Bang Tao",
    priceFrom: 8500000,
    location: [7.991, 98.293],
    description: "1BR and 2BR options. Near beach."
  }
];

export default function ProjectMap() {
  const [search, setSearch] = useState("");

  const filtered = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <input
          type="text"
          placeholder="Поиск по названию или району..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="mb-4 border p-2 w-full"
        />
        <div className="space-y-2">
          {filtered.map(p => (
            <div key={p.id} className="border rounded p-4">
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p>{p.area} — от {p.priceFrom.toLocaleString()} THB</p>
              <p className="text-sm text-gray-600">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <MapContainer
          center={[7.89, 98.3]}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map(p => (
            <Marker key={p.id} position={p.location}>
              <Popup>
                <strong>{p.name}</strong><br />
                {p.area} — от {p.priceFrom.toLocaleString()} THB
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}