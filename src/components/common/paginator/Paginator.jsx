import React, { useState } from "react";
import classes from "./Paginator.module.css";

let Paginator = ({totalItemCount,pageSize,currentPage,onPageChanged, portionSize = 10}) => {
  // создаем переменную pageCount - это количество страниц пользовалелей для перелистования
  let pageCount = Math.ceil(totalItemCount / pageSize);
  // фотром перебираем и записываем в pages
  let pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  // локальный стейт для хранения значения portionNumber и отрисовки кнопок вперед назад 
  let [portionNumber, setPortionNumber] = useState(1)

  // подсчет страниц в блокле [1 2 3 4 5 6 7 8 9 10 ->]
  //1) получить значение сколько всего будет порций страниц portionCount = всего страниц / колицество в порции (10ш)
  let portionCount = Math.ceil(totalItemCount/portionSize)
  // подсчет первого элемента в порции (номер порции(первых 10ш, вторых 10шт ...) - 1 ) * количество элементов в порции (10) + 1 (для 1 элемента расчет: (0 - 1)*10 +1 = 1)
  let leftPortionNumberCount = (portionNumber - 1 )*portionSize+1
  // номер порции умножаем на количество страниц (пример для 1 позиции: 1*10=10)
  let rightPortionNumberCount =portionNumber*portionSize


  return (
    <div className={classes.PagesContainer}>
      {portionNumber > 1 &&
      <button onClick={() =>{setPortionNumber(portionNumber-1)}}>back</button>
      }
      {pages
      .filter(p => p>=leftPortionNumberCount && p <= rightPortionNumberCount)
      .map(p => {
        return (
          <div className={classes.PagesCursor}>
            <span
              className={currentPage === p && classes.Pages}
              // e - event (событие) пока не нажмет на он клик, не вызовется onPageChanged
              onClick={() => {
                onPageChanged(p);
              }}
            >
              {p}
            </span>
          </div>
        );
      })}

      {portionCount > portionNumber  &&
      <button onClick={() =>{setPortionNumber(portionNumber+1)}}>next</button>

      }
    </div>
  );
};

export default Paginator;
