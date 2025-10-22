import {
    CreateEventRequest,
    EventDetails,
    EventSummary,
    isErrorResponse,
    PublishedEventDetails,
    PublishedEventSummary,
    SpringBootPagination,
    TicketDetails,
    TicketSummary,
    TicketValidationRequest,
    TicketValidationResponse,
    UpdateEventRequest,
} from "../domain/domain";

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8080';

export const getPublishedEvents = async (
    page: number = 0,
    size: number = 10,
    search?: string
): Promise<SpringBootPagination<PublishedEventSummary>> => {
    let url = `${API_BASE_URL}/api/v1/published-events?page=${page}&size=${size}`;
    if (search) {
        url += `&q=${encodeURIComponent(search)}`;
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    return await response.json();
};

export const createEvent = async (
    accessToken: string,
    request: CreateEventRequest,
): Promise<void> => {
    const response = await fetch("/api/v1/events", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }
};

export const updateEvent = async (
    accessToken: string,
    id: string,
    request: UpdateEventRequest,
): Promise<void> => {
    const response = await fetch(`/api/v1/events/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }
};

export const listEvents = async (
    accessToken: string,
    page: number,
): Promise<SpringBootPagination<EventSummary>> => {
    const response = await fetch(`/api/v1/events?page=${page}&size=2`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as SpringBootPagination<EventSummary>;
};

export const getEvent = async (
    accessToken: string,
    id: string,
): Promise<EventDetails> => {
    const response = await fetch(`/api/v1/events/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as EventDetails;
};

export const deleteEvent = async (
    accessToken: string,
    id: string,
): Promise<void> => {
    const response = await fetch(`/api/v1/events/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const responseBody = await response.json();
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }
};

export const listPublishedEvents = async (
    page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
    const response = await fetch(`/api/v1/published-events?page=${page}&size=4`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as SpringBootPagination<PublishedEventSummary>;
};

export const searchPublishedEvents = async (
    query: string,
    page: number,
): Promise<SpringBootPagination<PublishedEventSummary>> => {
    const response = await fetch(
        `/api/v1/published-events?q=${query}&page=${page}&size=4`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as SpringBootPagination<PublishedEventSummary>;
};

export const getPublishedEvent = async (
    id: string,
): Promise<PublishedEventDetails> => {
    const response = await fetch(`/api/v1/published-events/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as PublishedEventDetails;
};

export const purchaseTicket = async (
    accessToken: string,
    eventId: string,
    ticketTypeId: string,
): Promise<void> => {
    const response = await fetch(
        `/api/v1/events/${eventId}/ticket-types/${ticketTypeId}/tickets`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        },
    );

    if (!response.ok) {
        const responseBody = await response.json();
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }
};

export const listTickets = async (
    accessToken: string,
    page: number,
): Promise<SpringBootPagination<TicketSummary>> => {
    const response = await fetch(`/api/v1/tickets?page=${page}&size=8`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as SpringBootPagination<TicketSummary>;
};

export const getTicket = async (
    accessToken: string,
    id: string,
): Promise<TicketDetails> => {
    const response = await fetch(`/api/v1/tickets/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as TicketDetails;
};

export const getTicketQr = async (
    accessToken: string,
    id: string,
): Promise<Blob> => {
    const response = await fetch(`/api/v1/tickets/${id}/qr-codes`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (response.ok) {
        return await response.blob();
    } else {
        throw new Error("Unable to get ticket QR code");
    }
};

export const validateTicket = async (
    accessToken: string,
    request: TicketValidationRequest,
): Promise<TicketValidationResponse> => {
    const response = await fetch(`/api/v1/ticket-validations`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        if (isErrorResponse(responseBody)) {
            throw new Error(responseBody.error);
        } else {
            console.error(JSON.stringify(responseBody));
            throw new Error("An unknown error occurred");
        }
    }

    return responseBody as Promise<TicketValidationResponse>;
};