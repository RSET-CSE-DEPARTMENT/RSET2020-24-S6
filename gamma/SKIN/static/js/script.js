const image_input= document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change",function(){
    const  reader = new FileReader();
    reader.addEventListener("load",() => {
        uploaded_image=reader.result;
        document.querySelector("#display_image").computedStyleMap.backgroundImage = 'url($(uploaded_image))';
    })
    reader.readAsDataURL(this.files[0]);
})