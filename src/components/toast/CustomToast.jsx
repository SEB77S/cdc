import { notification } from "antd";


export const showToast = ({
    type = "info",
    title = "Mensaje",
    description = "",
    placement = "topRight",
    duration = 3,
}) => {
    notification[type]({
        message: title,
        description,
        placement,
        duration,
    });
};
