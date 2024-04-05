export const handleName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    value = value.replace(/[^a-zA-Z]+/g, '');
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export const handleTrim = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    value = value.trimStart();

    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const handleNumberBrazilFormat = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    value = value.replace(/\D/g, '');

    // Limita o tamanho para atender aos dois formatos
    value = value.slice(0, 11);
  
    // Aplica a formatação
    if (value.length <= 10) { // Formato (00) 0000-0000
      value = value.replace(/(\d{2})(\d{0,4})(\d{0,4})/, "($1) $2-$3");
    } else { // Formato (00) 00000-0000
      value = value.replace(/(\d{2})(\d{0,5})(\d{0,4})/, "($1) $2-$3");
    }

    return value;
}
