let right_btn = document.querySelectorAll(".right")
let left_btn = document.querySelectorAll(".left")
let father_scroll = document.querySelectorAll(".scroll-horizontial");
let search_btn = document.querySelector("#search");
let full_links = document.querySelectorAll("a");
let searching_form = document.querySelector(".Now");
let article = document.querySelector("article");
article.style.cssText = "animation: animation_article 1s ease-out 0s 1 forwards !important;";

let links_search = [];
class link_design {
    constructor(text , url) {
        this.text = text;
        this.link = url;
    }
}

let same = [];
full_links.forEach(function(link){
    if(link.getAttribute("opin") === "true"){
        links_search.push(new link_design(link.innerHTML , link.href))
    }
    else if(link.getAttribute("opin") === "same"){
        same.push(link)
    }
})

same.forEach(e => {
    let link = document.createElement("a");
    link.href = e.href;
    link.innerHTML = e.children[0].innerHTML;
    links_search.push(new link_design(link.innerHTML , link.href))
})

right_btn.forEach(function(ele){
    ele.addEventListener('click' , function(){
        ele.parentElement.scrollBy(100,0);
    })
})
left_btn.forEach(function(ele){
    ele.addEventListener('click' , function(){
        ele.parentElement.scrollBy(-100,0)
    })
})
if(search_btn !== null){
search_btn.addEventListener('click' , function(){
    this.classList.toggle("open");
    console.log(this.className)
    if(this.getAttribute("class") === "btn btn-default text-secandary open" || this.getAttribute("class") === "btn btn-default text-light open"){
        let searching_form = document.querySelector(".searching_form");
        if(searching_form){
            searching_form.children[0].children[0].children[0].value = '';
            searching_form.style.cssText = "display: block !important";
        }
        else{
            if(this.getAttribute("class") === "btn btn-default text-secandary open")displaySearchInput("text-secandary","#ffffff6c" , "#f8f9fa" , "#333");
            else{displaySearchInput("text-light","#0000006c" , "#ffffff23" , "#fff")}
        }
    }else{
        let searching_form = document.querySelector(".searching_form");
        if(searching_form){
            searching_form.style.cssText = "display: none !important";
        }
    }
});
}
function displaySearchInput(text_color,bg_color,bg_color_list , text_color_list){
    let div = document.createElement("div");
    div.className = "searching_form";
    div.style.backgroundColor = bg_color;

    let div_child = document.createElement("div");
    div_child.className = "div_child";

    let form = document.createElement("form");
    form.className = "form-group";

    let input = document.createElement("input");
    input.type = "text";
    input.placeholder = "بحث";
    input.className = "form-control Now";
    form.appendChild(input);
    div_child.appendChild(form);

    let display_result = document.createElement("div");
    display_result.className = "display_result";
    let list_links = document.createElement("ul");
    list_links.className = "list-group";
    display_result.appendChild(list_links);
    div_child.appendChild(display_result);

    div.appendChild(div_child);
    let close_btn = document.createElement("div");
    close_btn.className = `btn close ${text_color}`;
    close_btn.innerHTML = "&times;";
    div.appendChild(close_btn)
    document.body.appendChild(div);

    let focus_data = [];
    let searching_form = document.querySelector(".Now");
    searching_form.addEventListener('input' , function(){
        focus_data = [];
        links_search.forEach(function(ele){
            if(searching_form.value.trim()!== ""){
                if(ele.text.includes(searching_form.value.trim())){
                    focus_data.push(ele)
                }
            }
            let list_links = document.querySelector(".display_result ul");
            list_links.innerHTML = '';
            if(searching_form.value.length > 2){
                display_results(focus_data , list_links , bg_color_list , text_color_list);
            }
        })
    })
    let btn_close = document.querySelector(".close");
    if(btn_close){
        btn_close.onclick = function(){
            let searching_form = document.querySelector(".searching_form");
            search_btn.classList.remove("open");
            if(searching_form){
                searching_form.style.cssText = "display: none !important";
                document.querySelector(".div_child .form-group .Now").value = '';
                focus_data = [];
                list_links.innerHTML = '';
            }
        }
    }
}
/* =================>>> Display data Searching <<<================= */
function display_results(results , position , bg_color_list , text_color){
    results.forEach(function(result , index){
        let li = document.createElement("li");
        li.className = `list-group-item`;
        li.style.cssText = `--de : ${index/20} ; background-color : ${bg_color_list} ; color : ${text_color}`

        let a = document.createElement("a");
        a.href = result.link;
        a.innerHTML = result.text;

        li.appendChild(a)
        position.append(li);
    })
}
/* ================================================================ */
/* =======================>>> Other Menu <<<======================= */
let arrMore = [{
    text_header : "كأس رابطه الدوري الانجليزي",
    text_content : "خماسه لمان يونايتد لاول مباراه بعد رحيل تين هاغ",
    img : "img/prim_cup_1.png",
},{
    text_header : "كأس رابطه الدوري الانجليزي",
    text_content: "ليفربول الي ربع نهائي كأس الرابطه",
    img : "img/prim_cup_2.jfif",
}]
let arrMore_1 = [{
    text_header : "دوري الامم الاوروبيه",
    text_content : "البرتغال تحقق فوزا جديدا",
    img : "img/c7.jfif",
},{
    text_header : "دوري الامم الاوروبيه",
    text_content: "فرنسا تظفر بالنقاط من ارض بلجيكا",
    img : "img/c2.jfif",
}]

