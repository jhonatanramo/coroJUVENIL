import React, { useState, useEffect } from "react";
import { Barra } from "../coponentes/BarraMenu/Barra";
import { Titulo } from "../coponentes/Cabesera/Titulo";
import Css from "./css/Buscar.module.css";
import Server from "../api"; // ✔ instancia Axios

export function Buscar() {
  const [titulo, setTitulo] = useState([]);
  const [parrafo, setParrafo] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [Oficial, setOfisial] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [indexActual, setIndexActual] = useState(0);
  parrafo;
  // Mezclar los párrafos con el coro
  const mezclar = (parrafos, coro) => {
    const resultado = [];
    parrafos.forEach((p) => {
      resultado.push(p.parrafo);
      resultado.push(coro);
    });
    setOfisial(resultado);
    setIndexActual(0);
  };

  // Obtener títulos del repertorio
  useEffect(() => {
    const GetTitulo = async () => {
      try {
        const response = await Server.get("api/repertorios/");
        setTitulo(response.data);
      } catch (error) {
        console.error("Error al cargar títulos:", error);
      }
    };
    GetTitulo();
  }, []);

  // Filtrar títulos
  const titulosFiltrados = titulo.filter((item) => {
    const busqueda = filtro.toLowerCase();
    return (
      item.nombre.toLowerCase().includes(busqueda) ||
      item.id.toString().includes(busqueda)
    );
  });

  // Obtener párrafos de una canción
  const Parrafos = async (nro, coro) => {
    try {
      const response = await Server.get(`api/parrafos/${nro}/`);
      setParrafo(response.data);
      mezclar(response.data, coro);
    } catch (error) {
      console.error("❌ Error al obtener los párrafos:", error);
    }
  };

  // Abrir modal
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    Parrafos(item.id, item.coro);
  };

  // Cerrar modal
  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
    setIndexActual(0);
  };

  // Navegar siguiente
  const siguiente = () => {
    setIndexActual((prev) =>
      prev + 1 < Oficial.length ? prev + 1 : prev
    );
  };

  // Navegar anterior
  const anterior = () => {
    setIndexActual((prev) =>
      prev - 1 >= 0 ? prev - 1 : prev
    );
  };

  return (
    <Barra>
      <Titulo icon="book" titulo="Repertorio" />

      {/* Buscador */}
      <div style={{ margin: "20px 0", display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          placeholder="Buscar por Nro o Nombre"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={Css.inputFiltro}
        />
      </div>

      {/* Lista de tarjetas */}
      <div className={Css.contenedor}>
        {titulosFiltrados.length === 0 ? (
          <div className={Css.emptyState}>No se encontraron títulos.</div>
        ) : (
          titulosFiltrados.map((item) => (
            <div
              className={Css.tarjeta}
              key={item.id}
              onClick={() => openModal(item)}
            >
              <h1>Nro: {item.id}</h1>
              <h2>{item.nombre}</h2>
              <p>{item.coro}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div className={Css.modalOverlay} onClick={closeModal}>
          <div
            className={Css.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera */}
            <div className={Css.modalHeader}>
              <h2>{selectedItem.nombre}</h2>
            </div>

            {/* Cuerpo */}
            <div className={Css.modalBody}>
              {Oficial.length > 0 ? (
                <div className={Css.letraContainer}>
                  <div className={Css.letraTexto}>{Oficial[indexActual]}</div>
                </div>
              ) : (
                <div className={Css.emptyState}>Cargando letra...</div>
              )}
            </div>

            {/* Footer */}
            <div className={Css.modalFooter}>
              <div className={Css.controlesNavegacion}>
                <div className={Css.botonesGrupo}>
                  <button
                    onClick={anterior}
                    className={`${Css.btn} ${Css.btnPrimary}`}
                    disabled={indexActual === 0}
                  >
                    ◀ Anterior
                  </button>

                  <button
                    onClick={siguiente}
                    className={`${Css.btn} ${Css.btnPrimary}`}
                    disabled={indexActual === Oficial.length - 1}
                  >
                    Siguiente ▶
                  </button>
                </div>

                {Oficial.length > 0 && (
                  <div className={Css.contadorProgreso}>
                    {indexActual + 1} / {Oficial.length}
                  </div>
                )}

                <button onClick={closeModal} className={Css.modalCloseButton}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Barra>
  );
}
