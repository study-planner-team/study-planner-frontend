// Converts a UTC date to a local date in "dd-mm-yyyy" format
export const formatDate = (date: string): string => {
    const language = localStorage.getItem("language") || "eng";
    const locale = language === "pol" ? "pl-PL" : "en-EN";
  
    const d = new Date(date);
  
    return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
};

export const formatDateForInput = (date: string): string => {
    const d = new Date(date);
  
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

// Converts a UTC time to local time in "HH:mm" format
export const formatTime = (date: string | null, time: string): string => {
    const utcDate = date ? date.split("T")[0] : "1970-01-01";

    const utcDateTime = new Date(`${utcDate.split("T")[0]}T${time}Z`);
    return utcDateTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
};
  
export const calculateTimeLeft = (endDate: string, endTime: string): string | null => {
    const now = new Date();
    const sessionEnd = new Date(`${endDate.split("T")[0]}T${endTime}Z`);
  
    const diff = sessionEnd.getTime() - now.getTime();
    if (diff <= 0) return "Session ended!";
  
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
  
    return `${hrs}h ${mins}m ${secs}s`;
};

export const formatDuration = (duration: string): string => {
    if (!duration) return "00:00:00";

    // Rozdzielenie na godziny, minuty, sekundy
    const [hours, minutes, seconds] = duration.split(":");
    const cleanSeconds = seconds.split(".")[0]; // Usunięcie mikrosekund

    // Sformatowanie w stylu HH:mm:ss
    const formattedHours = parseInt(hours, 10).toString().padStart(2, "0");
    const formattedMinutes = parseInt(minutes, 10).toString().padStart(2, "0");
    const formattedSeconds = parseInt(cleanSeconds, 10).toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
  