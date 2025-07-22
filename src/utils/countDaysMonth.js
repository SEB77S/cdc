export function getDiasDelMes(mes, anio) {
  return new Date(anio, mes + 1, 0).getDate();
}