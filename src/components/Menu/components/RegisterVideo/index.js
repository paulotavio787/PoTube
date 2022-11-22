import config from "../../../../../config.json"
import { createClient } from "@supabase/supabase-js";
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
        },
        clearForm: () => setValues({})
    };
}

function getThumb(url) {
    return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

const PROJECT_URL = 'https://xacfsqxzjejmcrizberq.supabase.co'
const PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhY2ZzcXh6amVqbWNyaXpiZXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg5NjY3MDEsImV4cCI6MTk4NDU0MjcwMX0.H8s4yvzycKJPgS11SKaReL9TplqEADw789VoeEpyI7E'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export default function RegisterVideo() {

    const [formVisible, setFormVisible] = React.useState(false)
    const formCadastro = useForm({
        initialValues: { title: "", url: "", playlist: "" }
    });
    const [createPlaylist, setCreatePlaylist] = React.useState(false)
    const playlistNames = Object.keys(config.playlists)
    
    const empty = formCadastro.values.playlist === "" || formCadastro.values.title === "" || formCadastro.values.url === ""

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => {
                setFormVisible(true)
                setCreatePlaylist(false)
            }}>+</button>

            {formVisible ? (
                <form onSubmit={(event) => {
                    if (empty) {
                        alert("Preencha todos os campos")
                    } else {
                        if (!formCadastro.values.url.includes("https://www.youtube.com/watch?v=")) {
                            alert("Insira um url de um video do youtube")
                        } else {
                            event.preventDefault()
                            supabase.from('video').insert({
                                title: formCadastro.values.title,
                                url: formCadastro.values.url,
                                thumb: getThumb(formCadastro.values.url),
                                playlist: formCadastro.values.playlist,
                            }).then((req) => {
                                console.log(req)
                            }).catch((err) => {
                                console.log(err)
                            })
                            setFormVisible(false)
                            formCadastro.clearForm()
                        }
                    }
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

                        <select
                            placeholder="Playlist"
                            name="playlist"
                            onChange={(event) => {
                                event.target.value === "" ? setCreatePlaylist(true) :
                                    setCreatePlaylist(false)
                                event.target.value != "" ? formCadastro.handleChange(event) : null
                            }}
                        >
                            <option value="">selecione uma Playlist</option>
                            {playlistNames.map((playlistName) => {
                                return (
                                    <option key={playlistName} value={playlistName}>{playlistName}</option>
                                )
                            })}
                            <option value="">New Playlist</option>
                        </select>

                        {
                            createPlaylist === true ? (
                                <input
                                    placeholder="Playlist"
                                    name="playlist"
                                    value={formCadastro.values.playlist}
                                    onChange={formCadastro.handleChange}
                                />
                            ) : null
                        }

                        <button type="submit">Cadastrar</button>

                        <div className="thumb">
                            {
                                formCadastro.values.url.includes("https://www.youtube.com/watch?v=") ? (
                                    <div>
                                        <img src={getThumb(formCadastro.values.url)} />
                                        <span>{formCadastro.values.title}</span>
                                    </div>
                                ) : null
                            }
                        </div>
                    </div>
                </form>

            ) : null}
        </StyledRegisterVideo>
    );
}