window.addEventListener('load', function()
{
  $('#file').change(function(event)
  {
    document.getElementById("url").value = ""

    var video = document.getElementById("video")

//    var reader = new FileReader();
//        reader.onload = function(e)
//        {
//          video.src=reader.result;
//        }
//        reader.readAsDataURL(this.files[0]);

    var video_url = window.URL.createObjectURL(this.files[0])

    var source = document.createElement('SOURCE')
        source.src = video_url

//    window.URL.revokeObjectURL(video_url);

    video.appendChild(source)
    video.play()
  })

  $('#url').keypress(function(event)
  {
    if(event.keyCode == 13)
    {
      // Remove local video
      document.getElementById("file").value = ""

      var video = document.getElementById("video")
          video.src = null

      // Stream video file
      var blobs = []
      var reqIndex = 0
      var readIndex = 0

//      var blobSize = 1024*1024
      var blobSize = 1000*1000

      function playVideo()
      {
        window.URL.revokeObjectURL(video.src);

        video.src = window.URL.createObjectURL(blobs[readIndex])
        video.load()
        video.play()

        readIndex++
      }

//      video.onpause = playVideo
//      video.onended = playVideo
      $('#resume').click(playVideo)

      function sendRequest()
      {
        var range = 'bytes='+String(reqIndex*blobSize)+'-'+
                             String((reqIndex+1)*blobSize-1)

        var oReq = new XMLHttpRequest();
            oReq.open("get", $('#url').val(), true);
            oReq.responseType = "blob";
            oReq.setRequestHeader('Range', range)

        oReq.onload = function(event)
        {
          var index = oReq.getResponseHeader('Content-Range')
          var patt=/\d+/g;

          index = Math.floor(parseInt(patt.exec(index)) / blobSize)

          blobs[index] = oReq.response;

          if(video.src == "")
          {
            readIndex = reqIndex
            playVideo()
          };

          reqIndex++;
          sendRequest()
        };
        oReq.onerror = function(event)
        {
          console.error(event)
        }

        oReq.send()
      }

      sendRequest()
    }
  })
})