import { ReactElement, useState, useEffect } from "react";
import { fetchMainEvent } from "../../api/event";
import OrganizerLogo from "./MainEvent/OrganizerLogo";
import { Event } from '../../api/@types/Event';
import EventBanner from "./MainEvent/EventBanner";
import { COLORS } from "../../style/colors";

export default function MainEvent(): ReactElement {
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        const loadEvent = async () => setEvent(await fetchMainEvent());
        loadEvent();
    }, []);

    return <div className={'mainEventWrapper'}>
        <EventBanner event={event} />

        <div className={'mainEventInner'}>
            <div className={'organizerLogo'}>
                <OrganizerLogo event={event} />
            </div>
            <div className={'eventDetails'}>
                <h1 className={'mainEventHeader'}>{event ? event.name : <>&nbsp;</>}</h1>
                <div className={'eventLinks'}>
                    <div className={'eventLink'}>Eventüberblick</div>
                    <div className={'eventLink'}>Neuigkeiten zum Event</div>
                </div>
            </div>
        </div>

        <style jsx>{`
            .mainEventWrapper {
                height: 200px;
                position: relative;
            }    
            .mainEventInner {
                display: flex;
                max-width: 1024px;
                margin: 0 auto;
                height: 100%;
                align-items: center;
            }

            .organizerLogo {
                width: 25%;
                display: flex;
                justify-content: center;
            }

            .eventDetails {
                width: 75%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .mainEventHeader {
                margin: 0;
                margin-bottom: .75em;
            }


            .eventLinks {
                display: flex;
                align-items: center;
            }

            .eventLink {
                text-transform: uppercase;
                color: ${COLORS.PRIMARY};
                font-size: 20px;
            }

            .eventLink + .eventLink {
                margin-left: 20px;
                padding-left: 20px;
                border-left: 1px solid ${COLORS.PRIMARY};
            }
        `}</style>
    </div>;
}