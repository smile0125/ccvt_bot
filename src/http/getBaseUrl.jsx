export const getBaseUrl = () => {
    fetch('/config_url.json').then(res => {
        if (res.ok) {
            res.json().then(res => {
                return res.api_url
            })
        }
    })
}