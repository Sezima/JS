'use strict';
// Почему я весь свой код поместила DOMContent? в чем отличие Loaded от DOMContentLoaded?
document.addEventListener('DOMContentLoaded', () => {
    const movieDB = { // my_DB
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

//тут получаем доступ ко всем элементам
    const reclam =  document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        moveList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');
// [] обозначение атрибутов HTML


    // теперь нужно обработчик события, чтобы следить отправку формы
    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); // не будет обновляться страница
        let newFilm = addInput.value;
        const favorite = checkbox.checked;  // checked - чтобы получить boolean значение (либо да, либо нет)

        if (newFilm) { //этот блок кода будет работать только тогда когда будет true
 /* 2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки*/
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`
            }
/* 4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: "Добавляем любимый фильм" */
            if(favorite) {
                console.log("Добавляем любимый фильм");
            }


            movieDB.movies.push(newFilm) // добавили в БД
            sortArr(movieDB.movies)

            createMovieList(movieDB.movies, moveList)
        }
        event.target.reset()
    })


                      //удаление рекламы тремя способами:
// reclam.remove() // нельзя так удалить так как у псевдамассива нет такого метода
//     reclam.forEach(item => {
//         item.remove()
//     })


//анонимная функция
// reclam.forEach(function (item) {
//     item.remove()
// })


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove()
        })
    }
    deleteAdv(reclam)



// //change genre
//     genre.textContent = 'Драма'
// // change image
//     poster.style.backgroundImage = 'url("img/bg.jpg")'


const makeChanges = () => {
    genre.textContent = 'Драма'
    poster.style.backgroundImage = 'url("img/bg.jpg")'
}
makeChanges()


    const sortArr = (arr) => {
        arr.sort()
    }
    sortArr(movieDB.movies)



    function createMovieList(films, parent) {
        parent.innerHTML = ""
        sortArr(films)

        films.forEach((film, i) => {
            parent.innerHTML += `
    <li class="promo__interactive-item">${i + 1} ${film}
          <div class="delete"></div>
    </li>`})

 /* 3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно) */
        document.querySelectorAll('.delete').forEach((btn, i) => {
        btn.addEventListener('click', () => {
        btn.parentElement.remove()
        movieDB.movies.splice(i, 1)  // splice - удаляет элемент из массива

        createMovieList(films, parent)  // рекурсия (ОН нужен для того чтобы после удаления элемента все остальные функции работали (Сортировка добавление итд))
})
        })
    }
createMovieList(movieDB.movies, moveList)
})



















