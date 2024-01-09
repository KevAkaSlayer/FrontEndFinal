let c_id = 1000;
let descending = false;

const navbar = async() => {
    const res = await fetch(" https://openapi.programming-hero.com/api/videos/categories"
    );
    const json = await res.json();
    const data = json.data;
    console.log(data);
    
    const btn = document.getElementById("navbtn");
    
    data.forEach((element) => {
        const but = document.createElement('div');
        but.innerHTML = `<button onclick = shownormal(${element.category_id}) class ="buttons">${element.category}</button>`;
        btn.appendChild(but);
    })

}

const shownormal = async(id) =>
{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const json  = await res.json();
    const data = json.data;
    c_id = id ;
    showcategorydata(data);
}

const viewnum = (str) =>{
    const strin = str.replace('K','');
    const value = perseFloat(strin);
    return value;
}

const showsort = async()=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${c_id}`);
    const json = await res.json();
    const data = json.data;
    const arr = [...data];

    const sortbtn = document.getElementById("sort");


    if(!descending){
        arr.sort((a,b) => viewnum(b.others.views)-viewnum(a.others.views));
        descending = true;
        sortbtn.innerText = 'Sort by views(Asc)';
    }
    else {
        arr.sort((a,b) => viewnum(a.others.views)-viewnum(b.others.views));
        descending = false;
        sortbtn.innerText = 'Sort by views(Desc)';
    }
    showcategorydata(arr);

}

function showcategorydata(data){

    const cardcontainer = document.getElementById("card-cont");
    cardcontainer.innerHTML=``;

    if(data.length == 0){
        cardcontainer.innerHTML=`<div class="nocontent text-center ">
        <img src="./Icon.png" alt="">
        <h1 class="text-black  text-body-emphasis ">Oops!! Sorry,<br> There is no content here</h1>
    </div> `
    }

    else {
        data.forEach((element)=>{
            const scnd = element.others.posted_date;

            let hrs = scnd/3600;
            let mins = (scnd%3600)/60;

            hrs = parseInt(hrs);
            mins = parseInt(mins);
            const verified = element.authors[0].verified;
            const card = document.createElement('div');
            card.classList = "col-3 cards "

            card.innerHTML = `<div class="cardsproto">
                <img class ="image-section" src="${element.thumbnail}" alt="">
                    <div class="time"> ${element.others.posted_date ? `${hrs} hours ${mins} min ago`  : "" }  
                    </div>
                
                <div class="author d-flex gap-3 pt-4 ">
                <img class="authph " src="${element.authors[0].profile_picture}" alt="">
                    <div class="authortextdiv">
                        <h1 class="name">${element.title}</h1> 
                            <div class="authorverified d-flex gap-1  ">
                                    <p class="text-body-secondary text-opacity-100 "> ${element.authors[0].profile_name}</p>
                                    ${verified? '<img class="verifiedbatch" src="./verified.png"  alt="">' : ""}
                            </div>
                
                        <p class="text-body-secondary  ">${element.others.views} Views</p>
                    </div>
                </div>
          </div> `;
            cardcontainer.appendChild(card);


        });



    }


}
navbar();

shownormal(1000);