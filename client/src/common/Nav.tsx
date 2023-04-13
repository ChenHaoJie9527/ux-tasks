import { FC } from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
  IMessage,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";
import { _subscriberId, _applicationIdentifier } from "@/NovuKeys";

const Nav: FC = () => {
  const navigate = useNavigate();

  const onNotificationClick = (notification: IMessage) => {
    navigate(notification.cta.data.url!);
  };
  return (
    <nav className="navbar">
      <h2>Todo List</h2>
      <div>
        <NovuProvider
          subscriberId={_subscriberId}
          applicationIdentifier={_applicationIdentifier}
        >
          <PopoverNotificationCenter
            onNotificationClick={onNotificationClick}
            colorScheme="dark"
          >
            {({ unseenCount }) => (
              <NotificationBell unseenCount={unseenCount}></NotificationBell>
            )}
          </PopoverNotificationCenter>
        </NovuProvider>
      </div>
    </nav>
  );
};

export default Nav;
