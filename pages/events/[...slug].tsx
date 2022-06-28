import {useRouter} from "next/router";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import {Fragment, useEffect, useState} from "react";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from 'swr'
import {Event} from "../../interfaces/event";
import Head from "next/head";

const FilteredEventsPage = () => {
    const [loadedEvents, setLoadedEvents] = useState<Event[]>()
    const router = useRouter()
    const filteredData = router.query.slug!
    const {data, error} = useSWR(
        'https://nextjs-course-5db14-default-rtdb.firebaseio.com/events.json',
        (url) => fetch(url).then(res => res.json())
    )

    useEffect(() => {
        if (data) {
            const events = []

            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                })
            }

            setLoadedEvents(events)
        }
    }, [data])

    if (!loadedEvents) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filteredData[0]
    const filteredMonth = filteredData[1]

    const numYear = +filteredYear
    const numMonth = +filteredMonth

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030
        || numYear < 2021
        || numMonth < 1
        || numMonth > 12
        || error
    ) {
        return (
            <Fragment>
                <Head>
                    <title>Filtered Events</title>
                    <meta name="description" content={`All events for ${numMonth}/${numYear}.`}/>
                </Head>
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
    });

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

    const date = new Date(numYear, numMonth - 1)

    return (
        <Fragment>
            <ResultsTitle date={date}/>
            <EventList items={filteredEvents}/>
        </Fragment>
    )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const {params} = context
//     const filteredData = params?.slug
//
//     // @ts-ignore
//     const filteredYear = filteredData[0]
//     // @ts-ignore
//     const filteredMonth = filteredData[1]
//
//     const numYear = +filteredYear
//     const numMonth = +filteredMonth
//
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         return {
//             props: {hasError: true}
//         }
//     }
//
//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     })
//
//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventsPage
