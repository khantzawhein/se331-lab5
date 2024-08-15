import {defineStore} from "pinia";
import type {Event, EventState} from "@/type";

export const useEventStore = defineStore('event', {
    state: (): EventState => ({
        event: null
    }),
    actions: {
        setEvent(event: Event): void {
            this.event = event
        }
    }
})