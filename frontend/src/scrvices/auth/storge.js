
export function ID_STORAGE(data) {
    return localStorage.setItem('Id', data)
}

export function ID_GET() {
    return localStorage.getItem('Id')
}

export function ID_REMOVER() {
    return localStorage.removeItem('Id')
}

export function HIG_STORAGE(data) {
    return localStorage.setItem('hig', data)
}

export function getmeasurehigh() {
    return localStorage.getItem('hig')
}

export function LOW_STORAGE(data) {
    return localStorage.setItem('low', data)
}

export function getmeasurelow() {
    return localStorage.getItem('low')
}