import {useRouter} from "next/router";
import {getFilteredEvents} from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import {Fragment} from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import {GetServerSidePropsContext} from "next";

const FilteredEventsPage = (props: {hasError: boolean, events: any, date: {year: number, month: number}}) => {
    const router = useRouter()
    // const filteredData = router.query.slug
    //
    // if (!filteredData) {
    //     return <p className='center'>Loading...</p>
    // }
    //
    // const filteredYear = filteredData[0]
    // const filteredMonth = filteredData[1]
    //
    // const numYear = +filteredYear
    // const numMonth = +filteredMonth

    if (props.hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = props.events

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(props.date.year, props.date.month - 1)

    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}

export async function getServerSideProps(contex: GetServerSidePropsContext) {
    const {params} = contex
    const filteredData = params?.slug

    // @ts-ignore
    const filteredYear = filteredData[0]
    // @ts-ignore
    const filteredMonth = filteredData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return {
            props: {hasError: true}
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    })

    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth
            }
        }
    }
}

export default FilteredEventsPage
