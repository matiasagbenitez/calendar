import { useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "sweetalert2/dist/sweetalert2.min.css";
import Modal from "react-modal";
import Swal from "sweetalert2";
import es from "date-fns/locale/es";
import { addHours, differenceInSeconds } from "date-fns";
import { useUiStore, useCalendarStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    width: "50%",
    height: "80%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.trim().length <= 0 ? "is-invalid" : "is-valid";
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire({
        title: "¡Verfica las fechas!",
        text: "La fecha de fin debe ser mayor a la fecha de inicio.",
        icon: "error",
        confirmButtonColor: "#3B71CA", // Cambia el color aquí
      });

      return;
    }

    if (formValues.title.trim().length <= 0) return;
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <div className="px-3 pt-3">
        <h1> Nuevo evento </h1>
        <hr />
      </div>
      <form className="container px-3" onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label>Inicio del evento</label>
              <DatePicker
                selected={formValues.start}
                onChange={(event) => onDateChanged(event, "start")}
                className="form-control"
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect={true}
                locale={"es"}
                timeCaption="Hora"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label>Fin del evento</label>
              <DatePicker
                minDate={formValues.start}
                selected={formValues.end}
                onChange={(event) => onDateChanged(event, "end")}
                className="form-control"
                dateFormat="dd/MM/yyyy HH:mm"
                showTimeSelect={true}
                locale={"es"}
                timeCaption="Hora"
              />
            </div>
          </div>
        </div>

        <div className="form-group mb-2">
          <label>Título del evento</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
        </div>

        <div className="form-group mb-2">
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
