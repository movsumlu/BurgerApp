import { IBurgerIngredientsItem, TOrderStatuses } from "types/interfaces";

export const swapArrayElements = (
  array: IBurgerIngredientsItem[],
  sourceIndex: number,
  targetIndex: number
) => {
  const tempArray = array[sourceIndex];

  array[sourceIndex] = array[targetIndex];
  array[targetIndex] = tempArray;

  return array;
};

export const formatDate = (date: Date): string => {
  let today = new Date();
  let targetDate = new Date(date);
  let hours: string | number = targetDate.getHours();
  let minutes: string | number = targetDate.getMinutes();

  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;

  let msInDay = 24 * 60 * 60 * 1000;

  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  let dif: string | number = (+today - +targetDate) / msInDay;

  if (dif === 0) dif = "Сегодня";
  if (dif === 1) dif = "Вчера";
  if (dif > 1) dif = dif + " дн. назад";

  let timeZone = targetDate.getTimezoneOffset() / 60;

  return (
    dif +
    ", " +
    hours +
    ":" +
    minutes +
    " i-GMT" +
    (timeZone > 0 ? timeZone : "+" + timeZone * -1)
  );
};

export const splitArray = (array: any, size: number) =>
  array.reduce(
    (item: any, c: any) => {
      if (item[item.length - 1].length === size) {
        item.push([]);
      }

      item[item.length - 1].push(c);

      return item;
    },
    [[]]
  );

export const getStatus = (status: TOrderStatuses) => {
  const statuses = {
    done: "Выполнен",
    created: "Создан",
    pending: "Готовится",
  };

  return statuses[status] || "Статус вашего заказа не определен";
};

export const getOrderNumber = (url: string) => {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];

  return parseInt(lastPart);
};
