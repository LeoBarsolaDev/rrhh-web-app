import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../shared/components/button";
import Form from "../../../shared/components/form";
import Frame from "../../../shared/components/frame";
import Input from "../../../shared/components/input";
import Logo from "../../../shared/components/logo";
import useLogin from "../hooks/useLogin";
import { Alert } from "../../../shared/components/alert";

export default function LoginPage(){
    const {
        message,
        alertType,
        alertOpen,
        onSuccess,
        setAlertOpen,
        onError
    } = useLogin()

    return(
        <div className="flex w-full h-full justify-center items-center">
            <Frame styles="py-8 min-w-80">
                <Logo />
                
                <Form url="/auth/login" className="px-4 mb-4" onSuccess={onSuccess} onError={onError}>
                    <Input
                        icon={faUser}
                        name="identifier"
                        label="Usuario o E-Mail"
                        placeholder="Usuario123"
                        required
                    />

                    <Input 
                        icon={faKey}
                        name="password"
                        label="Contraseña"
                        type="password"
                        isPassword={true}
                        required
                    />

                    <input type="text" value="rrhh" name="module" className="hidden" />

                    <Button type="submit" style="mt-2" wide rounded>
                        Ingresar
                    </Button>
                </Form>

                <p className="text-foreground text-center">
                    ¿Problemas para acceder? <a href="" className="text-primary underline hover:cursor-pointer">Contáctanos</a>
                </p>
            </Frame>
            <Alert type={alertType} show={alertOpen} onClose={() => {setAlertOpen(false)}} >
                {message}
            </Alert>
        </div>
    )
}