export const dateString = (date:string):string => {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const newDate = new Date(date)
    const day = newDate.getDate()
    return `${day} de ${months[newDate.getMonth()]} del ${newDate.getFullYear()}`
}

export const imagesToBlobs = (images: File[]): string[] => {
    const imagesToBlobs = images.map(image => URL.createObjectURL(image))
    return imagesToBlobs
}