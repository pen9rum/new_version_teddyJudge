import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RoleContext } from '../Auth/RoleContext';
import "./DayEvents.css";

const DayEvents = () => {
    const location = useLocation();
    const { date, events } = location.state;
    const { role } = useContext(RoleContext);
    const navigate = useNavigate();

    const handleEventSelection = (event) => {
        const currentTime = new Date();
        const path = event.homework ? 'homework' : 'contest';

        if(role==='student'){
            if(event.homework){
                if(event.startTime <= currentTime && event.endTime >= currentTime){
                    navigate('/problem', { state: { homeworkTitle: event.title } });
                }else{
                    navigate('/homework');
                }
            }else{
                if(event.startTime <= currentTime && event.endTime >= currentTime){
                    navigate('/contestList/Go', { state: { contestTitle: event.title } });
                }else{
                    navigate('/contest');
                }
            }
        }
    };

    return (
        <div className='dayevent-container'>
            <h1>Events on {new Date(date).toLocaleDateString()}</h1>
            <div className="event-container">
                {events.map((event, index) => (
                    <div key={index} className="event-card" onClick={() => handleEventSelection(event)}>
                        <span className="event-title">{event.title}</span>
                        <span className={`event-type ${event.homework ? 'event-homework' : 'event-contest'}`}>
                            {event.homework ? 'Homework' : 'Contest'}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
    
};

export default DayEvents;
