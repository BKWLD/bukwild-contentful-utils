{ ref } = require '../../lib/references'

# Entry to test
entry = {"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"vrkkgjbn4fsk"}},"type":"Entry","id":"2rUOviBe62D45wFeOqRm5z","contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"blogPost"}},"revision":0,"createdAt":"2019-03-21T22:26:31.035Z","updatedAt":"2019-03-21T23:15:29.556Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"locale":"en-US"},"fields":{"title":"Testing algolia now","slug":"testing-algolia-now","categories":[{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"vrkkgjbn4fsk"}},"type":"Entry","id":"4Kg9Anam2IYesei4GsyWkK","contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"blogCategory"}},"revision":3,"createdAt":"2018-07-11T00:38:00.627Z","updatedAt":"2019-02-26T02:48:38.597Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"locale":"en-US"},"fields":{"title":"Culture Spotlight","slug":"culture-spotlight","showInNavigation":false,"seoDescription":"Check out the collection of our Culture Spotlight posts, where we highlight Amplitude practices that successfully improve company culture. Learn how we build diverse and inclusive teams, how we approach onboarding for our talented hires, and more."}}],"displayedCategory":"Perspectives","abstract":"The abstract","listingImage":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"vrkkgjbn4fsk"}},"type":"Asset","id":"3wp9I2rORmhEppaHJWMlVw","revision":1,"createdAt":"2019-03-21T21:24:21.573Z","updatedAt":"2019-03-21T21:24:39.905Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"locale":"en-US"},"fields":{"title":"Shayna Stewart ","file":{"url":"//images.ctfassets.net/vrkkgjbn4fsk/3wp9I2rORmhEppaHJWMlVw/4283f4b4a0224a152da981775e199125/Pic_of_Me__1_.jpeg","details":{"size":8541,"image":{"width":200,"height":200}},"fileName":"Pic of Me (1).jpeg","contentType":"image/jpeg"}}},"body":"# An h1\n\nA p tag 1","author":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"vrkkgjbn4fsk"}},"type":"Entry","id":"1gg8XccOEa4m4qeUWCY22A","contentType":{"sys":{"type":"Link","linkType":"ContentType","id":"blogAuthor"}},"revision":3,"createdAt":"2018-04-10T17:44:58.374Z","updatedAt":"2019-02-26T02:48:43.022Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"locale":"en-US"},"fields":{"name":"Aditya Vempaty","slug":"aditya-vempaty","title":"Former Head of Marketing","photo":{"sys":{"space":{"sys":{"type":"Link","linkType":"Space","id":"vrkkgjbn4fsk"}},"type":"Asset","id":"2dWnGLfqioAOSIoqW8uO0q","revision":1,"createdAt":"2018-04-10T17:46:01.380Z","updatedAt":"2018-04-10T17:46:30.392Z","environment":{"sys":{"id":"master","type":"Link","linkType":"Environment"}},"locale":"en-US"},"fields":{"title":"aditya-vempaty","description":"headshot of aditya vempaty","file":{"url":"//images.ctfassets.net/vrkkgjbn4fsk/2dWnGLfqioAOSIoqW8uO0q/7f9ab526ededfc488b02d9ae5ee5e4c6/aditya-vempaty.jpeg","details":{"size":14310,"image":{"width":253,"height":253}},"fileName":"aditya-vempaty.jpeg","contentType":"image/jpeg"}}},"bio":"\nAs the former head of marketing at Amplitude, I had the privilege of hiring and leading a fantastic team of marketers, designers, and content folks to build a marketing engine that resulted in increasing revenues by 400% in 15 months.","seoDescription":"Our collection of articles from author Aditya Vempaty, former Head of Marketing at Amplitude."}}}}


# See how it gets parsed
console.log ref entry