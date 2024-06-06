import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Default styling
import './MyCalendar.css'; // Your custom styles
import api from '../../api/api'; // Assumed import path
import { RoleContext } from '../Auth/RoleContext';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const { role } = useContext(RoleContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch events from your API
        async function fetchEvents() {
            try {
                const response = await api.getCalendar(); // Adjust this based on actual API
                const formattedEvents = response.map(event => ({
                    ...event,
                    startTime: new Date(event.startTime),
                    endTime: new Date(event.endTime)
                }));
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        }
        fetchEvents();
    }, []);

    const handleDayClick = (value, event) => {
    const endOfDay = new Date(value);
    endOfDay.setHours(23, 59, 59, 999); 

    const currentTime = new Date();
    const eventsOfDay = events.filter(e => 
        e.startTime <= endOfDay && e.endTime >= value
    );

    if(eventsOfDay.length===0){
        return;
    }

    if(role ==="teacher"){
        navigate('/tcourse/list');
        return;
    }

    if(eventsOfDay.length > 1){
        navigate('/events', { state: { date: value, events: eventsOfDay } });
        return;
    }

    const foundEvent = eventsOfDay[0];

    if (foundEvent) {
            if(role==='student'){
                if(foundEvent.homework){
                    if(foundEvent.startTime <= currentTime && foundEvent.endTime >= currentTime){
                        navigate('/problem', { state: { homeworkTitle: foundEvent.title } });
                    }else{
                        navigate('/homework');
                    }
                }else{
                    if(foundEvent.startTime <= currentTime && foundEvent.endTime >= currentTime){
                        navigate('/contestList/Go', { state: { contestTitle: foundEvent.title } });
                    }else{
                        navigate('/contest');
                    }
                }
            }

        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            const eventForDate = events.find(e => 
                e.startTime.toISOString().split('T')[0] <= dateString &&
                e.endTime.toISOString().split('T')[0] >= dateString
            );
            if (eventForDate) {
                return eventForDate.homework ? 'event-homework' : 'event-contest';
            }
        }
    };

    return (
        <div className="calender-container">
            <Calendar
                onChange={setDate}
                value={date}
                onClickDay={handleDayClick}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default MyCalendar;
