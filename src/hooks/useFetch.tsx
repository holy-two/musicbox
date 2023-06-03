
export const useFetch = (link: string) => fetch(link)
  .then(response => {
    return response.text()
  })
  .then((res) => {
    const json = JSON.parse(res)
    return json
  })
  .catch(err => {
    console.log(err)
  })