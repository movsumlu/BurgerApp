import { useDispatch } from "react-redux";
import { AppDispatch } from "store";

type TDispatch = () => AppDispatch;

export const useAppDispatch: TDispatch = useDispatch;
