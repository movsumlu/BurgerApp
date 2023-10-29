import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./style.module.scss";

const OrderDetails = () => {
  const orderNumber = 345368;
  const orderStatus = "Дождитесь готовности на орбитальной станции";

  return (
    <div className={styles.orderDetails}>
      <p className={`${styles.orderNumber} text text_type_digits-large`}>
        {orderNumber}
      </p>

      <p className={`${styles.orderTitle} text text_type_main-medium pt-8`}>
        Идентификатор заказа
      </p>

      <div className={styles.orderIconWrapper}>
        <CheckMarkIcon type={"primary"} />
      </div>

      <p className={`${styles.orderStatusTitle} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.orderStatusMessage} text text_type_main-default`}>
        {orderStatus}
      </p>
    </div>
  );
};

export default OrderDetails;
