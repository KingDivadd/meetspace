import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type DateTimeFormat = {
  time: string;
  meridian: 'AM' | 'PM';
  date: string;
};

export function getFormattedDateTime(): DateTimeFormat {
  const now = new Date();

  const hoursRaw = now.getHours();
  const meridian: 'AM' | 'PM' = hoursRaw >= 12 ? 'PM' : 'AM';
  const hours = hoursRaw % 12 || 12; // Convert 0 to 12 for 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const date = now.toLocaleDateString('en-US', options);

  return { time, meridian, date };
}

export const formatDateTime = (input: string): string => {
  const date = new Date(input);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long', // Full month name
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const formatted = new Intl.DateTimeFormat('en-US', options).format(date);

  // Format to: April 15, 2025 - 5:13 PM
  return formatted;
};
