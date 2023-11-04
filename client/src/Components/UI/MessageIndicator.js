import React, { useEffect, useState } from "react";
import { setMessageNotifications } from "../../Redux/Actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../api/socket";
const MessageIndicator = ({ chatId, globalNotifications }) => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.chats);
  const [socket, setSocket] = useState(dispatch(getSocket()));
  useEffect(() => {
    socket.on("notifications", (data) => {
      if (JSON.stringify(notifications) !== JSON.stringify(data)) {
        dispatch(setMessageNotifications(data));
      }
    });
  }, [socket, Object.keys(notifications).length, notifications.total]);

  if (globalNotifications) {
    return (
      <span className="indicator-item badge badge-success indicator-bottom event-pointer-none">
        {notifications.total || 0}
      </span>
    );
  } else {
    return notifications[chatId] && notifications[chatId][0] !== 0 ? (
      <span className="indicator-item badge badge-success indicator-bottom event-pointer-none">
        {notifications[chatId][0]}
      </span>
    ) : null;
  }
};

export default React.memo(MessageIndicator);