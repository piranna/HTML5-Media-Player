window.addEventListener('load', function()
{
  $('#file').change(function(event)
  {
//    var reader = new FileReader();
//    reader.onload = function(e)
//    {
//      document.getElementById("video").src=reader.result;
//    }
//    reader.readAsDataURL(this.files[0]);

    $('#video').attr('src', window.URL.createObjectURL(this.files[0]))
  })
})