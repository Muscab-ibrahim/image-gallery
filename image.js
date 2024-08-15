// const opiurl = 'https://pixabay.com/api/?key=45418281-fa95284e83f78865a099d3df&q=yellow+flowers&image_type=photo&pretty=true';




// const opikey = '45418281-fa95284e83f78865a099d3dfe';

// const show = document.querySelector('.show')


// const input = document.querySelector('input');
// const btn = document.querySelector('button');

// console.log(input)


// let searchImage = async () => {
//   let keyword = input.value;

//   let page = 1;

//   // if(page == 1)

//   const request = await  fetch(`https://pixabay.com/api/?key=${opikey}&q=${keyword}&image_type=photo&pretty=true page=${page}`);


//   const respond = await request.json();

//   let data = respond.hits

//   console.log(data)

//   data.forEach(e => {
//     console.log(e.largeImageURL);

//     // show.innerHTML += ` <img src="${e.largeImageURL}" alt="" >`

//     show.innerHTML += `
//     <li> <img src="${e.largeImageURL}" alt=""> </li>`


//     // let img = document.createElement('img');
//     // img.src = e.largeImageURL;
//     // show.appendChild(img)
    
    
//   })
   




// }
// btn.addEventListener('click', () => {
//   searchImage();
// })


// // searchImage();


const apikey = "czrMkJHEGdx6iAA6nGnjuq5UZMhJthFgvdTIB2VTr4EeMgNMNV37Yflj";

const search =   document.querySelector('#search');
const search_btn = document.querySelector('#search_btn');

let term = null;

search_btn.addEventListener('click', () => {
  currentpage = 1;
  term  = search.value;
  show.innerHTML = '';
  getImages(`https://api.pexels.com/v1/search?query=${term}&page=${currentpage}&per_page=${perpage}`)

})


console.log(search);


const perpage = 15;
let currentpage = 1;

const show = document.querySelector('.show');
const load = document.querySelector('#load-more');
const lightbox = document.querySelector('.view');
const dowload = document.querySelector("#download-btn");

dowload.addEventListener('click', (e) => {
  downloadImage(e.target.dataset.img)


})


console.log(lightbox);

const showimg = (img, name) => {

  lightbox.classList.add('show-img');

  const image =lightbox.querySelector('.wrapper .preview-img img');
  image.src = img;
  const photographer = document.querySelector("#photo-grapher");
  photographer.innerText = name;
  document.body.style.overflow = 'hidden'

  dowload.setAttribute('data-img', img)


  console.log(dowload)


}
const hideimg = () => {
  lightbox.classList.remove('show-img');
    document.body.style.overflow = 'auto'


}



// dowload img when cliked
const downloadImage = (ImgUrl) => {



  fetch(ImgUrl).then(res => res.blob() ).then(file => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    console.log(a)
    a.download = new Date().getTime();
    a.click();
  }).catch(() => {
    alert('failed to download')
  })


}

const buidDom  = (images) => {

  // console.log(images)
  //   console.log(show);

  // console.log(images[0].src.large2x)
  
    show.innerHTML += images.map( img =>
      ` <li onclick ="showimg('${img.src.large2x}', '${img.photographer}')">
        <img src="${img.src.large2x}" alt="">
        <div class="detail">
          <div class="photo-grapher">
            <i class="fa-solid fa-camera"></i>
             <span>${img.photographer}</span>
          </div>
          <i class="fa-solid fa-download" onclick ="downloadImage('${img.src.large2x}');event.stopropagation()"></i>
        </div>
      </li>`
     ).join("")

}

const getImages = async  (apiurl) => {

  load.innerText = 'loading...';
  load.classList.add('disaple')
  const request = await fetch(apiurl, {
    headers: { Authorization : apikey}
  });

  const respond = await request.json();
  load.innerText = 'load more';
  load.classList.remove('disaple')



  buidDom(respond.photos)


}

// const getImages = (apiurl) => {
//    fetch(apiurl, {
//         headers: { Authorization : apikey}
//       }).then ( res => res.json()).then( data => {
//         console.log(data)
//       })
// }


getImages(` https://api.pexels.com/v1/curated? page=${currentpage}&per_page=${perpage}`);

load.addEventListener('click', () => {
  currentpage ++;
  let url = ` https://api.pexels.com/v1/curated? page=${currentpage}&per_page=${perpage}`;

  url = term ? `https://api.pexels.com/v1/search?query=${term}&page=${currentpage}&per_page=${perpage}` : url;

  getImages(url);
})



search.addEventListener('keyup', (e) => {


if(e.key === 'Enter') {
  
  currentpage = 1;
  term  = e.target.value;
  show.innerHTML = '';
  getImages(`https://api.pexels.com/v1/search?query=${term}&page=${currentpage}&per_page=${perpage}`)

}
})