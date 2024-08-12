import React, { useEffect, useState } from "react";
import { getDepartments, getTourist } from "../Api/Calls";
import "../Style/TouristAttrac.css";

const TouristicAttraction = () => {
  const [touristStats, setTouristStats] = useState([]);
  const [time, setTime] = useState([]);
  const [tourist, setTourist] = useState([]);

  const fetchDepartmentName = async (id) => {
    try {
      const response = await getDepartments(id);
      return response.data.name;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error);
      return "Unknown";
    }
  };

  const GetTouristAttrac = async () => {
    try {
      const startTime = performance.now();
      const response = await getTourist();
      const tourists = response.data;

      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`API call duration: ${duration.toFixed(2)} ms`);
      setTime(duration.toFixed(2));
      setTourist(tourists.length);

      const cityCounts = {};

      for (const tourist of tourists) {
        const city = tourist.city.name.toLowerCase();
        const departmentId = tourist.city.departmentId;

        if (!cityCounts[city]) {
          cityCounts[city] = { count: 0, departmentId };
        }

        cityCounts[city].count += 1;
      }

      const results = [];
      for (const [city, data] of Object.entries(cityCounts)) {
        const departmentName = await fetchDepartmentName(data.departmentId);
        console.log(departmentName);
        results.push({ department: departmentName, city, count: data.count });
      }
      const sortedCityStats = results.sort((a, b) => b.count - a.count);

      setTouristStats(sortedCityStats);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetTouristAttrac();
  }, []);

  return (
    <div>
      <div>
        <h3 className="registro">
          Cantidad de registros:{" "}
          {touristStats.reduce((acc, curr) => acc + curr.count, 0) == tourist
            ? tourist
            : "faltan registros"}
        </h3>
        <h3 className="registro">Tiempo de respuesta de la API: {time} ms</h3>
      </div>

      <div className="containerTabla">
        <table>
          <thead>
            <tr>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Conteo de Atracciones</th>
            </tr>
          </thead>
          <tbody>
            {touristStats.map(({ department, city, count }) => (
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

export default TouristicAttraction;