let clickMore = document.querySelectorAll(".clickMore");
clickMore.forEach(function(btn){
    btn.addEventListener("click" , function(){
        if(this.parentElement.parentElement.previousElementSibling.getAttribute("data-def") === "matches"){
            this.classList.toggle("open")
            if(this.getAttribute("class") === "btn btn-outline-purple clickMore open"){
                MoreData(arrMore , this.parentElement.parentElement.previousElementSibling);
                this.innerHTML = "عرض الاقل";
            }else{
                this.parentElement.parentElement.previousElementSibling.children[3].remove();
                this.parentElement.parentElement.previousElementSibling.children[2].remove();
                this.innerHTML = "عرض المزيد"
            }
        }
        else if(this.parentElement.parentElement.previousElementSibling.getAttribute("data-def") === "uropa"){
            this.classList.toggle("open")
            if(this.getAttribute("class") === "btn btn-outline-purple clickMore open"){
                MoreData(arrMore_1 , this.parentElement.parentElement.previousElementSibling);
                this.innerHTML = "عرض الاقل"
            }else{
                this.parentElement.parentElement.previousElementSibling.children[3].remove();
                this.parentElement.parentElement.previousElementSibling.children[2].remove();
                this.innerHTML = "عرض المزيد"
            }
        }
    })
})
function MoreData(Date , position){
    Date.forEach(function(ele){
        let li = document.createElement("li");
        li.className = "list-group-item border-0";
    
        let a = document.createElement("a");
        a.className = "row justify-content-start rounded bg-white";
        a.style.cssText = "box-shadow: 0 0 10px #00000041;";
        a.href = "#";
        
        let div = document.createElement("div");
        div.className = "text-title col-md-8 col-sm-6 col-8   text-right pt-2";
        let ph = document.createElement("p");
        ph.className = "text-purple mb-1";
        ph.innerHTML = ele.text_header;
        div.appendChild(ph)

        let pp = document.createElement("p");
        pp.className = "text-dark font-weight-bolder";
        pp.innerHTML = ele.text_content;
        div.appendChild(pp);

        let img = document.createElement("img");
        img.src = ele.img;
        img.className = "col-md-4 col-sm-6 col-4 p-0 rounded-right";

        a.appendChild(div);
        a.appendChild(img);
        
        li.appendChild(a);

        position.appendChild(li);
    })
}
/* ================================================================ */
/* ===========================>>> live_file <<<==================== */

let tab_content = document.querySelectorAll(".child");
let btn_filter = document.querySelectorAll(".btn-filter");

if(document.body.className === "bg-light live"){
    btn_filter.forEach(function(ele , index){
        ele.onclick = function(){
            if(this.getAttribute("data") === "live"){
                tab_content.forEach(function(ele){
                    Array.from(ele.children[0].children[1].children).forEach(function(card){
                        if(card.className !== "invisible"){
                            console.log(card.children[0].childNodes.length);
                            if(card.children[0].childNodes.length === 1){
                                card.style.display = "none"
                            }
                        }
                    })
                })
            }else{
                tab_content.forEach(function(ele){
                    Array.from(ele.children[0].children[1].children).forEach(function(card){
                        if(card.className !== "invisible"){
                            console.log(card.children[0].childNodes.length);
                            if(card.children[0].childNodes.length === 1){
                                card.style.display = "block"
                            }
                        }
                    })
                })
            }
        }
    })
}

/* ==========================>>> live_file_1 <<<================== */
let x_right = document.querySelector(".x-right");
let x_left = document.querySelector(".x-left");
let child = document.querySelector(".father");
let btn_show_video = document.querySelectorAll(".main_logo div");

if(x_right && x_left && child){
    x_right.addEventListener('click' , function(){
        child.scrollBy(-100,0);
    })
    x_left.addEventListener('click' , function(){
        child.scrollBy(100,0);
    });
}

if(btn_show_video){
    btn_show_video.forEach(function(btn){
        btn.addEventListener('click' , function(){
            Swal.fire({
                title: "غير متاح",
                text: "يتوفر قريبا",
                icon: "error"
            });
        })
    })
}

/* =============================================================== */
/* =========================>>> video_file <<<==================== */
let btn_right = document.querySelectorAll(".x_right");
let btn_left = document.querySelectorAll(".x_left");

btn_right.forEach(ele => {
    ele.addEventListener('click',function(){
        this.parentElement.children[3].scrollBy(100,0)
    })
})
btn_left.forEach(ele => {
    ele.addEventListener('click' , function(){
        this.parentElement.children[3].scrollBy(-100,0)
    })
})

let date = new Date();
console.log(date)