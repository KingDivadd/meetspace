

declare interface MeetingCardProps {
    icon: string;
    title?: string;
    date?: string;
    end_date?:string;
    is_previous_meeting?: boolean;
    button_icon_1?: string;
    button_text_1?: string;
    button_icon_2?: string;
    button_text_2?: string;
    link?: string;
    type: string;
    handle_click: ()=> void;
}