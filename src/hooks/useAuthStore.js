import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { onChecking, onLogin, onLogout, clearErrorMessage } from "../store";

export const useAuthStore = () => {

    const { status, username, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    }

    return {
        // Propiedades
        status,
        username,
        errorMessage,

        // Métodos
        startLogin
    }
}