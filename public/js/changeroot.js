function ChangeRoot(route){
    if(route === 'missions'){
        document.body.style.cursor = 'wait';
    }
    window.location.replace(`${route}`)
}