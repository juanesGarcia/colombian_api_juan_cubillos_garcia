import React, { useEffect, useState } from "react";
import { getPresident } from "../Api/Calls";
import "../Style/President.css";

const President = () => {
  const [presidents, setPresidents] = useState([]);
  const [partyStats, setPartyStats] = useState([]);
  const [time, setTime] = useState([]);

  const GetPresidents = async () => {
    try {
      const startTime = performance.now();
      const response = await getPresident();
      const presidents = response.data;

      const endTime = performance.now();
      const duration = endTime - startTime;
      console.log(`API call duration: ${duration.toFixed(2)} ms`);
      setPresidents(presidents.length);
      setTime(duration.toFixed(2));

      const partyCounts = presidents.reduce((acc, president) => {
        const party = president.politicalParty.toLowerCase();
        if (acc[party]) {
          acc[party].count += 1;
          acc[party].presidents.push(president);
        } else {
          acc[party] = {
            count: 1,
            presidents: [president],
          };
        }
        return acc;
      }, {});

      const sortedPartyStats = Object.entries(partyCounts)
        .map(([party, data]) => ({ party, ...data }))
        .sort((a, b) => b.count - a.count);

      setPartyStats(sortedPartyStats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetPresidents();
  }, []);

  return (
    <div>
        <div>
        <h3 className="registro">Cantidad de registros: {partyStats.reduce((acc, curr) => acc + curr.count, 0) == presidents ? presidents:'faltan registros'}</h3>
            <h3 className="registros">tiempo de respuesta de la Api: {time}</h3>
        </div>
      
      <div className="containerTabla">
        <table>
          <thead>
            <tr>
              <th>Partido Político</th>
              <th>Conteo de Presidentes</th>
            </tr>
          </thead>
          <tbody>
            {partyStats.map(({ party, count }) => (
              <tr key={party}>
                <td>{party}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default President;
