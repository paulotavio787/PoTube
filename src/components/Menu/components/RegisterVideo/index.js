import React from "react";
import { StyledRegisterVideo } from "./styles";

function useForm(props) {
    const [values, setValues] = React.useState(props.initialValues)
    return {
        values,
        handleChange: (event) => {
            const value = event.target.value
            const name = event.target.name
            setValues({ ...values, [name]: value })
            console.log(value, name)
        },
        clearForm: () => setValues({})
    };
}

export default function RegisterVideo() {
    const [formVisible, setFormVisible] = React.useState(false)
    const formCadastro = useForm({
        initialValues: { title: "teste", url: "http://teste.com" }
    });

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisible(true)}>+</button>

            {formVisible ? (
                <form onSubmit={(event) => {
                    event.preventDefault()
                    setFormVisible(false)
                    formCadastro.clearForm()
                }}>
                    <div>
                        <button type="button" className="close-modal" onClick={() => setFormVisible(false)}>X</button>
                        <input
                            placeholder="Título"
                            name="title"
                            value={formCadastro.values.title}
                            onChange={formCadastro.handleChange}
                        />
                        <input 
                            placeholder="URL"
                            name="url"
                            value={formCadastro.values.url}
                            onChange={formCadastro.handleChange}
                        />
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>

            ) : null}
        </StyledRegisterVideo>
    );
}