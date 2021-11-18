export const daysSincePosted = (postedAt) => {
    let currentDate = new Date();
    if(postedAt) {
        let difference  = (currentDate.getTime() - postedAt.getTime())
        let days = Math.ceil(difference / (1000 * 3600 * 24));

        

        if(days > 30) {
            let months = Math.ceil(days/30);
            return months + " months ago"
        } else if (days > 6) {
            let week = Math.ceil(days/7);
            return week + " weeks ago"
        } else if (days == 1) {
            return "0 days ago"
        }
        else {
            return days + " days ago"
        }
    }
}
