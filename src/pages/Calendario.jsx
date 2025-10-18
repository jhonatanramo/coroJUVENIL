import React, { useState } from "react";
import Css from './../css/calendario.module.css';

export function Calendario() {
  // State for current view (month/year)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  // Days of the week
  const dias = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  // Month names
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Sample events data (in a real app, this would come from an API or props)
  const eventos = [
    { fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 5), titulo: "Reunión equipo" },
    { fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 12), titulo: "Entrega proyecto" },
    { fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 18), titulo: "Presentación" },
    { fecha: new Date(new Date().getFullYear(), new Date().getMonth(), 25), titulo: "Revisión mensual" }
  ];

  // Navigation functions
  const mesAnterior = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const mesSiguiente = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const irAHoy = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Get current view information
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();
  
  // Check if a date is today
  const esHoy = (dia) => {
    return dia === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  // Check if a date is selected
  const esSeleccionado = (dia) => {
    return selectedDate && 
           dia === selectedDate.getDate() && 
           currentMonth === selectedDate.getMonth() && 
           currentYear === selectedDate.getFullYear();
  };

  // Check if a date has events
  const tieneEventos = (dia) => {
    return eventos.some(evento => 
      evento.fecha.getDate() === dia && 
      evento.fecha.getMonth() === currentMonth && 
      evento.fecha.getFullYear() === currentYear
    );
  };

  // Get events for a specific date
  const obtenerEventos = (dia) => {
    return eventos.filter(evento => 
      evento.fecha.getDate() === dia && 
      evento.fecha.getMonth() === currentMonth && 
      evento.fecha.getFullYear() === currentYear
    );
  };

  // Date click handler
  const manejarClickFecha = (dia) => {
    if (dia !== null) {
      setSelectedDate(new Date(currentYear, currentMonth, dia));
    }
  };

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Create calendar dates array with empty slots for days before the 1st
  const fechas = [];
  
  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    fechas.push(null);
  }
  
  // Add the actual days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    fechas.push(i);
  }

  return (
    <div className={Css.Fondo}>
      <div className={Css.overlay}>
        <div className={Css.sub}>
          {/* Header with navigation */}
          <div className={Css.calendarioHeader}>
            <button className={Css.navButton} onClick={mesAnterior}>
              &lt;
            </button>
            <h1>{meses[currentMonth]} {currentYear}</h1>
            <button className={Css.navButton} onClick={mesSiguiente}>
              &gt;
            </button>
          </div>
          
          <div className={Css.controlContainer}>
            <button className={Css.hoyButton} onClick={irAHoy}>
              Hoy
            </button>
          </div>
          
          <hr />
          
          {/* Calendar grid */}
          <div className={Css.calendario}>
            {/* Day headers */}
            {dias.map((d, i) => (
              <div key={i} className={Css.dia}>
                {d}
              </div>
            ))}
            
            {/* Dates */}
            {fechas.map((f, i) => {
              const claseFecha = `
                ${Css.fecha} 
                ${f === null ? Css.vacio : ''}
                ${f !== null && esHoy(f) ? Css.hoy : ''}
                ${f !== null && esSeleccionado(f) ? Css.seleccionado : ''}
                ${f !== null && tieneEventos(f) ? Css.conEvento : ''}
              `;
              
              return (
                <div 
                  key={i} 
                  className={claseFecha.trim()}
                  onClick={() => manejarClickFecha(f)}
                >
                  {f}
                  {f !== null && tieneEventos(f) && (
                    <div className={Css.marcadorEvento}></div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Selected date info */}
          {selectedDate && (
            <div className={Css.infoSeleccionada}>
              <h3>Fecha seleccionada:</h3>
              <p>{selectedDate.getDate()} de {meses[selectedDate.getMonth()]} de {selectedDate.getFullYear()}</p>
              
              {/* Events for selected date */}
              {obtenerEventos(selectedDate.getDate()).length > 0 ? (
                <div className={Css.listaEventos}>
                  <h4>Eventos:</h4>
                  <ul>
                    {obtenerEventos(selectedDate.getDate()).map((evento, index) => (
                      <li key={index}>{evento.titulo}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className={Css.sinEventos}>No hay eventos para esta fecha</p>
              )}
            </div>
          )}
          
          {/* Legend */}
          <div className={Css.leyenda}>
            <div className={Css.itemLeyenda}>
              <span className={`${Css.marcadorLeyenda} ${Css.hoy}`}></span>
              <span>Hoy</span>
            </div>
            <div className={Css.itemLeyenda}>
              <span className={`${Css.marcadorLeyenda} ${Css.seleccionado}`}></span>
              <span>Seleccionado</span>
            </div>
            <div className={Css.itemLeyenda}>
              <span className={`${Css.marcadorLeyenda} ${Css.conEvento}`}></span>
              <span>Con evento</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}