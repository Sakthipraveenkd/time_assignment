const fetch = require("cross-fetch");
const express=require("express")

const app=express();
app.get("/getTimeStories",function(req,res){ 
  var myArray=[];  
    (async ()=> {
      try {
        const res = await fetch('https://api.spokenlayer.net/web-player/playlist?channel=time-com&_v=alpha&n=9');
    
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
    
        var data = await res.json();
        for(i=0;i<data.result.slots.length;i++){
            if(i<6){
                myArray.push({
                    title:data.result.slots[i].story.content.title,
                    url:data.result.slots[i].story.content.url
                })
            }
          }
      } catch (err) {
        console.error(err);
      }
      console.log(myArray);
      res.send(myArray);
    })();
});

app.listen(3000,function(){
    console.log("port has been created")
})
