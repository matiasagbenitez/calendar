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
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response.data?.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    return {
        // Propiedades
        status,
        username,
        errorMessage,

        // Métodos
        startLogin,
        startRegister,
        checkAuthToken
    }
}