import React, { useState, useEffect } from "react";
import Css from './../css/calendario.module.css';
import { Titulo } from '../coponentes/Cabesera/Titulo';
import ICAL from "ical.js"; 
import { Barra } from "../coponentes/BarraMenu/Barra";

export function Calendario() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [cumpleanios, setCumpleanios] = useState([]);
  const [feriados, setFeriados] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlFeriados =
    "https://calendar.google.com/calendar/embed?src=en.bo%23holiday%40group.v.calendar.google.com&ctz=America%2FLa_Paz"
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // 👉 1. Cargar cumpleaños desde Django
  useEffect(() => {
    const fetchCumpleanios = async () => {
      try {
        const res = await fetch("https://backcorojuvenil.onrender.com/api/usuarios/");
        const data = await res.json();

        const eventos = data.map(u => {
          const fn = new Date(u.fecha_nacimiento);
          return {
            fecha: new Date(currentDate.getFullYear(), fn.getMonth(), fn.getDate()),
            titulo: `🎂 Cumpleaños de ${u.nombre} ${u.apellido_p}`,
            tipo: "cumple"
          };
        });

        setCumpleanios(eventos);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar cumpleaños:", error);
        setLoading(false);
      }
    };

    fetchCumpleanios();
  }, [currentDate]);

  // 👉 2. Cargar feriados desde Google Calendar ICS
  useEffect(() => {
    const cargarFeriados = async () => {
      try {
        const res = await fetch(urlFeriados);
        const texto = await res.text();

        const jcalData = ICAL.parse(texto);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents("vevent");

        const eventos = vevents.map(ev => {
          const event = new ICAL.Event(ev);
          const start = event.startDate.toJSDate();

          return {
            fecha: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
            titulo: `📅 ${event.summary}`,
            tipo: "feriado"
          };
        });

        setFeriados(eventos);
      } catch (error) {
        console.error("Error cargando feriados:", error);
      }
    };

    cargarFeriados();
  }, []);

  // 👉 Cambiar de mes
  const mesAnterior = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const mesSiguiente = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const irAHoy = () => { setCurrentDate(new Date()); setSelectedDate(new Date()); };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  const esHoy = (dia) =>
    dia === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  // 👉 Unificar eventos
  const todosEventos = [...cumpleanios, ...feriados];

  const tieneEventos = (dia) =>
    todosEventos.some(ev =>
      ev.fecha.getDate() === dia &&
      ev.fecha.getMonth() === currentMonth &&
      ev.fecha.getFullYear() === currentYear
    );

  const obtenerEventos = (dia) =>
    todosEventos.filter(ev =>
      ev.fecha.getDate() === dia &&
      ev.fecha.getMonth() === currentMonth &&
      ev.fecha.getFullYear() === currentYear
    );

  const manejarClickFecha = (dia) => {
    if (dia !== null) setSelectedDate(new Date(currentYear, currentMonth, dia));
  };

  // 👉 Generar matriz del calendario
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const fechas = [];
  for (let i = 0; i < firstDayOfMonth; i++) fechas.push(null);
  for (let i = 1; i <= daysInMonth; i++) fechas.push(i);

  return (
    <Barra>
      <Titulo icon="calendar-number" titulo="Calendario" />

      <div className={Css.calendarioHeader}>
        <button className={Css.navButton} onClick={mesAnterior}>&lt;</button>
        <h1>{meses[currentMonth]} {currentYear}</h1>
        <button className={Css.navButton} onClick={mesSiguiente}>&gt;</button>
      </div>

      <div className={Css.controlContainer}>
        <button className={Css.hoyButton} onClick={irAHoy}>Hoy</button>
      </div>

      <hr />

      {loading ? <p>Cargando cumpleaños...</p> : (
        <div className={Css.calendario}>
          {dias.map((d, i) => <div key={i} className={Css.dia}>{d}</div>)}

          {fechas.map((f, i) => {
            const claseFecha = `
              ${Css.fecha}
              ${f === null ? Css.vacio : ""}
              ${f !== null && esHoy(f) ? Css.hoy : ""}
              ${f !== null && tieneEventos(f) ? Css.conEvento : ""}
            `;

            return (
              <div
                key={i}
                className={claseFecha.trim()}
                onClick={() => manejarClickFecha(f)}
              >
                {f}
                {f !== null && tieneEventos(f) && (
                  <div className={Css.marcadorEvento}>
                    {obtenerEventos(f).some(ev => ev.tipo === "cumple") ? "🎂" : ""}
                    {obtenerEventos(f).some(ev => ev.tipo === "feriado") ? "📅" : ""}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedDate && (
        <div className={Css.infoSeleccionada}>
          <h3>Fecha seleccionada:</h3>
          <p>{selectedDate.getDate()} de {meses[selectedDate.getMonth()]} de {selectedDate.getFullYear()}</p>
          {obtenerEventos(selectedDate.getDate()).length > 0 ? (
            <div className={Css.listaEventos}>
              <h4>Eventos:</h4>
              <ul>
                {obtenerEventos(selectedDate.getDate()).map((evento, index) => (
                  <li key={index}>{evento.titulo}</li>
                ))}
              </ul>
            </div>
          ) : <p className={Css.sinEventos}>No hay eventos en esta fecha</p>}
        </div>
      )}

      <div className={Css.leyenda}>
        <div className={Css.itemLeyenda}>
          <span className={`${Css.marcadorLeyenda} ${Css.hoy}`}></span> Hoy
        </div>
        <div className={Css.itemLeyenda}>
          <span className={`${Css.marcadorLeyenda} ${Css.conEvento}`}></span> Con evento
        </div>
      </div>
    </Barra>
  );
}
