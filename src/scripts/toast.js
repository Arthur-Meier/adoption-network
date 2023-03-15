export function toast (message, color){
    Toastify({
    text: message,
    duration: 3000,
    className: "teste",
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
    },
    /* onClick: function(){} */ // Callback after click
}).showToast()

}

