import EventItem from "./event-item";
import classes from './event-list.module.css'

const EventList = (props: {
    items: {
        id: string,
        title: string,
        location: string,
        date: string,
        image: string
    }[]
}) => {
    const {items} = props

    return (
        <ul className={classes.list}>
            {items.map(event =>
                <EventItem
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    image={event.image}
                />
            )}
        </ul>
    )
}

export default EventList
