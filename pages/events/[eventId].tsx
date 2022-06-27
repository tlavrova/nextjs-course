import {getEventById, getFeaturedEvents} from "../../helpers/api-util";
import {Fragment} from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import {GetStaticPropsContext} from "next";

const EventDetailPage = (props: {selectedEvent: any}) => {
    const event = props.selectedEvent

    if (!event) {
        return (
            <div className='center'>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const eventId = context.params?.eventId as string
    const event = await getEventById(eventId)

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents()
    const paths = events.map(event => ({params: {eventId: event.id}}))

    return {
        paths: paths,
        fallback: true
    }
}

export default EventDetailPage
