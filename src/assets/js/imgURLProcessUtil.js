import {baseURL,imgBaseURL} from "./axiosConfig.js"


export default function(respContent,imgs){
  let index = 0
  // imgs.length = 0
  for (let item of respContent) {
    imgs.push({
      id: index,
      value:baseURL + imgBaseURL + item.subDir + item.sourceName
    })
    index++
  }
}
