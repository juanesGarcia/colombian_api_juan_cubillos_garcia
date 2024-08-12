import React, { useEffect, useState } from "react";
import { getAirport, getDepartments, getRegion } from "../Api/Calls";
import "../Style/Airport.css";

const AirportRegion = () => {
  const [airportStats, setAirportStats] = useState([]);
  const [time, setTime] = useState([]);
  const [airportCount, setAirportCount] = useState([]);
  const [airportData, setAirportData] = useState({});

  const fetchDepartmentInfo = async (id) => {
    try {
      const response = await getDepartments(id);
      const department = response.data;
      const regionResponse = await getRegion(department.regionId);
      const regionName = regionResponse.data.name;

      return { departmentName: department.name, regionName };
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error);
      return { departmentName: "Unknown", regionName: "Unknown" };
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


      const cityCounts = {};

      for (const airport of airports) {
        const city = airport.city.name.toLowerCase();
        const departmentId = airport.city.departmentId;
        const airportType = airport.type.toLowerCase();

        if (!cityCounts[city]) {
          cityCounts[city] = {};
        }

        if (!cityCounts[city][airportType]) {
          cityCounts[city][airportType] = { count: 0, departmentId };
        }

        cityCounts[city][airportType].count += 1;
      }

      const results = [];
      for (const [city, types] of Object.entries(cityCounts)) {
        for (const [type, data] of Object.entries(types)) {
          const { departmentName, regionName } = await fetchDepartmentInfo(data.departmentId);
          results.push({
            region: regionName,
            department: departmentName,
            city,
            type,
            count: data.count,
          });
        }
      }
      const sortedCityStats = results.sort((a, b) => {
        if (a.region < b.region) return -1;
        if (a.region > b.region) return 1;
        if (a.department < b.department) return -1;
        if (a.department > b.department) return 1;
     
        return b.count - a.count; // Si todo lo anterior es igual, ordenar por conteo de aeropuertos
      });

      setAirportStats(sortedCityStats);

      const groupedData = {};

      for (const airport of airports) {
        const city = airport.city.name.toLowerCase();
        const departmentId = airport.city.departmentId;
        const airportType = airport.type.toLowerCase();

        const { departmentName, regionName } = await fetchDepartmentInfo(
          departmentId
        );

        // Si la región no existe, crearla
        if (!groupedData[regionName]) {
          groupedData[regionName] = { departamento: {} };
        }

        // Si el departamento no existe, crearlo
        if (!groupedData[regionName].departamento[departmentName]) {
          groupedData[regionName].departamento[departmentName] = { ciudad: {} };
        }

        // Si la ciudad no existe, crearla
        if (
          !groupedData[regionName].departamento[departmentName].ciudad[city]
        ) {
          groupedData[regionName].departamento[departmentName].ciudad[city] = {
            tipo: {},
          };
        }

        // Si el tipo de aeropuerto no existe, inicializarlo en 0
        if (
          !groupedData[regionName].departamento[departmentName].ciudad[city]
            .tipo[airportType]
        ) {
          groupedData[regionName].departamento[departmentName].ciudad[city].tipo[
            airportType
          ] = 0;
        }

        // Incrementar el conteo para el tipo de aeropuerto
        groupedData[regionName].departamento[departmentName].ciudad[city].tipo[
          airportType
        ] += 1;
      }

      setAirportData(groupedData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetAirports();
  }, []);

  console.log(airportData);

  return (
    <div className="cont-air-region">
        <div className="c">
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
              <th className="th">Región</th>
              <th className="th">Departamento</th>
              <th className="th">Ciudad</th>
              <th className="th">Tipo de Aeropuerto</th>
              <th className="th">Conteo de Aeropuertos</th>
            </tr>
          </thead>
          <tbody>
            {airportStats.map(({ region, department, city, type, count }) => (
              <tr key={`${region}-${department}-${city}-${type}`}>
                <td className="td">{region}</td>
                <td className="td">{department}</td>
                <td className="td">{city}</td>
                <td className="td">{type}</td>
                <td className="td">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
   
      <div className="containerTabla">
        <pre>{JSON.stringify(airportData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AirportRegion;
