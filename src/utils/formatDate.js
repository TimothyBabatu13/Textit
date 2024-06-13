import { formatDistance } from 'date-fns'

export const formatDate = (date) => {
    const result = formatDistance( date, new Date(), {
        addSuffix: true
    })

    return result
}


