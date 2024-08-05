import { useState, useEffect } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { guardarInformacion, getHorarios } from "../../redux/actions"
import { useNavigate } from 'react-router-dom';

import Calendar from 'react-calendar';
import dayjs from "dayjs"; 
import style from './calendar.module.css'

function Calendario({ guardarInformacion }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const allReservas = useSelector((state) => state.Reservas);
    const informacion = useSelector(state => state.informacion);
    const Horarios = useSelector((state) => state.horarios);

    useEffect(() => {
        dispatch(getHorarios())
    }, [dispatch]);
    
    const [horas, setHoras] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [noHorarios, setNoHorarios] = useState(false);

    const [clientData, setClientData] = useState({
        nombre: informacion.nombre,
        apellido: informacion.apellido,
        telefono: informacion.telefono,
        turnos: {
            hora: "",
            fecha: "",
            servicios: [informacion.turnos.servicios]
        }
    });

    useEffect(() => {
        if (clientData.nombre === undefined || clientData.apellido === undefined || clientData.telefono === undefined) {
            navigate('/');
        }
    }, [clientData, navigate]);

    const [dateValue, setDateValue] = useState(new Date());
    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY");
    };

    const data = [dateValue];

    const isSunday = (date) => {
        return date.getDay() === 0;
    };
    
    const handleDateChange = (date) => {
        const selectedDate = new Date(date);
        const dayOfWeek = selectedDate.getDay();

        switch (dayOfWeek) {
            case 0:
                setSelectedDay("Domingo");
                break;
            case 1:
                setSelectedDay("Lunes");
                break;
            case 2:
                setSelectedDay("Martes");
                break;
            case 3:
                setSelectedDay("Miércoles");
                break;
            case 4:
                setSelectedDay("Jueves");
                break;
            case 5:
                setSelectedDay("Viernes");
                break;
            case 6:
                setSelectedDay("Sábado");
                break;
            default:
                break;
        }
        handleFilterHours();
        setDateValue(date);
    };

    const loadHorarios = () => {
        let dayHorarios = [];
        if (selectedDay === 'Lunes') dayHorarios = Horarios[0]?.Lunes || [];
        if (selectedDay === 'Martes') dayHorarios = Horarios[0]?.Martes || [];
        if (selectedDay === 'Miércoles') dayHorarios = Horarios[0]?.Miércoles || [];
        if (selectedDay === 'Jueves') dayHorarios = Horarios[0]?.Jueves || [];
        if (selectedDay === 'Viernes') dayHorarios = Horarios[0]?.Viernes || [];
        if (selectedDay === 'Sábado') dayHorarios = Horarios[0]?.Sábado || [];
        if (selectedDay === 'Domingo') dayHorarios = Horarios[0]?.Domingo || [];

        const uniqueHoras = new Set(dayHorarios);
        const horasArray = Array.from(uniqueHoras);
        setHoras(horasArray);

        // Set noHorarios state
        setNoHorarios(horasArray.length === 0);
    };

    const handleFilterHours = () => {
        loadHorarios();
    
        const reservationsByHour = {};
    
        if (allReservas.length) {
            for (var i = 0; i < allReservas.length; i++) {
                var date = allReservas[i].turnos[0].fecha;
                var hour = allReservas[i].turnos[0].hora;
    
                if (date === formatDate(dateValue)) {
                    if (reservationsByHour[hour]) {
                        reservationsByHour[hour]++;
                    } else {
                        reservationsByHour[hour] = 1;
                    }
                }
            }
    
            for (const [hour, reservations] of Object.entries(reservationsByHour)) {
                if (reservations >= 2) {
                    setHoras(prevHoras => prevHoras.filter(hora => hora !== hour));
                }
            }
        }
    };

    useEffect(() => {
        handleFilterHours();
    }, [dateValue]);

    const exportData = (event) => {
        const fecha = formatDate(dateValue);
        const value = event.target.value;

        const formComplete = Object.values(clientData).every(value => value !== '');
        setIsFormComplete(formComplete); 

        setClientData(prevClientData => {
            return {
                ...prevClientData,
                turnos: {
                    ...prevClientData.turnos,
                    fecha: fecha,
                    hora: value
                }
            };
        });
    };

    const handleSubmit = () => {
        guardarInformacion(clientData);
        navigate('/confirmation');
    };

    const services = () => {
        guardarInformacion(clientData);
        navigate('/services');
    };

    return (
        <div className={style.app}>
            <h1 className={style.textCenter}>Seleccione el día y la hora para su turno:</h1>
            <div className={style.calendarContainer}>
                <Calendar
                    minDate={new Date()}
                    selectRange={false}
                    tileDisabled={({ date }) => isSunday(date)}
                    onChange={handleDateChange}
                    value={dateValue}
                />
            </div>
            <p>Fecha seleccionada: {formatDate(dateValue)}</p>
            <div className={style.buttonRow}>
                <h3>Horarios disponibles:</h3>
                {noHorarios ? (
                    <p>No hay horarios disponibles para el día seleccionado.</p>
                ) : (
                    <div className={style.buttonContainer}>
                        {horas.map((item, index) => (
                            <button
                                className={style.button2}
                                name="hora"
                                value={item}
                                onClick={exportData}
                                key={index}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}
                <p>Hora seleccionada: {clientData.turnos.hora}</p>
            </div>
            <button className={style.button} onClick={handleSubmit} type="submit" disabled={!isFormComplete}>Siguiente</button>
            <button className={style.button} onClick={services} type="submit">Atrás</button>
        </div>
    );
}

export default connect(null, { guardarInformacion })(Calendario);
