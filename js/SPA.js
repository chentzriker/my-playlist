let templates;
let clon;
let temp;

function showContent(i) {
    templates = document.getElementById("content").children
    console.log(templates)
    for (const element of templates) {
        console.log('element: ', element);
        element.parentNode.removeChild(element)
    }
    temp = document.getElementsByTagName("template")[i];
    clon = temp.content.cloneNode(true);
    console.log(clon)
    document.getElementById("content").appendChild(clon);
    if (i === 2) {
        countBtn = document.getElementById("countBtn")
        countBtn.addEventListener("click", add)
        counter = document.getElementById("counter")
    }
}