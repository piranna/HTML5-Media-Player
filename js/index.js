window.addEventListener('load', function()
{
  $('#file').change(function(event)
  {
    var video = document.getElementById("video")

//    var reader = new FileReader();
//    reader.onload = function(e)
//    {
//      video.src=reader.result;
//    }
//    reader.readAsDataURL(this.files[0]);

    var video_url = window.URL.createObjectURL(this.files[0])

    var source = document.createElement('SOURCE')
        source.src = video_url

//    window.URL.revokeObjectURL(video_url);

    video.appendChild(source)
    video.play()
  })
})