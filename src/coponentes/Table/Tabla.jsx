import React, { useState, useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import Css from "./Tabla.module.css";
import { toast } from "react-toastify";

export function Tabla({ data }) {
  const [datos, setDatos] = useState([]);
  const [modal, setModal] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // ✅ Cargar datos desde el backend
  const cargarDatos = async () => {
    try {
      const res = await fetch('https://backcorojuvenil.onrender.com/'+data.ruta);
      if (!res.ok) throw new Error();
      const json = await res.json();

      let datosArray;
      if (Array.isArray(json)) {
        datosArray = json;
      } else if (json.data !== undefined) {
        datosArray = Array.isArray(json.data) ? json.data : [json.data];
      } else {
        datosArray = [json];
      }
      setDatos(datosArray);
    } catch (error) {
      console.error("Error cargando datos:", error);
      setModal({ estado: false, mensaje: "Error al cargar los datos" });
    }
  };

  // ✅ Eliminar registro
  const eliminar = async (id) => {
    const original = [...datos];
    setDatos((prev) => prev.filter((d) => d.id !== id));
  
    try {
      const res = await fetch(data.eliminar, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }) // <- enviamos JSON con el ID
      });
  
      if (!res.ok) throw new Error();
  
      setModal({ estado: true, mensaje: "Eliminado correctamente" });
      toast.success("✅ Eliminado correctamente");
    } catch {
      setModal({ estado: false, mensaje: "Error al eliminar" });
      toast.error("❌ Error al eliminar");
      setDatos(original);
    }
  };
  

  useEffect(() => {
    cargarDatos();
  }, []);

  // ✅ Código de barras
  const Barcode = ({ value }) => {
    const svg = useRef();

    useEffect(() => {
      if (svg.current && value && value !== "—") {
        try {
          JsBarcode(svg.current, String(value), {
            width: 2,
            height: 45,
            displayValue: false,
            margin: 0,
          });
        } catch (err) {
          console.error("Error generando código de barras:", err);
        }
      }
    }, [value]);

    return value && value !== "—" ? (
      <svg ref={svg} className={Css.barcode}></svg>
    ) : (
      <span className={Css.textCell}>Sin código</span>
    );
  };

  // ✅ Render de columnas
  const render = (item, campo) => {
    const [key, tipo] = campo.split("-");
    let val = item[key] ?? "—";

    if (tipo === "d" && val !== "—") {
      const date = new Date(val);
      val = date.toLocaleDateString("es-BO") + " " + date.toLocaleTimeString("es-BO");
    }

    switch (tipo) {
      case "f":
        return <img src={val} alt="imagen" className={Css.imageCell} />;
      case "c":
        return <Barcode value={val} />;
      default:
        return <span className={Css.textCell}>{val}</span>;
    }
  };

  // ✅ Ordenar datos
  const handleSort = (col) => {
    let direction = 'asc';
    if (sortConfig.key === col && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: col, direction });
  };

  const sortedDatos = React.useMemo(() => {
    if (!sortConfig.key) return datos;

    const [key, tipo] = sortConfig.key.split("-");

    return [...datos].sort((a, b) => {
      let aVal = a[key] ?? '';
      let bVal = b[key] ?? '';

      if (tipo === 'd') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [datos, sortConfig]);

  return (
    <div className={Css.container}>
      <table className={Css.table}>
        <thead className={Css.tableHeader}>
          <tr>
            {data.cabesera.map((c, i) => (
              <th
                key={i}
                onClick={() => handleSort(data.valor[i])}
                style={{ cursor: 'pointer' }}
              >
                {c}
                {sortConfig.key === data.valor[i] ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : ''}
              </th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sortedDatos.length > 0 ? (
            sortedDatos.map((item, i) => (
              <tr key={i}>
                {data.valor.map((col, j) => (
                  <td key={j}>{render(item, col)}</td>
                ))}
                <td className={Css.actionsCell}>
                  <button className={Css.editButton}>Editar</button>
                  <button
                    className={Css.deleteButton}
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={data.cabesera.length + 1} className={Css.emptyState}>
                No hay datos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
