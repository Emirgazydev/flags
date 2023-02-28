// import axios from "axios";
//
//
// axios(`https://restcountries.com/v2/all`)
// .then((res) => {
//     console.log(res.data)
//     res.data.map((el) => (
//         row.innerHTML += `<div class="col-4 my-2 border border-success-subtle shadow-lg p-3 mb-5 bg-body-tertiary rounded">
// <img src="${el.flags.svg}"width="400px" height="200px" " alt="">
// <h3 class="text-start" style="color: red">${el.region}</h3>
// <h1 class="text-center" style="color: #000000">${el.name}</h1>
// <h2 class="text-center" style="color: #000000">${el.capital}</h2>
// <h5>${el.area}km <sup>2</sup></h5>
// <h4>${el.population}</h4>
// </div>`
//     ))
// })

//
// const row = document.querySelector(".row")
// const input = document.querySelector(".text-input")
// const btn = document.querySelector(".search-btn")
// const h2 = document.querySelector(".err")
//
// btn.addEventListener('click', () => {
//     search()
// })
// input.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter'){
//         search()
//     }
// })
//
// function search(){
//     if (input.value === ""){
//         h2.innerHTML = "404"
//     }else{
//         fetch(  ` https://restcountries.com/v3.1/name/${input.value}`)
//     .then(data => data.json())
//             .then((result=> {
//                 result.sort((a,b)=> {
//                     return a.name.common.toLowerCase() > b.name.common.toLowerCase() ? 1 : -1
//                 }).map((el)=> {
//                     row.innerHTML += `<div class="col-3 bg-light border border-warning p-3 mb-2 bg-dark text-white p-3 mb-2 bg-dark text-white"style="border-radius: 15px">
// <img src="${el.flags.svg}" width="250px"  height="150px" style="margin-top: 20px" alt="">
// <h2 class="text-danger">${el.name.common}</h2>
// <h3>${el.region}</h3>
// <li class="text-success">population:${el.population}</li>
// <li class="text-danger">area:${el.area}кв<sup>2</sup></li>
// </div>`
//                 })
//             }))
//         input.value = ""
//         h2.innerHTML = ""
//     }
// }
//




const row = document.querySelector(".row")
const searchInp = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")
const slSort = document.querySelector(".select-sort")
const slReg = document.querySelector(".select-red")

axios(`https://restcountries.com/v2/all`)
.then((task) => {
    console.log(task.data)
    task.data.map((el) => {
        row.innerHTML += `<div class="card my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm" style="width: 400px"       
 <img src="${el.flags.svg}" width="100%" height="300px" class=" card-img-top object-fit-cover border rounded">
        <h1>${el.name}</h1>
        <h3> Столица : ${el.capital}</h3>
        <h2> Плошадь : ${el.area}КВ<sup>2</sup></h2>
        <h2> Регион : ${el.region}</h2>
        <h3> Нацеленние : ${el.population}</h3>
        </div>`
    })
})

let all = null

function task(API){
    axios(`https://restcountries.com/v3.1/${API}`)
.then((res) => {
        all = res.data
        get(res.data)
    })
}
task("all")
searchInp.addEventListener("keydown",(e) => {
    if (e.key === "Enter"){
        task(`name/${searchInp.value}`)

    }
})
searchInp.addEventListener("input", (e) => {
    task(`name/${e.target.value}`)
})
searchBtn.addEventListener("click", () => {
    task(`name/${searchInp.value}`)

})


function get(data) {
    row.innerHTML = ""
    data.map((el) => {
        row.innerHTML += `<div class="card my-4 py-2 mx-2 d-flex flex-wrap nav-fill gap-2 p-1 small bg-succes rounded-5 shadow-sm" style="width: 400px">
        <img src="${el.flags.svg}"  width="100%" height="100px" class=" card-img-top object-fit-cover border rounded" >
        <h1>${el.name.common}</h1>
        <h3> Столица : ${el.capital}</h3>
        <h2> Плошадь : ${el.area}КВ<sup>2</sup></h2>
        <h2> Регион : ${el.region}</h2>
        <h3> Нациленние : ${el.population}</h3>
        </div>`
    })
}


slSort.addEventListener("change", (e) => {
    const value = e.target.value
    if (value === "population"){
        const result = all.sort((a,b) => {
            return b.population - a.population
        })
        get(result)
    }else if (value === "area"){
        const result = all.sort((a,b) => {
            return b.area - a.area
        })
        get(result)
    }else if (value === "A-Z") {
        const result = all.sort((a,b) =>{
            if (b.name.common[0] > a.name.common[0]) {
                return -1
            }else if (b.name.common[0] < a.name.common[0]){
                return 1
            }
        })
        get(result)
    }else if (value === "Z-A"){
        const result = all.sort((a,b) =>{
            if (b.name.common[0] > a.name.common[0]) {
                return 1
            }else if (b.name.common[0] < a.name.common[0]){
                return -1
            }
        })
        get(result)

    }
})




slReg.addEventListener("change", (e) => {
    const regValue = e.target.value
    if (regValue === "asia"){
        const res = all.filter((el)=> {
            return el.region === "Asia"
        })
        get(res)
    }
    else if (regValue === "europe"){
        const res = all.filter((el)=> {
            return el.region === "Europe"
        })
        get(res)
    }
    else if (regValue === "oceania"){
        const res = all.filter((el)=> {
            return el.region === "Oceania"
        })
        get(res)
    }
    else  if (regValue === "africa"){
        const res = all.filter((el)=> {
            return el.region === "Africa"
        })
        get(res)

    }
})

