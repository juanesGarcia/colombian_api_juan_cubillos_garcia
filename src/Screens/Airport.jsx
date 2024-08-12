import React, { useEffect, useState } from "react";
import { getAirport, getDepartments } from "../Api/Calls";
import "../Style/Airport.css";

const Airport = () => {
  const [airportStats, setAirportStats] = useState([]);
  const [time, setTime] = useState([]);
  const [airportCount, setAirportCount] = useState([]);

  const fetchDepartmentName = async (id) => {
    try {
      const response = await getDepartments(id);
      return response.data.name;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error);
      return "Unknown";
    }
  };

  const GetAirports = async () => {
    try {
      const startTime = performance.now();
      const response = await getAirport();
      const airports = response.data;

      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`API call duration: ${duration.toFixed(2)} ms`);
      setTime(duration.toFixed(2));
      setAirportCount(airports.length);
      console.log(airports);

      const cityCounts = {};

      for (const airport of airports) {
        const city = airport.city.name.toLowerCase();
        const departmentId = airport.city.departmentId;

        if (!cityCounts[city]) {
          cityCounts[city] = { count: 0, departmentId };
        }

        cityCounts[city].count += 1;
      }

      const results = [];
      for (const [city, data] of Object.entries(cityCounts)) {
        const departmentName = await fetchDepartmentName(data.departmentId);
        results.push({ department: departmentName, city, count: data.count });
      }

      const sortedCityStats = results.sort((a, b) => b.count - a.count);

      setAirportStats(sortedCityStats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetAirports();
  }, []);

  return (
    <div>
      <div>
        <h3 className="registro">
          Cantidad de registros:{" "}
          {airportStats.reduce((acc, curr) => acc + curr.count, 0) ===
          airportCount
            ? airportCount
            : "Faltan registros"}
        </h3>
        <h3 className="registro">Tiempo de respuesta de la API: {time} ms</h3>
      </div>

      <div className="containerTabla">
        <table>
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Conteo de Aeropuertos</th>
            </tr>
          </thead>
          <tbody>
            {airportStats.map(({ department, city, count }) => (
              <tr key={`${department}-${city}`}>
                <td>{department}</td>
                <td>{city}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Airport;
