function setupCalendar() {
    flatpickr("#calendar", {
        // dateFormat: "d/m/Y",  // Formato brasileiro
        dateFormat: "Y-m-d H:i",
        minDate: "today",     // Desativa datas passadas
        enableTime: true,     // Ativa a seleção de horário
        time_24hr: true,      // Ativa o formato de 24 horas
        locale: "pt"          // Define o idioma como português

    });
}
