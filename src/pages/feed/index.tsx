import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { FeedItem } from "components/feed-item";

import { ordersSelector } from "store/orders/selectors";
import { WS_CONNECTION_START } from "store/orders/actions";
import { wsClose } from "store/orders/slice";

import { useAppSelector } from "hooks/useAppSelector";

import { splitArray } from "utils/helper";

import { WS_ALL_ORDERS_URL } from "services/API";

import { IOrder } from "types/interfaces";

import styles from "./style.module.scss";

export const Feed = () => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [createdOrders, setCreatedOrders] = useState<IOrder[][]>([]);
  const [doneOrders, setDoneOrders] = useState<IOrder[][]>([]);

  const { messages } = useAppSelector(ordersSelector);

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: WS_ALL_ORDERS_URL,
    });

    return () => {
      dispatch(wsClose());
    };
  }, [dispatch]);

  useEffect(() => {
    if (messages?.orders) {
      setOrders(messages.orders as IOrder[]);
      setTotal(messages.total);
      setTotalToday(messages.totalToday);
    }
  }, [messages, orders]);

  useEffect(() => {
    if (orders.length) {
      const createdOrders = orders.filter(({ status }) => status === "created");
      const doneOrders = orders.filter(({ status }) => status === "done");

      setCreatedOrders(splitArray(createdOrders, 10));
      setDoneOrders(splitArray(doneOrders, 10));
    }
  }, [orders]);

  return orders.length ? (
    <div className={styles.feed}>
      <section className={styles.ordersSection}>
        <p className="text text_type_main-large pt-4 pb-6">Лента заказов</p>
        {orders.length &&
          orders.map((order, index) => (
            <FeedItem order={order} key={index} showStatus={false} />
          ))}
      </section>

      <div className={`${styles.feedInfo} pl-8`}>
        <div className={styles.statusesWrapper}>
          <section className={styles.statuses}>
            <p className="text text_type_main-medium pb-6">Готовы:</p>
            <div className={styles.statusesColumns}>
              {doneOrders.length && doneOrders[0].length ? (
                doneOrders.map((doneOrderColumn, i) => (
                  <div key={i} className={styles.statusesColumn}>
                    {doneOrderColumn.map(({ number }) => (
                      <span
                        key={number}
                        className={
                          styles.done + " text text_type_digits-default"
                        }
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text text_type_main-medium text_color_inactive">
                  Нет
                </p>
              )}
            </div>
          </section>

          <section>
            <p className="text text_type_main-medium pb-6">В работе:</p>
            <div className={styles.statusesColumns}>
              {createdOrders.length && createdOrders[0].length ? (
                createdOrders.map((createdOrderColumn, i) => (
                  <div key={i} className={styles.statusesColumn}>
                    {createdOrderColumn.map(({ number }) => (
                      <span
                        key={number}
                        className="text text_type_digits-default"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                <p className="text text_type_main-medium text_color_inactive">
                  Нет
                </p>
              )}
            </div>
          </section>
        </div>

        <div>
          <p className="text text_type_main-medium mt-10">
            Выполнено за все время:
          </p>
          <p className="text text_type_digits-large">{total}</p>

          <p className="text text_type_main-medium mt-10">
            Выполнено за сегодня:
          </p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>
    </div>
  ) : (
    <p>Идет загрузка...</p>
  );
};
