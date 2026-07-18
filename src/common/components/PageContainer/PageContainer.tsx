import type {ReactNode} from "react";
import s from "./PageContainer.module.css";


type Props = {
    children: ReactNode;
};

export const PageContainer = ({ children }: Props) => {
    return <div className={s.container}>{children}</div>;
};

